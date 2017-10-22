/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-10-19 18:04:13 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-10-22 11:39:04
 * 一些都有的方法 都放到这里
 */
import { util } from '../../util/utils.js';


// var gradientOption = {
//     "circle": {
//         "lg": [this.Option.x - this.Option.r,
//         this.Option.x - this.Option.r,
//         this.Option.x + this.Option.r,
//         this.Option.y - this.Option.r],
//         "cg": [this.Option.x, this.Option.y, this.Option.r]
//     },
//     "rect": {
//         "lg": [//这里还得改
//             this.Option.x - this.Option.w / 2,
//             this.Option.y - this.Option.h / 2,
//             this.Option.x + this.Option.w / 2,
//             this.Option.y - this.Option.h / 2,
//         ],
//         "cg": [
//             this.Option.x,
//             this.Option.y,
//             Math.sqrt(Math.pow(this.Option.w / 2, 2) +
//                 Math.pow(this.Option.h / 2, 2))
//         ]
//     },
//     "polygon": {
//         "lg": [this.Option.x - this.Option.r,
//         this.Option.x - this.Option.r,
//         this.Option.x + this.Option.r,
//         this.Option.y - this.Option.r],
//         "cg": [this.Option.x, this.Option.y, this.Option.r]
//     },
//     "cshape": {
//         "lg": [this.max.minX,
//         this.max.minY,
//         this.max.maxX,
//         this.max.minY],
//         "cg": [this.massCenter.x, this.massCenter.y,
//         Math.sqrt(Math.pow((this.max.maxX - this.max.minX) / 2, 2) +
//             Math.pow((this.max.maxY - this.max.minY) / 2, 2))
//         ]
//     },
//     "line": {
//         "lg": [this.max.minX,
//         this.max.minY,
//         this.max.maxX,
//         this.max.minY],
//         "cg": [this.massCenter.x, this.massCenter.y,
//         Math.sqrt(Math.pow((this.max.maxX - this.max.minX) / 2, 2) +
//             Math.pow((this.max.maxY - this.max.minY) / 2, 2))
//         ]
//     }
// }

export const commonMethods = {
    updateOption: function (option) { //这个更新属性 是不是有点问题 好像和set属性重复了
        if (option.fillStyle && option.lg.length <= 0 && option.cg.length <= 0) {
            this.turnColorLock(false);
        }
        this.Option = util.extend(option, this.Option);
        this.UnOption = util.extend(option, this.UnOption);
        // console.log(this.Option);
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
        if (this.UnOption.lg.length>0) {

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
            // gra = context.createLinearGradient(...this.getGradientOption(type).lg);
            gra = context.createLinearGradient(100,0,200,0);
            this.UnOption.lg.forEach(function (element) {
                gra.addColorStop(...element);
            }, this);
            console.log(gra);            
            context.setFillStyle(gra);
        }
        if (this.UnOption.cg.length>0 && !this.UnOption.lg.length>0) {
            this.turnColorLock(true);//开启颜色锁            
            gra = context.createCircularGradient(...this.getGradientOption(type).cg);
            this.UnOption.cg.forEach(function (element) {
                // console.log(element);
                gra.addColorStop(element[0],element[1]);
            }, this);
            // console.log(gra);
            context.setFillStyle(gra);
        }


        if (!this._colorLock) {
            console.log("没有渐变");
            context.setFillStyle(this.Option.fillStyle);
        }
    },
    turnColorLock: function (onOff) {
        if (onOff) {
            this._colorLock = true;
        } else {
            this._colorLock = false;
        }
    },
    getGradientOption: function (type) {
        
        return {
            "circle": type == "circle" ? {
                "lg": [this.Option.x - this.Option.r,
                0,
                this.Option.x + this.Option.r,
                0],
                "cg": [this.Option.x, this.Option.y, this.Option.r/10]
            }:{},
            "rect": type == "rect" ? {
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
            }:{},
            "polygon":  type == "polygon" ?{
                "lg":[this.Option.x - this.Option.r,
                this.Option.x - this.Option.r,
                this.Option.x + this.Option.r,
                this.Option.y - this.Option.r],
                "cg":[this.Option.x, this.Option.y, this.Option.r]
            }:{},
            "cshape": type == "cshape" ? {
                "lg": [this.max.minX,
                this.max.minY,
                this.max.maxX,
                this.max.minY],
                "cg": [this.massCenter.x, this.massCenter.y,
                Math.sqrt(Math.pow((this.max.maxX - this.max.minX) / 2, 2) +
                    Math.pow((this.max.maxY - this.max.minY) / 2, 2))
                ]
            } :{},
            "line": type == "cshape" ? {
                "lg": [this.max.minX,
                this.max.minY,
                this.max.maxX,
                this.max.minY],
                "cg": [this.massCenter.x, this.massCenter.y,
                Math.sqrt(Math.pow((this.max.maxX - this.max.minX) / 2, 2) +
                    Math.pow((this.max.maxY - this.max.minY) / 2, 2))
                ]
            } : {} //加这个 是为了 没必要的计算
        }[type]
    }
}