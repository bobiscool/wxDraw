/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-10-19 18:04:13 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-10-20 14:04:30
 * 一些都有的方法 都放到这里
 */
import { util } from '../../util/utils.js';


var gradientOption = {
    "circle": {
        "lg": [this.Option.x - this.Option.r,
        this.Option.x - this.Option.r,
        this.Option.x + this.Option.r,
        this.Option.y - this.Option.r],
        "cg": [this.Option.x, this.Option.y, this.Option.r]
    }
}

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
    setCommonstyle: function (context, type) {
        // console.log(context);
        // return false;
        let gra = null;
        context.setLineCap(this.UnOption.lineCap);
        context.setLineJoin(this.UnOption.lineJoin);
        // context.setLineDash(this.UnOption.lineDash);
        if (this.UnOption.lg) {

            /**
             * lg
             * cg
             * stop 
             * [0,"#dddcdd" ]
            * [0.2,"#ddcddd"]
             * [0.5,"#dcdddd"]
             * [0.6,"#cddddd"]
             */
            this.turnColorLock(true);//开启颜色锁
            gra = context.createLinearGradient(...gradientOption[type].lg);
            this.UnOption.lg.forEach(function (element) {
                gra.addColorStop(...element);
            }, this);
            context.setFillStyle(gra);
        }
        if (this.UnOption.cg && !this.UnOption.lg) {
            this.turnColorLock(true);//开启颜色锁            
            gra = context.createCircularGradient(...gradientOption[type].cg);
            this.UnOption.lg.forEach(function (element) {
                gra.addColorStop(...element);
            }, this);
            context.setFillStyle(gra);
        }

    },
    turnColorLock: function (onOff) {
        if (onOff) {
            this._colorLock = true;
        } else {
            this._colorLock = false;
        }
    }
}