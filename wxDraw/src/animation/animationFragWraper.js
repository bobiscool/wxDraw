/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-10-12 11:28:31 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-10-12 11:34:04
 * 动画 碎片包裹
 * 用于控制 较复杂 的 动画 情景 
 */

export var AniFragWrap = function () {
    this.runing = false;
    this.complete = false;
    this.stoped = false;
    this.fragStore = [];

}

AniFragWrap.prototype = {
    updateFrag(frag) {
        if (this.fragStore.length) {
            this.fragStore[this.fragStore.length - 1].endCallFrag = frag
            this.fragStore.push(frag);
        }else{
            this.fragStore.push(frag);            
        }


    }
}


