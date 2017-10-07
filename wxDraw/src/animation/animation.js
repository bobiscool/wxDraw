/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-09-29 09:58:45 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-10-07 10:28:22
 * 动画 对象 接管所有动画
 */

import { AnimationTimer } from "./animationTimer.js"
import { AnimationFrame } from "./animationFrame.js"

var animationFrame = AnimationFrame();
export const Animation= function(bus){
   this._running = false;
   this. _paused = true;// 我觉得暂停 不应哎全局的这个暂停上 而是每一个对象有一个自己的暂停 用于 当时wait的时候用  但是现在为我写的
                        // 这个动画对象不是用与单个运动而是用于 全局动画控制的 一个动画控制器

                        

   this.bus = bus;
   this.animationFragStore = [];// 动画碎片仓库 存储 所有 动画 
   
}




Animation.prototype = {
   start:function(){
       //开始整个动画
 
   },
    loopAnimation:function(){
        //循环 整场动画
        function stepAnimation(){
            animationFrame(step);
            this.isrunning&&this.updateStep();
        };

        animationFrame(step)
    },
    updateStep:function(){
        //这里是执行小动画的地方 每一个obj都有自己的动画 在obj添加动画的时候 
        // 便在动画循环里面添加 
        // 动画是根据时间 来执行的 
        // this._bus()
        
    }
}