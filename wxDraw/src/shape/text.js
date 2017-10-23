/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-10-23 10:27:35 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-10-23 13:20:37
 * 字体对象
 */

import { util, matrixToarray } from '../util/utils.js';
import { commonAttr, commonUnAttr } from "./mixins/commonAttr.js"; //共有属性
import { commonMethods } from "./mixins/commonMethods.js"; //共有方法
import { Point } from "./mixins/points.js"

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
    this.boxOriPoints = [];
    this.boxPoints = [];
    this.rotateOrigin = null;
    this.offset = { // box中中心点与textalign点的差值
        x: 0,
        y: 0
    },
        this._offsetX = 0,//用于点击检测的
        this._offsetY = 0,
        this.getOriPoints();
    this.getPoints();
}


Text.prototype = {
    getOriPoints() {
        //根据 字体 估算出器背后box大小 位置
        // 这里还要根据 baseline textalgin来计算 box位置
        let points = [];
        let len = String(this.text).length;
        let w = len * this.Option.fontSize/2;
        let h = this.Option.fontSize;

        this.offset.x = align(this.Unoption.align, w);
        this.offset.y = baseline(this.Unoption.textBaseline, h);
        this.boxOption.x = this.Option.x + this.offset.x;
        this.boxOption.y = this.Option.y + this.offset.y;

        points.push([this.boxOption.x - w / 2, this.boxOption.y - h / 2])
        points.push([this.boxOption.x - w / 2, this.boxOption.y + h / 2])
        points.push([this.boxOption.x + w / 2, this.boxOption.y + h / 2])
        points.push([this.boxOption.x + w / 2, this.boxOption.y - h / 2])
        this.boxOriPoints = points;

    },
    getPoints: function () {
        let _points = [];
        let origin = null;
        if (!this.rotateOrigin) {
            origin = [this.boxOption.x, this.boxOption.y];
        } else {
            origin = this.rotateOrigin;
        }

        //console.log('item', origin);

        this.boxOriPoints.forEach(function (item) {
            _points.push(this.getPointTodraw(item[0], item[1], origin))
        }, this);


        this.boxPoints = matrixToarray(_points);//除掉矩阵多余的部分
        // //console.log(this._Points);
        // //console.log(this.oriPoints);
        return this._Points;//除掉矩阵多余的部分;
    },
    getPointTodraw: function (x, y, origin) {
        let angle = this.Option.rotate;
        //将所有变化 都转到 Point对象去了 
        return new Point(x, y).rotate(origin, angle);//计算出每一个点变化之后的位置
    },
    _pnpolyTest(x, y) {
        // 核心测试代码 理论源于  https://wrf.ecse.rpi.edu//Research/Short_Notes/pnpoly.html
        // var A = this.points[0];// 拿到前面两个点
        // var B = this.points[1];
        var ifInside = false;
        var Points = this.boxPoints;

        for (var i = 0, j = Points.length - 1; i < Points.length; j = i++) {

            var Xi = Points[i][0], Yi = Points[i][1];
            var Xj = Points[j][0], Yj = Points[j][1];

            var insect = ((Yi > y) != (Yj > y)) && (x < (Xj - Xi) * (y - Yi) / (Yj - Yi) + Xi);

            if (insect) ifInside = !ifInside;
        }

        return ifInside;
    },
    move: function (x, y) {
        this.boxOption.x = x;
        this.boxOption.y = y;
        this.Option.x = x - this.offset.x;
        this.Option.y = y - this.offset.y;
    },
    detected: function (x, y) {
        // //console.log('检测方块', x, y);
        // //console.log('方块', this.Option);
        var _self = this;

        // //console.log('方块', _self.Option.x, x, _self.Option.y, y, (_self.Option.y + _self.Option.h), y, (_self.Option.x + _self.Option.w), x);
        // if (x > this.max.minX && x < this.max.maxX && y > this.max.minY && y < this.max.maxY) {
        //在最小矩形里面才开始
        // //console.log('点中');
        // this.points = this._Points;

        this._offsetX = this.boxOption.x - x;
        this._offsetY = this.boxOption.y - y;
        if (this._pnpolyTest(x, y)) {
            this._isChoosed = true;
            return true;
        }
        // }
    },
    moveDetect: function (x, y) {

        if (this._isChoosed == true) {
            this.move(x + this._offsetX, y + this._offsetY);
            this.getOriPoints();//拿到原始点
            this.getPoints();//拿到变化点
        }

    },
    stroke: function (context) {
        this.fill(context);//先这样写
    },
    fill: function (context) {
        this.getOriPoints();//拿到原始点
        this.getPoints();//拿到变化点
        context.save();
        context.beginPath();
        context.setFontSize(this.Option.fontSize);
        context.setTextAlign(this.Unoption.align);
        context.setTextBaseline(this.Unoption.textBaseline);
        context.closePath();
        context.setFillStyle(this.Option.fillStyle);
        if (this.Option.Shadow) {
            // console.log(objToArray(this.Option.Shadow));
            context.setShadow(this.Option.Shadow.offsetX, this.Option.Shadow.offsetY, this.Option.Shadow.blur, this.Option.Shadow.color);
        }
        context.fillText(this.text,this.Option.x,this.Option.y);
        context.restore();
    },
    ...commonMethods
}