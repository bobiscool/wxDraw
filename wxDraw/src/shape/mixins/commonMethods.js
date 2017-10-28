/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-10-19 18:04:13 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-10-28 16:53:16
 * 一些都有的方法 都放到这里
 */
import { util } from '../../util/utils.js';


// var gradientOption = {
//     "circle": {
//         "lg": [this.Option.x - this.Option.r,
//         this.Option.x - this.Option.r,
//         this.Option.x + this.Option.r,
//         this.Option.y - this.Option.r],
//         "cg": [this.Option.x, this.Option.y, this.Option.r]
//     },
//     "rect": {
//         "lg": [//这里还得改
//             this.Option.x - this.Option.w / 2,
//             this.Option.y - this.Option.h / 2,
//             this.Option.x + this.Option.w / 2,
//             this.Option.y - this.Option.h / 2,
//         ],
//         "cg": [
//             this.Option.x,
//             this.Option.y,
//             Math.sqrt(Math.pow(this.Option.w / 2, 2) +
//                 Math.pow(this.Option.h / 2, 2))
//         ]
//     },
//     "polygon": {
//         "lg": [this.Option.x - this.Option.r,
//         this.Option.x - this.Option.r,
//         this.Option.x + this.Option.r,
//         this.Option.y - this.Option.r],
//         "cg": [this.Option.x, this.Option.y, this.Option.r]
//     },
//     "cshape": {
//         "lg": [this.max.minX,
//         this.max.minY,
//         this.max.maxX,
//         this.max.minY],
//         "cg": [this.massCenter.x, this.massCenter.y,
//         Math.sqrt(Math.pow((this.max.maxX - this.max.minX) / 2, 2) +
//             Math.pow((this.max.maxY - this.max.minY) / 2, 2))
//         ]
//     },
//     "line": {
//         "lg": [this.max.minX,
//         this.max.minY,
//         this.max.maxX,
//         this.max.minY],
//         "cg": [this.massCenter.x, this.massCenter.y,
//         Math.sqrt(Math.pow((this.max.maxX - this.max.minX) / 2, 2) +
//             Math.pow((this.max.maxY - this.max.minY) / 2, 2))
//         ]
//     }
// }

export const commonMethods = {
    updateOption: function (option) { //这个更新属性 是不是有点问题 好像和set属性重复了
        if (option.fillStyle && option.gra && option.gra.length) {
            this.UnOption.needGra=='no';
            this.turnColorLock(false);
        }
        this.Option = util.extend(option, this.Option);
        this.UnOption = util.extend(option, this.UnOption);
        // console.log('更新属性',this.Option);
        // console.log('更新 option',option);
        // console.log('更新属性',this.Option.shadow);
        this._dirty = true;
        this.bus.dispatch('update', 'no');
    },
    restoreOption:function(oldOption){
        console.log(oldOption);
        this.Option = util.extend(oldOption, this.Option);
        this.UnOption = util.extend(oldOption, this.UnOption);
        // console.log('更新属性',this.Option);
        // console.log('更新 option',option);
        console.log('更新  this.UnOption',this.UnOption);
        console.log('更新属性',this);
        this._dirty = true;
    },
    upDetect: function () {
        this._isChoosed = false;
    },
    /**
     * 
     * 
     * @param {any} lineCap 线端点
     * @param {any} lineJoin 线连接
     * @param {any} lineDash 虚线
     */
    // setLine: function (lineCap, lineJoin, lineDash) { //设置线
    //     this.UnOption.lineCap = lineCap;
    //     this.UnOption.lineJoin = lineJoin;
    //     this.UnOption.lineDash = lineDash;
    // },
    setRotateOrigin: function (loc) {//设置旋转中心
        this.rotateOrigin = loc;
    },
    setCommonstyle: function (context) {
        // console.log(context);
        // return false;
        let gra = null;
        let type = this._type;
        if (this.UnOption.lineCap) {
            context.setLineCap(this.UnOption.lineCap);
            context.setLineJoin(this.UnOption.lineJoin);
        }
        // context.setLineDash(this.UnOption.lineDash);
        if(this.UnOption.gra&&!(this.UnOption.gra instanceof Array)){
            this.UnOption.gra = Object.values(this.UnOption.gra);
        }
        if (this.UnOption.needGra&&this.UnOption.needGra=='line'&& this.UnOption.gra&&this.UnOption.gra.length > 0) {

            /**
             * lg
             * cg
             * stop 
             * [0,"#dddcdd" ]
            * [0.2,"#ddcddd"]
             * [0.5,"#dcdddd"]
             * [0.6,"#cddddd"]
             */
            this.turnColorLock(true);//开启颜色锁
            gra = context.createLinearGradient(...this.getGradientOption(type).lg);
            // gra = context.createLinearGradient(100, 0, 200, 0);
            this.UnOption.gra.forEach(function (element) {
                gra.addColorStop(element[0],element[1]);
            }, this);
            console.log('继续渐变',gra);
            context.setFillStyle(gra);
        }
        if (this.UnOption.needGra&&this.UnOption.needGra=='circle'&& this.UnOption.gra&&this.UnOption.gra.length > 0) {
            this.turnColorLock(true);//开启颜色锁            
            gra = context.createCircularGradient(...this.getGradientOption(type).cg);
            this.UnOption.gra.forEach(function (element) {
                // console.log(element);
                gra.addColorStop(element[0],element[1]);
            }, this);
            // console.log(gra);
            context.setFillStyle(gra);
        }


        if (!this._colorLock||(this.needGra&&his.UnOption.needGra=='no')) {
            // console.log("没有渐变");
            context.setFillStyle(this.Option.fillStyle);
        }

        context.setStrokeStyle(this.Option.strokeStyle);
        context.setLineWidth(this.Option.lineWidth);
        context.setGlobalAlpha(this.Option.opacity);
        if (this.UnOption.needShadow && this.Option.shadow) {
            // console.log(objToArray(this.Option.Shadow));
            context.setShadow(this.Option.shadow.offsetX, this.Option.shadow.offsetY, this.Option.shadow.blur, this.Option.shadow.color);
        }
        if (this.UnOption.isLineDash) {
            console.log(context.setLineDash);
            if (context.setLineDash) {
                // console.log('设置dash')
                context.setLineDash(this.Option.lineDash[0], this.Option.lineDash[1]);//设置linedash
            }
        }
    },
    stroke: function (context) {
        if (this._type == 'text') {
            this.fill(context);
            return false;
        }
        context.save();
        this._drawLine = true; //用于标识是否画外框        
        this._draw(context);
        this.setCommonstyle(context);
        context.stroke();
        context.restore();
    },
    fill: function (context) {
        if (this._type == 'line') {
            this.stroke(context);//这里先这样写吧
            return false;
        }
        if (this._type == 'text') {
            context.save();
            context.setGlobalAlpha(this.Option.opacity);
            context.beginPath();
            context.setFontSize(this.Option.fontSize);
            context.setTextAlign(this.UnOption.align);
            context.setTextBaseline(this.UnOption.textBaseline);
            context.setFillStyle(this.Option.fillStyle);
            if (this.UnOption.needShadow && this.Option.shadow) {
                // console.log(objToArray(this.Option.Shadow));
                context.setShadow(this.Option.shadow.offsetX, this.Option.shadow.offsetY, this.Option.shadow.blur, this.Option.shadow.color);
            }
            this._draw(context);
            context.closePath();
            context.restore();
            return false;
        }
        context.save();
        this._drawLine = false; //用于标识是否画外框
        this._draw(context);
        this.setCommonstyle(context);
        context.fill();
        context.restore();
    },
    mixDraw: function (context) {
        if (this._type == 'line') {
            this.stroke(context);//这里先这样写吧
            return false;
        }

        if (this._type == 'text') {
            this.fill(context);
            return false;
        }
        context.save();
        this._drawLine = true; //用于标识是否画外框        
        this._draw(context);
        this.setCommonstyle(context);
        context.fill();
        context.stroke();
        context.restore();
    },
    turnColorLock: function (onOff) {
        if (onOff) {
            this._colorLock = true;
        } else {
            this._colorLock = false;
        }
    },
    getGradientOption: function (type) {

        return {
            "circle": type == "circle" ? {
                "lg": [this.Option.x - this.Option.r,
                    0,
                this.Option.x + this.Option.r,
                    0],
                "cg": [this.Option.x, this.Option.y, this.Option.r]
            } : {},
            "rect": type == "rect" ? {
                "lg": [//这里还得改
                    this.Option.x - this.Option.w / 2,
                    this.Option.y - this.Option.h / 2,
                    this.Option.x + this.Option.w / 2,
                    this.Option.y - this.Option.h / 2,
                ],
                "cg": [
                    this.Option.x,
                    this.Option.y,
                    Math.sqrt(Math.pow(this.Option.w / 2, 2) +
                        Math.pow(this.Option.h / 2, 2))
                ]
            } : {},
            "polygon": type == "polygon" ? {
                "lg": [this.max.minX,
                this.max.minY,
                this.max.maxX,
                this.max.minY],
                "cg": [this.Option.x, this.Option.y, this.Option.r]
            } : {},
            "cshape": type == "cshape" ? {
                "lg": [this.max.minX,
                this.max.minY,
                this.max.maxX,
                this.max.minY],
                "cg": [this.massCenter.x, this.massCenter.y,
                Math.sqrt(Math.pow((this.max.maxX - this.max.minX) / 2, 2) +
                    Math.pow((this.max.maxY - this.max.minY) / 2, 2))
                ]
            } : {},
             "ellipse": type == "ellipse" ? {
                "lg": [this.max.minX,
                this.max.minY,
                this.max.maxX,
                this.max.minY],
                "cg": [this.Option.x, this.Option.y,
                Math.sqrt(Math.pow((this.max.maxX - this.max.minX) / 2, 2) +
                    Math.pow((this.max.maxY - this.max.minY) / 2, 2))
                ]
            } : {},
             //加这个 是为了 没必要的计算
        }[type]
    }
}