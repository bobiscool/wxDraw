/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-09-22 14:23:52 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-10-10 17:31:40
 * 普通形状
 * 
 */
import { util } from '../util/utils.js';


var cOption = {
    fillStyle: "red",
    strokeStyle: "red",
    x: 10,
    y: 10,
    r: 10,
    sA: 0,
    eA: Math.PI * 2,
    counterclockwise: false,
    rotate: 0,
    rotateOrigin: null
}
var rOption = {
    x: 10,
    y: 10,
    w: 10,
    h: 10,
    fillStyle: "red",
    strokeStyle: "red",
    rotate: 0,
    rotateOrigin: null
}






/**
 * 
 * 圆圈
 * @param {any} option  配置项
 * 
 */
export const Circle = function (option) {
    var _temOption = util.extend(option, cOption);
    console.log('_temOption', _temOption);
    this.x = _temOption.x;
    this.y = _temOption.y;
    this.r = _temOption.r;
    this.sA = _temOption.sA;
    this.eA = _temOption.eA;
    this.counterclockwise = _temOption.counterclockwise;
    this.fillStyle = _temOption.fillStyle;
    this.strokeStyle = _temOption.strokeStyle;
    this.rotate = _temOption.rotate;
    this.rotateOrigin = _temOption.rotateOrigin;
    this._isChoosed = false;
    this._offsetX = 0;
    this._offsetY = 0;
}

Circle.prototype = {
    stroke: function (context) {
        context.save();
        context.beginPath();
        if (!this.rotateOrigin) {
            context.translate(this.x, this.y);
        }
        context.rotate(this.rotate);
        context.arc(this.x, this.y, this.r, this.sA, this.eA, this.counterclockwise);
        context.closePath();
        context.setStrokeStyle(this.strokeStyle)

        context.stroke();

        context.restore();
    },
    fill: function (context) {
        context.save();
        context.beginPath();
        if (!this.rotateOrigin) {
            context.translate(this.x, this.y);
        }
        context.rotate(this.rotate);
        context.arc(this.x, this.y, this.r, this.sA, this.eA, this.counterclockwise);
        context.closePath();
        context.setFillStyle(this.fillStyle);
        context.fill();
        context.restore();
    },
    move: function (x, y) {
        // console.log('move', x, y);
        this.x = x;
        this.y = y;
    },
    detected: function (x, y) {
        var _self = this;
        if (Math.pow((_self.x - x), 2) + Math.pow((_self.y - y), 2) <= Math.pow(_self.r, 2)) {
            this._offsetX = _self.x - x;
            this._offsetY = _self.y - y;
            console.log('x', this._offsetX);
            console.log('y', this._offsetY);
            this._isChoosed = true;
            return true;// 点击
        }
    },
    moveDetect: function (x, y) {
        // if (!this.detected(x, y)) {
        //     this._isChoosed = false;
        // } else {
        if (this._isChoosed == true) {

            this.move(x + this._offsetX, y + this._offsetY);
        }
        // }
    },
    upDetect: function () {
        this._isChoosed = false;
    }
}



/**
 * 方块
 */


export const Rect = function (option) {
    var _temOption = util.extend(option, rOption);
    console.log(_temOption);
    this.x = _temOption.x;
    this.y = _temOption.y;
    this.w = _temOption.w;
    this.h = _temOption.h;
    this.fillStyle = _temOption.fillStyle;
    this.strokeStyle = _temOption.strokeStyle;
    this.rotate = _temOption.rotate;
    this.rotateOrigin = _temOption.rotateOrigin;
    this._isChoosed = false;
    this._offsetX = 0;
    this._offsetY = 0;
}

Rect.prototype = {
    stroke: function (context) {
        context.save();
        context.beginPath();
        if (!this.rotateOrigin) {
            context.translate(this.x, this.y);

        }
        context.rotate(this.rotate);
        context.rect(this.x, this.y, this.w, this.h);
        context.closePath();
        context.setStrokeStyle(this.strokeStyle)
        context.stroke();

        context.restore();
    },
    fill: function (context) {
        context.save();
        context.beginPath();
        if (!this.rotateOrigin) {
            context.translate(this.x, this.y);
            context.rotate(this.rotate);
            context.rect(-this.w / 2, -this.h / 2, this.w, this.h);
        } else {
            context.translate(this.rotateOrigin[0], this.rotateOrigin[1]);
            context.rotate(this.rotate);
            context.rect(this.x - this.rotateOrigin[0], this.y - this.rotateOrigin[1], this.w, this.h);
        }

        context.closePath();
        context.setFillStyle(this.fillStyle);
        context.fill();
        context.translate(0, 0);
        context.restore();
    },
    move: function (x, y) {
        this.x = x;
        this.y = y;
    },
    detected: function (x, y) {
        var _self = this;
        if (_self.x < x && _self.y < y && (_self.y + _self.h) > y && (_self.x + _self.w) > x) {
            this._offsetX = x - _self.x;
            this._offsetY = y - _self.y;
            console.log('移动方块');
            this._isChoosed = true;
            return true;// 点击
        }
    },
    moveDetect: function (x, y) {

        if (this._isChoosed == true) {
            this.move(x - this._offsetX, y - this._offsetY);
        }

    },
    upDetect: function () {
        this._isChoosed = false;
    },
    updateOption: function (option) {
        var _temOption = util.extend(option, cOption);
        this.x = _temOption.x;
        this.y = _temOption.y;
        this.r = _temOption.r;
        this.sA = _temOption.sA;
        this.eA = _temOption.eA;
        this.counterclockwise = _temOption.counterclockwise;
        this.fillStyle = _temOption.fillStyle;
        this.strokeStyle = _temOption.strokeStyle;
        this.rotate = _temOption.rotate;
        this.rotateOrigin = _temOption.rotateOrigin;
        this._isChoosed = false;
        this._offsetX = 0;
        this._offsetY = 0;
    }

}









// module.exports = {
//     Circle: Circle,
//     Rect: Rect
// }

