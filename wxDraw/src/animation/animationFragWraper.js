/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-10-12 11:28:31 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-10-12 16:44:06
 * 动画 碎片包裹
 * 用于控制 较复杂 的 动画 情景 
 * 动画的 循环 
 * 动画循环多少次 结束
 * 
 */

import { eventBus } from "../util/eventBus"
import { util } from "../util/utils.js"

export var AniFragWrap = function (bus, id, object) {
    this.runing = false;
    this.stoped = false;
    this.started = false;
    this.fragStore = [];
    this.animationPick = 0;//动画戳
    this.bus = bus;
    this.aniFraBus = new eventBus(); // 这里需要创建一个 私有的bus
    this.aniFraBus.add('fragAniOver', this, this.getAniOver);//获取当前 aniwrapper 里面有几个动画完成了
    this.overAni = [];// 哪几个动画完成了
    this.aniFragListId = id;
    this.loop = false;//用于循环的 
    this.loopTimes = false;
    this.looped = 0;
    this.object = object;
    this.oriOption = util.extend({}, object.Shape.Option);// 记录最初的样式
    this.endCallWraper = null;
}

AniFragWrap.prototype = {
    updateFrag(frag) {
        frag.addWrapBus(this.aniFraBus);
        if (this.fragStore.length) {
            this.fragStore[this.fragStore.length - 1].endCallFrag = frag
            this.fragStore.push(frag);
        } else {
            this.fragStore.push(frag);
        }
    },
    exeAnimate() {
        // 执行 仓库内部 动画 
        if (this.stoped) {
            if(this.endCallWraper){
                this.endCallWraper.exeAnimate();
            }
            return false;
        }
        console.log('animationPick',this.animationPick);
        if (this.fragStore[this.animationPick]) {
            this.fragStore[this.animationPick].updateAnimation();

        }
        // 这里每一次都这么执行不太好 
    },
    getAniOver(who) {
        this.overAni.push(who);
        if (this.overAni.length == this.fragStore.length) {// 动画执行完毕后 还有几种情况 1 直接结束
            if (this.loop) {
                if (this.loopTimes && this.looped <= this.loopTimes) {
                    this.looped++;
                }
                if (this.loopTimes && this.looped > this.loopTimes) {
                    this.stop();
                    return false;
                }
                // 如果 没有looptime 那就无线循环
                this.restart();
            } else {
                this.stop();
            }


            return false;
        };
        this.animationPick++;        
        this.fragStore[this.animationPick].updateSourceAndtarget();//更新属性

    },
    restart() {
        // 重新开始就得需要记住 最初物体的属性
        console.log('restart');
        this.object.updateOption(this.oriOption);
        this.overAni = [];
        this.animationPick = 0;
        this.fragStore.forEach(function (element) {
            element.restart();
        }, this);
        this.started = false;
        this.stoped = false;
    },
    stop() {
        this.stop = true;
        this.bus.dispatch('animationComplete', 'no', this.aniFragListId);
    },
    resume() {
        // 先不要有重启
    },
    setLoop(loop, loopTimes) {
        this.loop = loop ? loop : false;//用于循环的 
        this.loopTimes = loopTimes ? loopTimes: false;
        this.looped = 1;
    }
}


