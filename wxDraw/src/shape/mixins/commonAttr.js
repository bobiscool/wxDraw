/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-10-19 16:52:13 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-10-28 17:07:40
 * 常用的一些属性
 * 
 */

let Shadow = {
    offsetX: 5,
    offsetY: 5,
    blur: 5,
    color: "#000000"
}

export const commonAttr = function () {//避免变量污染
    return {
        //这些样式是可以被动画来设置的
        lineWidth: 0.5,//线宽
        shadow: {
            offsetX: 5,
            offsetY: 5,
            blur: 5,
            color: "#000000"
        },
        fillStyle: "#000000",
        strokeStyle: "#000000",
        rotate: 0,
        opacity: 1,
        lineDash: [[5, 5], 5],
        miterLimit:3
    }
}



export const commonUnAttr = function (){
    return { //这些样式只能单独设定 
        lineCap: "",    // lineCap	String	'butt'、'round'、'square'	线条的结束端点样式
        lineJoin: "",   //lineJoin	String	'bevel'、'round'、'miter'	线条的结束交点样式
        miterLimit: "",   //最大斜接长度
        gra:[],
        isLineDash:false,
        needShadow:false,
        closePath:true,        
        needGra:'no' //渐变形式  line 线性  circle 是径向   no 是没有
    }
}



