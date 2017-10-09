
/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-09-22 15:45:51 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-10-09 11:28:26
 * 在这里添加事件 
 */

import { Polygon } from './polygon.js';
import { Rect,Circle } from './normalShape.js';
import { AnimationTimer } from '../animation/animationTimer.js';
import { AnimationFrag } from '../animation/animationFrag.js';
import { guid } from "../util/utils.js";


export var  Shape=function(type, option, strokeOrfill, draggable, highlight) {
    this.draggable = draggable ? true : false;
    this.highlight = highlight ? true : false;
    this.strokeOrfill = strokeOrfill ? true : false;//是否填充
    this.type = type;
    this.Shape = new shapeTypes[type](option);
    this.AnimationTimer = new AnimationTimer();
    this.animtionFragList = [];// flag List
    this.bus = null;
    this.Shapeid = "sp"+guid();
}



Shape.prototype = {
    updateBus:function(bus){
        this.bus = bus;
    },
    paint: function (context) {
        if (this.strokeOrfill) {
            this.Shape.fill(context);
        } else {
            this.Shape.stroke(context);
        }
    },
    detect: function (x, y) {
        //检查点击了谁
        this.Shape.detected(x, y);
        if (this.Shape.detected(x, y)) {

        }

    },
    moveDetect: function (x, y) {
        // console.log('moveDetect')
        this.Shape.moveDetect(x, y);
    },
    upDetect:function(){
        this.Shape.upDetect();
    },
    
    /**
     * 
     * 
     * @param {any} atrribute 哪个属性动画
     * @param {any} exp   表达式
     * @param {any} option  其他设置项目
     */
    animate:function(atrribute,exp,option){
        console.log("添加形状")
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
       if(atrribute=="x"){
           // @TODO 方向
           // @TODO 表达式
           // @TODO 回调
          
           if(exp.indexOf('+=')==0){
              let tem = exp.split('=')[1];
              
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

               var _temTarget = parseFloat(tem)+parseFloat(this.Shape.x);
               
               let _direc = true;
               let _temFrag = new AnimationFrag(this,"x",_temTarget,option);
               //在添加动画的时候 就行应该 指明这个动画的方向 动画的目标 而不是每次 执行的时候 才去 计算是不是 到达了这个 目标 
               console.log(_temFrag);

               this.bus.dispatch('addAnimation',"no",_temFrag,this.Shapeid);
    
           }

           
       }


           return this;               
    }
}






var shapeTypes = {
    "circle": function (option) {
        return new Circle(option);
    },
    'rect': function (option) {
        return new Rect(option);
    },
    'polygon': function (option) {
        return new Polygon(option);
    }
}
