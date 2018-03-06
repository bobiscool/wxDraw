/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-09-29 09:58:45 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2018-01-14 22:17:51
 * 动画 对象 接管所有动画
 */

import { AnimationTimer } from "./animationTimer.js"
import { AnimationFrame } from "./animationFrame.js"

var animationFrame = AnimationFrame();
export const Animation = function (bus) {
    this.running = false;
    this.paused = true;// 我觉得暂停 不应哎全局的这个暂停上 而是每一个对象有一个自己的暂停 用于 当时wait的时候用  但是现在为我写的
    // 这个动画对象不是用与单个运动而是用于 全局动画控制的 一个动画控制器

    this.bus = bus;
    //    //console.log(this.bus);
    this.animationFragStore = {};// 动画碎片仓库 存储 所有 动画 
    this.animationCompleteList = [];// 动画完成清单
    this.wraperAniCompleteOb = {}; //每一个包裹的 动画是否完成
    this.bus.add('animationComplete', this, this.animationComplete);// 添加动画事件 
    this.bus.add('wraperAniComplete', this, this.wraperAniComplete);// 添加动画事件 
    this.bus.add('destoryAnimation', this, this.destroyAnimation);// 销毁图形 那就销毁动画
    this.bus.add('clearAnimation',this,this.clearAnimation)//清除所有动画


    //    this.animationFragStore2 = {};

}




Animation.prototype = {
    start: function () {
        //开始整个动画
        this.running = true;
        this.loopAnimation();
    },
    loopAnimation: function () {
        //循环 整场动画
        var _self = this;
        function stepAnimation() {
            animationFrame(stepAnimation);
            // //console.log('---');
            _self.running && _self.updateStep();
        };

        animationFrame(stepAnimation)
    },
    updateStep: function () {
        //这里是执行小动画的地方 每一个obj都有自己的动画 在obj添加动画的时候 
        // 便在动画循环里面添加 
        // 动画是根据时间 来执行的 
        // this._bus()
        // //console.log(this.animationFragStore);
        // this.animationFragStore.forEach(function(ele){
        //     ele.updateAnimation();
        // });

        let _keys = Object.keys(this.animationFragStore);

        _keys.forEach(function (item) {
            let _temFragStore = this.animationFragStore[item];
            _temFragStore[0].exeAnimate(); // 先简单  这样顺序执行 
        }, this);



        this.bus.dispatch('update', 'no');//通知绘制更新 
    },
    animationComplete: function (who) {
        // //console.log('who',who,this.animationCompleteList);
        // m某个物件的动画完成  就需要清除动画
        this.animationCompleteList.push(who);
        // console.log(this.animationFragStore);
        // console.log(this.animationFragStore[who]);
        delete this.animationFragStore[who];
        // delete this.wraperAniCompleteOb[who];
        console.log("=========结束动画=========")
        if (Object.keys(this.wraperAniCompleteOb).length === Object.keys(this.animationFragStore).length) {
            this.running = false;// 动画执行 结束
            // //console.log('结束动画')
        }
    },
    wraperAniComplete: function (afID, shaId,obj) {
        console.log(afID, shaId);
        if (this.wraperAniCompleteOb[shaId]) {
            this.wraperAniCompleteOb[shaId].push(afID);
            

        } else {
            this.wraperAniCompleteOb[shaId] = [afID]; // 用于检测吗每一个shape的动画是否完成
        }

        // //console.log('shaId', this.wraperAniCompleteOb[shaId].length, this.animationFragStore[shaId].length,this.wraperAniCompleteOb[shaId].length == this.animationFragStore[shaId].length);
        console.log('========测试判断是否动画结束是否成功=========');
        console.log(this.wraperAniCompleteOb[shaId].length, this.animationFragStore[shaId].length);
        if (this.wraperAniCompleteOb[shaId].length == this.wraperAniCompleteOb.length) {
            obj.restoreDrag();//恢复drag状态
            this.bus.dispatch('animationComplete', 'no', shaId);// 某一个物件的动画完成
        }
        // //console.log('wraperAniComplete', this.wraperAniCompleteOb);
    },
    destroyAnimation:function(index,shaId){
        delete this.animationFragStore[shaId];
    },
    clearAnimation:function(){
        // console.log('清除动画');
        this.animationFragStore = {};
        this.running = false;
    }
}