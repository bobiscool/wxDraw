/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-10-16 14:46:52 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-10-17 13:53:46
 * 添加一个特殊属性库 用于支持 有一些不在Option
 * 里面的属性
 */

export const specialOption = {
    "cshape": {
        "x": "massCenter",//用于平移用的
        "y": "massCenter"
    }
}

export const specialAtrr = {//一些特殊的属性值的更改
    "fillStyle":{
        get:function(val){
           let _val = val.split('#')[1];
           console.log('_val',parseInt(_val,16));
           return parseInt(_val,16);
        },
        set:function(val){
           console.log(val);
           let _val = "#"+val.toString(16);
           return _val;
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
