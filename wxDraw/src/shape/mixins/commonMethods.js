/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-10-19 18:04:13 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-10-20 10:17:33
 * 一些都有的方法 都放到这里
 */

export const commonMethods = {
    updateOption: function (option) { //这个更新属性 是不是有点问题 好像和set属性重复了
        this.Option = util.extend(option, this.Option);
        this.UnOption = util.extend(option, this.UnOption);
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
    }
}