/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-09-21 13:47:34 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-10-09 11:06:16
 * 主要 引入对象
 * 
 * 
 */

import { guid } from "./util/utils.js";
import { Store } from "./store/store.js";
import { Shape } from "./shape/shape.js";
// import { AnimationFrame } from "./animation/animationFrame.js";
import { AnimationFrame } from "./animation/animationFrame.js";
import { Animation } from "./animation/animation.js";
import { eventBus } from "./util/eventBus.js"
/**
 * 
 * 
 * @param {any} canvas canvas对象
 * @param {any} x   由于小程序的无法获取 canvas 大小高宽 必须指定 x y 长宽 才能 去检测点击
 * @param {any} y 
 * @param {any} w 
 * @param {any} h 
 */
function WxDraw(canvas, x, y, w, h) {


    
    this.canvas = canvas;
    this.wcid = guid();
    this.store = new Store();
    this.bus = new eventBus();
    console.log(this.bus);
    this.animation = new Animation(this.bus);
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
   // 初始化 动画仓库 接收点 
    this.bus.add('addAnimation',this,this.addAnimationFrag);
    this.bus.add('update',this,this.update);
    // console.log(this.bus);
    this.animation.start();
    Shape.bus = this.bus;
}

WxDraw.prototype = {
    add: function (item) {
        item.updateBus(this.bus)
        this.store.add(item);
    },
    draw: function () {
        this.store.store.forEach(function (item) {
            item.paint(this.canvas);
        }, this);
    },
    detect: function (e) {
        //事件检测
        let loc = this.getLoc(e.touches[0].x, e.touches[0].y);

        this.store.store.forEach(function (item) {
            item.detect(loc.x, loc.y);
        }, this);
        // this.getLoc()

    },
    moveDetect: function (e) {
        let loc = this.getLoc(e.touches[0].x, e.touches[0].y);

        this.store.store.forEach(function (item) {
            item.moveDetect(loc.x, loc.y);
            // console.log('item',item)ﬂ
        }, this);
         
        //  console.log(loc);
        this.draw();
        this.canvas.draw();
    },
    upDetect:function(){
      this.store.store.forEach(function (item) {
            item.upDetect();
        }, this);
    },
    getLoc: function (x, y) {
        //获取点击相对位置
        return {
            x: (x - this.x) > 0 ? ((x - this.x) > this.w ? this.w : x - this.x) : this.x,
            y: (y - this.y) > 0 ? ((y - this.y) > this.h ? this.h : y - this.y) : this.y,
        }
    },
    update:function(){
        // 用户手动更新 
           this.draw();
        this.canvas.draw();
    },
    AnimationCenter:function(){
      
    },
    addAnimationFrag:function(scope,AnimationOption,Shapeid){
        
        this.animation.animationFragStore.push(AnimationOption);// 添加 动画碎片 
        // this.animation.animationFragStore2.push(AnimationOption);// 添加 动画碎片 
    
        if(this.animation.animationFragStore2[Shapeid]){
            this.animation.animationFragStore2[Shapeid].push(AnimationOption);
        }else{
            this.animation.animationFragStore2[Shapeid] = [Animation];
        }

        console.log(this.animation.animationFragStore2);
    
    }
}






module.exports = {
    
    WxDraw: WxDraw,
    Shape: Shape,
    AnimationFrame: AnimationFrame()
}