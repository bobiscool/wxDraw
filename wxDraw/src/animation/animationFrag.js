/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-09-29 16:34:09 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-10-09 16:09:41
 */

import { AnimationTimer } from "./animationTimer.js"
import { util } from '../util/utils.js';


var FRAGOPTION = {
    onStart: function () {
        // 动画碎片开始的函数
    },
    onLooping: function () {
        //在动画重复执行的时候 需要循环的函数 这里 可能需要一些传参
    },
    onEnd: function () {
        // 动画结束 的时候 执行
    },
    duration: 1000,// 毫秒
    easing: "linear",// 缓动函数 


}

function genExe(exe) {
    if (!isNaN(Number(exe))) {
        return {
            target: Number(exe),
        }
    }

    if (exp.indexOf('+=') == 0) {
        let tem = exp.split('=')[1];

        return {
            incre: tem,
        }
    }


    if (exp.indexOf('-=') == 0) {
        let tem = exp.split('=')[1];

        return {
            incre: -1 * tem
        }
    }

}


export const AnimationFrag = function (object, atrribute, exe, option) {
    // 这里是动画碎片 更改 obj的地方 但是 问题就在这里 这应该是 最简单的功能 就是对比目标 
    // 添加 delta
    // 一旦完成 那这个 running就等于 false 而对于时间 的控制 不应该在这里 控制时间 来 控制 动画 
    // 假比 是 linear 传进来的 deatla 时间 就是 均衡的
    // 那这一刻增加的东西就是 均衡的 

    let _temOption = util.extend(option, FRAGOPTION);
    this.object = object;

    this.source = 0;
    if (genExe(exe).target) {
        this.incre = genExe(exe).target - this.source;
    } else {
        this.incre = genExe(exe).incre
    }
    this.complete = false;
    this.running = false;
    this.started = false;
    this.duration = _temOption.duration;
    this.atrribute = atrribute;
    // console.log(this.object);
    this.timer = new AnimationTimer(_temOption.duration, _temOption.easing);
    this.endCallFrag = null;// 用于动画叠加调用

    this.onEnd = _temOption.onEnd;
    this.onLooping = _temOption.onLooping;
    this.onStart = _temOption.onStart;

}

AnimationFrag.prototype = {
    updateAnimation: function () {
        //获取时间  以及计算出来 的变化时间 来  如果现在的时间 一加到达 
        if (this.complete) {
            if (this.endCallFrag) {
                this.endCallFrag.updateAnimation(); // 朝后调用
            }
            return false;
        }

        if (this.timer.isOver()) {
            this.onEnd();
            this.complete = true;
            this.running = false;
            if (this.endCallFrag) {
                // console.log('朝后调用');
                this.endCallFrag.updateAnimation(); // 朝后调用
            }
            return false;
        }
        if (!this.started && !this.complete) {
            this.source = this.object.Shape[atrribute];// 最初动画开始的属性            
            this.started = true;
            this.running = true;
            this.onStart();
            this.timer.start();

        } else {
            this.onLooping();
            this.updateAtrribute();
        }

    },
    updateAtrribute: function () {
        // console.log('x', this.source + this.target * this.timer.getGoesByTime() / this.duration);
        // console.log('cx', this.object.Shape[this.atrribute]);
        this.object.Shape[this.atrribute] = this.source + this.incre * this.timer.getGoesByTime() / this.duration;
    }
}


