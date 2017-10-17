/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-10-16 14:46:52 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-10-17 14:33:35
 * 添加一个特殊属性库 用于支持 有一些不在Option
 * 里面的属性
 */

import { hex2rgb,rgb2hex } from '../util/utils.js';
 
 
export const specialOption = {
    "cshape": {
        "x": "massCenter",//用于平移用的
        "y": "massCenter"
    }
}

export const specialAtrr = {//一些特殊的属性值的更改
    "fillStyle":{
        get:function(val){
           return hex2rgb(val);
        },
        set:function(source,incre,timer){
           let temCo= {
               r:source.r+Math.floor(incre*timer),
               g:source.g+Math.floor(incre*timer),
               b:source.b+Math.floor(incre*timer)
           } 
           let _val = "#"+val.toString(16);
           return _val;
        },
        getIncre:function(source,target){
           //太恶心了 ！！！
        }
    },
    "strokeStyle":{
         get:function(val){
           let _val = val.split('#')[1];
           return parseInt(_val,10);
        },
        set:function(val){
           let _val = "#"+parseInt(val,16);
           return _val;
        }
    }
}
