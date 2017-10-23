/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-10-23 10:27:35 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-10-23 11:10:51
 * 字体对象
 */

import { util, matrixToarray } from '../util/utils.js';
import { commonAttr, commonUnAttr } from "./mixins/commonAttr.js"; //共有属性
import { commonMethods } from "./mixins/commonMethods.js"; //共有方法

let baseline = function (type, h) {
    return {
        "normal": 2,
        "bottom": -h / 2,
        "middle": 0,
        "top": h / 2,

    }[type]
}

let align = function (type, w) {
    return {
        "left": w / 2,
        "center": 0,
        "right": -w / 2
    }[type]
}

export const Text = function (option) {

    if (!option.text) {
        return false;
    }
    var tOption = {
        x: 100,
        y: 200,
        fontSize: 12,
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
        textBaseline: "normal",
        align: "left"
    }

    this.text = option.text;
    this.Option = util.extend(option, tOption);
    this.Unoption = util.extend(option, tUnoption);
    this.boxOption = { x: 0, y: 0 };
    this.boxOriPoints=[];
}


Text.prototype = {
    getOriPoints() {
        //根据 字体 估算出器背后box大小 位置
        // 这里还要根据 baseline textalgin来计算 box位置
        let points = [];
        let len = String(this.text).length;
        let w = len * this.Option.fontSize;
        let h = len * this.Option.fontSize;

        this.boxOption.x =this.Option.x+align(this.Unoption.align,w);
        this.boxOption.y =this.Option.y+baseline(this.Unoption.baseline,h);

        points.push([this.boxOption.x - w / 2, this.boxOption.y - h / 2])
        points.push([this.boxOption.x - w / 2, this.boxOption.y + h / 2])
        points.push([this.boxOption.x + w / 2, this.boxOption.y + h / 2])
        points.push([this.boxOption.x + w / 2, this.boxOption.y - h / 2])
        this.boxOriPoints = [];
        
    }
}