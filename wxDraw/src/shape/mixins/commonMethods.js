/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-10-19 18:04:13 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-10-20 11:07:35
 * 一些都有的方法 都放到这里
 */

export const commonMethods = {
    updateOption: function (option) { //这个更新属性 是不是有点问题 好像和set属性重复了
        
        this.Option = util.extend(option, this.Option);
        this.UnOption = util.extend(option, this.UnOption);
        console.log(this.Option);
        this.bus.dispatch('update', 'no');
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
    setCommonstyle:function(context){
        context.setLineCap(this.UnOption.lineCap);
        context.setLineJoin(this.UnOption.lineJoin);
        context.setLineDash(this.UnOption.lineDash);
        if(this.UnOption.lg.length==4){
        context.createLinearGradient(...this.UnOption.lg);
        }
        if(this.UnOption.cg.length==3&&!this.UnOption.lg){
        context.createCircularGradient(...this.UnOption.cg);
        }

    }
}