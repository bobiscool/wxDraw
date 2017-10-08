/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-09-27 23:31:49 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-10-08 18:26:44
 * 单个小物件自己的计时器
 */
import { EasingFunctions } from "./animationFunc.js"

 function Watch() {
    this.startTime = 0; //启动时间
    this.running = false;//是否还在运行
    this.goesBytime = 0;
    this.goesBy = undefined;
    this.DEFAULT_ELASTIC = 2;
}


Watch.prototype = {
    start: function () {
        this.startTime = +new Date();
        this.goesBytime = undefined;
        this.running = true;
    },

    stop: function () {
        this.goesBy = (+new Date()) - this.startTime;
        this.running = false;
    },

    getGoesByTime: function () {


        if (this.running) {
            var _tem = (+new Date()) - this.startTime;
            return (_tem > 1) && !isNaN(_tem) ? _tem : 0;
        } else {
            return this.goesBy;
        }
    },
    isRunning: function () {    
        return this.running;
    },
    reset: function () {
        this.goesBy = 0;
    }
}






export const AnimationTimer = function (duration, timeFunc) {
    if (duration !== undefined) this.duration = duration;
    if (timeFunc !== undefined) this.timeFunc = timeFunc;
    this.watch = new Watch();
}

AnimationTimer.prototype = {
   start:function() {
       //开始计时
       this.watch.start();
   },
    stop:function(){
        this.watch.stop();
    },
    getGoesByTime:function(){
        //注意这里的时间与 watch 里面的时间不是同一概念 这里面还有扭曲时间 用于产生不同的动画效果的
        var goesBytime = this.watch.getGoesByTime();
        console.log(goesBytime);
        var aniPercent = goesBytime/this.duration;//动画进行的程度
        

        if(!this.watch.running) return undefined; //没有运行 那就没有
        if(!this.timeFunc) return goesBytime;//如果没有时间函数那就直接返回正常的 时间
        //关键点
        console.log('扭曲时间',EasingFunctions[this.timeFunc](aniPercent)/aniPercent);
        console.log('扭曲时间',this.timeFunc);
        return goesBytime*(EasingFunctions[this.timeFunc](aniPercent)/aniPercent);//时间扭曲

    },
    isOver:function(){
        return this.watch.getGoesByTime()>this.duration;
    }
  

}

