/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-10-23 10:27:35 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-10-23 10:56:10
 * 字体对象
 */

import { util, matrixToarray } from '../util/utils.js';
import { commonAttr, commonUnAttr } from "./mixins/commonAttr.js"; //共有属性
import { commonMethods } from "./mixins/commonMethods.js"; //共有方法

let alignBaseline =function(Option,type,w,h) {
    return {
        "normal":-2,
        "bottom":0,
        "middle":-h/2,
        "top":-h,
        "left":0,
        "center":-w/2,
        "right":-w
    }
}


export const Text = function (option) {
    
    if(!option.text){
        return false;
    }
    var tOption = {
        x:100,
        y:200,
        fontSize:12,
        Shadow: {
            offsetX: 5,
            offsetY: 5,
            blur: 5,
            color: "#000000"
        },
        fillStyle: "#000000",
        strokeStyle: "#000000",
        rotate: 0,
        opacity: 1
    }
   
    var tUnoption = {
        textBaseline:"normal",
        align:"left"
    }

    this.text = option.text;
    this.Option = util.extend(option,tOption);
    this.Unoption = util.extend(option,tUnoption);
} 


Text.prototype = {
    getOriPoints(){
        //根据 字体 估算出器背后box大小 位置
        // 这里还要根据 baseline textalgin来计算 box位置
        let points = [];
        let len = String(this.text).length;
        let w = len*this.Option.fontSize;
        let h = len*this.Option.fontSize;

        
    } 
}