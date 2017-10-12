/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-10-12 11:28:31 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-10-12 13:21:09
 * 动画 碎片包裹
 * 用于控制 较复杂 的 动画 情景 
 */

 import { eventBus } from "../util/eventBus" // 

export var AniFragWrap = function () {
    this.runing = false;
    this.complete = false;
    this.stoped = false;
    this.fragStore = [];
    this.animationPick =0;//动画戳
    this.aniFraBus = new eventBus() // 这里需要创建一个 私有的bus
    this.aniFraBus.add('fragAniOver',this,this.getAniOver);//获取当前 aniwrapper 里面有几个动画完成了
    this.overAni = [];// 哪几个动画完成了
}

AniFragWrap.prototype = {
    updateFrag(frag) {
        if (this.fragStore.length) {
            this.fragStore[this.fragStore.length - 1].endCallFrag = frag
            this.fragStore.push(frag);
        }else{
            this.fragStore.push(frag);            
        }
    },
    exeAnimate(){
        // 执行 仓库内部 动画 
        this.fragStore[this.animationPick].updateAnimation();
        // 这里每一次都这么执行不太好 
    },
    getAniOver(who){
      this.overAni.push(who);
      this.animationPick ++;
    }
}


