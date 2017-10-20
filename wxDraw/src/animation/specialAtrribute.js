/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-10-16 14:46:52 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-10-20 09:51:31
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
            // //console.log('hex2wwwwwwrgb', hex2rgb(val));
            return hex2rgb(val);
        },
        set: function (source, incre, timer) {
            // //console.log(source, incre, timer);
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
            // //console.log('hex2wwwwwwrgb', hex2rgb(val));
            return hex2rgb(val);
        },
        set: function (source, incre, timer) {
            // //console.log(source, incre, timer);
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
    "Shadow": {
        // 卧槽 再次刷新了 我自己恶心自己的底线 。。。。 Shadow里面继续颜色改变
        get: function (val) {
            let _temSh = {
                offsetX: val.offsetX,
                offsetY: val.offsetY,
                blur: val.blur,
                color: hex2rgb(val.color)
            }
            
            console.log('val',val);
            console.log('_temSh',_temSh);
            
            return _temSh;
        },
        set: function (source, incre, timer) {
            // //console.log(source, incre, timer);

            let _temCo = [
                source.color.r + Math.floor(incre.color.r * timer),
                source.color.g + Math.floor(incre.color.g * timer),
                source.color.b + Math.floor(incre.color.b * timer)//超级恶心颜色渐变
            ]

            let _temCoH = '#' + rgb2hex(..._temCo); 
            let _temSha = {
                offsetX: source.offsetX + incre.offsetX * timer,
                offsetY: source.offsetY + incre.offsetY * timer,
                blur: source.blur + incre.blur * timer,
                color: _temCoH
            }
            // let _val = '#' + rgb2hex(...temCo)
            console.log(_temSha);
            return _temSha;
        },
        getIncre: function (source, target, sub) {
            //太恶心了 ！！！ 特殊属性全是 差值形式 不然要恶心死我
            // if (sub) {//这里都是差值的形式 没有直接增加的说法 因为是颜色嘛。。。
                let tarCo = hex2rgb(target.color);
                 
                // console.log('ssssss',source);
                let increCo={
                    r: tarCo.r - source.color.r,
                    g: tarCo.g - source.color.g,
                    b: tarCo.b - source.color.b
                }



            // }
             

            // console.log('source',target);

            return {
                 offsetX: (target.offsetX?target.offsetX:5) - source.offsetX,
                offsetY: (target.offsetY?target.offsetY:5)- source.offsetY,
                blur: (target.blur?target.blur:5)- source.blur,
                color: increCo
            }

            
        }
    }
}
