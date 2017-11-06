
/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-09-22 15:45:51 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-10-30 17:23:20
 * 在这里添加事件 
 */

import { Polygon } from './polygon.js';
import { Ellipse } from './ellipse.js';
import { Text } from './text.js';
import { Line } from './line.js';
import { Circle } from './circle.js';
import { Rect } from './rect.js';
import { Cshape } from './cshape.js';
import { AnimationTimer } from '../animation/animationTimer.js';
import { AnimationFrag } from '../animation/animationFrag.js';
import { guid } from "../util/utils.js";
import { AniFragWrap } from "../animation/animationFragWraper.js"
import { util } from '../util/utils.js';


export var Shape = function (type, option, strokeOrfill, draggable) {
    this.draggable = draggable ? true : false;
    this.strokeOrfill = strokeOrfill ? strokeOrfill : 'fill';//是否填充
    this.type = type;
    this.Shape = new shapeTypes[type](option);
    // console.log('方块', this.Shape.Option);

    this.AnimationTimer = new AnimationTimer();
    this.animtionFragList = [];// flag List
    this.bus = null;
    this.Shapeid = "sp" + guid();
    this.animationStart = false;
    this.aniFragListId = "";
    this.aniFragWraper = null;
    this._oldDrag = this.draggable;
    //
    this._layerIndex = 0;//用于点击时候的
    this._getChoosed = false;//用于选中
    this._eventStore = {
        "tap": [],
        "touchstart": [],
        "touchmove": [],
        "touchend": [],
        "longpress": [],
        "drag": []
    };//用于回调事件的
    this._nowType = 'tap'
}



Shape.prototype = {
    updateBus: function (bus) {
        this.bus = bus;
    },
    paint: function (context) {
        switch (this.strokeOrfill) {
            case 'fill':
                this.Shape.fill(context);
                break;
            case 'stroke':
                this.Shape.stroke(context);
                break;
            case 'mix':
                this.Shape.mixDraw(context);
                break;
            case true:
                this.Shape.fill(context);
                break;
        }
    },
    detect: function (x, y, type) {
        //检查点击了谁
        //    console.log('点中了吗',x,y,type);
        //    console.log('点中了吗',this.Shape.detected(x, y));
        if (this.Shape.detected(x, y)) {
            //console.log('点击')
            // console.log(this.type);
            this._nowType = type;
            this.bus.dispatch('getDetectedLayers', 'no', this._layerIndex);
        } else {
            this.bus.dispatch('getDetectedLayers', 'no', -1);//这是 为了保证 所以层级都检测一遍             
        }

    },
    moveDetect: function (x, y) {
        if (this._getChoosed) {
            this._eventStore['touchmove'].forEach(function (element) {
                element(this);
            }, this);
        }
        if (this.draggable && this._getChoosed) {
            //console.log('move',this._layerIndex);          
            this._eventStore['drag'].forEach(function (element) {
                element(this);
            }, this);
            this.Shape.moveDetect(x, y);
        }
    },
    upDetect: function () {
        if (this._getChoosed) {
            this.bus.dispatch('clearDetectedLayers', 'no');//清空选中数组     
            this._eventStore['touchend'].forEach(function (element) {
                element(this);
            }, this);
            this.Shape.upDetect();
            this._getChoosed = false;
        }

    },

    /**
     * 
     * 
     * @param {any} atrribute 哪个属性动画
     * @param {any} exp   表达式
     * @param {any} option  其他设置项目
     */
    animate: function (atrribute, exp, option) {
        if (!this.aniFragListId) {
            this.aniFragListId = "af" + guid()
            this.aniFragWraper = new AniFragWrap(this.bus, this.aniFragListId, this);// 一旦开始连续调用 就创建一个
        }


        //console.log("添加形状")
        // 在这里添加 动画
        // 所有的动画其实就是目标
        // 一旦 每个动画对象执行 animate其实就是给自己立了一个flag
        /**
         *所以的动画碎片其实就是所有的flag
         这些flag you刚开始的 有结束的 于是 改变的时候就要去记录状态 
         对比 这些状态 是不是以及完成 
         完成了就完事 
         没完成 那就继续 按照时间 完成
         */
        //    if(atrribute=="x"){
        // @TODO 方向
        // @TODO 表达式
        // @TODO 回调

        //    if(exp.indexOf('+=')==0){
        //       let tem = exp.split('=')[1];

        /**
         * 这里的animate 世纪路所有动画 
         * 但是在哪里执行呢 ？
         * 在父集里面 有一个 aniamtion 哪个是 动画控制器 
         * 是一个总的 宗华控制器 
         * 但是 是事实上 总的动画控制器 
         * uodate 还是 每一个单个 shape自己跟新 动画 这样思路上 
         * 才不不会乱 
         * 
         */


        let _direc = true;
        let _temFrag = null;
        if (typeof atrribute == "object") {
            // console.log('object');
            _temFrag = new AnimationFrag(this, atrribute, "no", arguments[1], this.bus);//懒得写 就写arguments吧
        } else {
            _temFrag = new AnimationFrag(this, atrribute, arguments[1], arguments[2], this.bus);
        }

        // console.log(_temFrag);
        this.aniFragWraper.updateFrag(_temFrag);// 动画容器包裹动画

        //在添加动画的时候 就行应该 指明这个动画的方向 动画的目标 而不是每次 执行的时候 才去 计算是不是 到达了这个 目标 

        //    //console.log('添加形状',this.bus);

        //    }


        //    }

        // console.log("继续调用")


        return this;
    },
    // 动画循环
    start: function (a) {
        this.animationStart = true;
        if (this.aniFragWraper) {
            if (a === true) {
                this.aniFragWraper.setLoop(a);//设置循环                
            }
            
            // console.log( this.aniFragWraper);
            if (typeof a === 'number') {
                this.aniFragWraper.setLoop(true, a);
            }
            this.bus.dispatch('addAnimation', "no", this.aniFragWraper, this.Shapeid);
            this.aniFragListId = "";// 每一段动画的id
            this.aniFragWraper = null;// 每一段动画的id
        } else {
            //console.log('未添加动画对象');
        }

    },//开始动画
    updateOption: function (option) {
        if (!this.Shape.bus) {
            this.Shape.bus = this.bus;
        }

        this.Shape.updateOption(option);

        return this;
    },
    restoreOption:function(option){
        this.Shape.restoreOption(option);       
    },
    setOrigin: function (loc) {
        this.Shape.setRotateOrigin(loc)
        return this;
    },
    _updateLayer: function (layer) {
        //console.log('更新层级', layer); //这是初始化的
        this._layerIndex = layer;
        // this.bus.dispatch('updateLayer', 'no', this._layerIndex, layer);
    },
    updateLayer: function (layer) {
        //console.log('更新层级', layer); 、、这是用户调用的时候

        // this._layerIndex = layer;

        this.bus.dispatch('updateLayer', 'no', this, this._layerIndex, layer);
    },
    getChoosed: function () {
        // console.log('选中',this._layerIndex);
        // console.log('sss', this._nowType);
        // console.log('sss', this._eventStore[this._nowType]);
        this._getChoosed = true;
        //选中之后 开始tapstart
        this._eventStore[this._nowType].forEach(function (element) {
            // console.log(element);
            element(this);
        }, this);
    },
    destroy: function () {
        this.bus.dispatch('destory', 'no', this._layerIndex, this.Shapeid);
        this.bus.dispatch('destoryAnimation', 'no', this._layerIndex, this.Shapeid);
    },
    restoreDrag: function () {
        this.draggable = this._oldDrag;
    },
    disableDrag: function () {
        this.draggable = false;
    },
    bind: function (type, method) {
        /**
         * 事件有点击事件
         *         touchstart
         *         touchmove 
         *         touchend
         *        拖拽事件
         *      tap事件
         *      longpress事件
         */
        // console.log(method);
        if (typeof this._eventStore[type] !== 'undefined') {
            this._eventStore[type].push(method)
        }
    },
    unbind: function (type, method) {
        let _index = -1;
        if (typeof this._eventStore[type] !== 'undefined') {
            this._eventStore[type].forEach(function (item, index) {
                _index = index;
            });
        }


        if (_index!==-1) {
            this._eventStore[type].splice(_index, 1);
            // console.log(this._eventStore);
        }
    },
    clone:function(){
        // console.log({...this.Shape.Option,...this.Shape.UnOption});
        let _spaAttr = {};
        if(this.type =="text"){
            _spaAttr = {
                text:this.Shape.text
            }
        }
        let _clone = new Shape(this.type,{...this.Shape.Option,...this.Shape.UnOption,..._spaAttr},this.strokeOrfill,this.draggable)
        return _clone;
    },
    updateText:function(text) {
       if(this.type=="text"){
           this.Shape.updateText(text);
       }else{
           return false
       }
       return this;
    }
}






var shapeTypes = {
    "circle": function (option) {
        return new Circle(option);
    },
    'rect': function (option) {
        // console.log('方块');
        // console.log(option);
        return new Rect(option);
    },
    'polygon': function (option) {
        return new Polygon(option);
    },
    'cshape': function (option) {
        return new Cshape(option);
    },
    'line': function (option) {
        // console.log(option);
        return new Line(option);
    },
    'ellipse': function (option) {
        return new Ellipse(option);
    },
    'text': function (option) {
        return new Text(option);
    }
}
