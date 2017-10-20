/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-10-19 18:04:13 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-10-20 14:16:56
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
    },
    "rect": {
        "lg": [//这里还得改
            this.Option.x - this.Option.w / 2,
            this.Option.y - this.Option.h / 2,
            this.Option.x + this.Option.w / 2,
            this.Option.y - this.Option.h / 2,
        ],
        "cg": [
            this.Option.x,
            this.Option.y,
            Math.sqrt(Math.pow(this.Option.w / 2, 2) +
                Math.pow(this.Option.h / 2, 2))
        ]
    },
    "polygon": {
        "lg": [this.Option.x - this.Option.r,
        this.Option.x - this.Option.r,
        this.Option.x + this.Option.r,
        this.Option.y - this.Option.r],
        "cg": [this.Option.x, this.Option.y, this.Option.r]
    },
    "cshape": {
        "lg": [this.max.minX,
        this.max.minY,
        this.max.maxX,
        this.max.minY],
        "cg": [this.massCenter.x, this.massCenter.y,
        Math.sqrt(Math.pow((this.max.maxX - this.max.minX) / 2, 2) +
            Math.pow((this.max.maxY - this.max.minY) / 2, 2))
        ]
    },
    "line": {
        "lg": [this.max.minX,
        this.max.minY,
        this.max.maxX,
        this.max.minY],
        "cg": [this.massCenter.x, this.massCenter.y,
        Math.sqrt(Math.pow((this.max.maxX - this.max.minX) / 2, 2) +
            Math.pow((this.max.maxY - this.max.minY) / 2, 2))
        ]
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
            this.UnOption.cg.forEach(function (element) {
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