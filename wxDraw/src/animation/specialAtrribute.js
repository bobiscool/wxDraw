/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-10-16 14:46:52 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-10-18 14:36:38
 * 添加一个特殊属性库 用于支持 有一些不在Option
 * 里面的属性
 */

import { hex2rgb, rgb2hex } from '../util/utils.js';


export const specialOption = {
    "cshape": {
        "x": "massCenter",//用于平移用的
        "y": "massCenter"
    },
    "line": {
        "x": "massCenter",//用于平移用的
        "y": "massCenter"
    }
}

export const specialAtrr = {//一些特殊的属性值的更改
    "fillStyle": {
        get: function (val) {
            // console.log('hex2wwwwwwrgb', hex2rgb(val));
            return hex2rgb(val);
        },
        set: function (source, incre, timer) {
            // console.log(source, incre, timer);
            let temCo = [
                source.r + Math.floor(incre.r * timer),
                source.g + Math.floor(incre.g * timer),
                source.b + Math.floor(incre.b * timer)//超级恶心颜色渐变
            ]
            let _val = '#' + rgb2hex(...temCo)
            return _val;
        },
        getIncre: function (source, target, sub) {
            //太恶心了 ！！！
            if (sub) {//这里都是差值的形式 没有直接增加的说法 因为是颜色嘛。。。
                let tarCo = hex2rgb(target);

                return {
                    r: tarCo.r - source.r,
                    g: tarCo.g - source.g,
                    b: tarCo.b - source.b
                }
            }
        }
    },
    "strokeStyle": {
        get: function (val) {
            // console.log('hex2wwwwwwrgb', hex2rgb(val));
            return hex2rgb(val);
        },
        set: function (source, incre, timer) {
            // console.log(source, incre, timer);
            let temCo = [
                source.r + Math.floor(incre.r * timer),
                source.g + Math.floor(incre.g * timer),
                source.b + Math.floor(incre.b * timer)//超级恶心颜色渐变
            ]
            let _val = '#' + rgb2hex(...temCo)
            return _val;
        },
        getIncre: function (source, target, sub) {
            //太恶心了 ！！！
            if (sub) {//这里都是差值的形式 没有直接增加的说法 因为是颜色嘛。。。
                let tarCo = hex2rgb(target);

                return {
                    r: tarCo.r - source.r,
                    g: tarCo.g - source.g,
                    b: tarCo.b - source.b
                }
            }
        }
    }
}
