/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-09-22 14:23:52 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-10-13 10:14:26
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
}
var rOption = {
    x: 10,
    y: 10,
    w: 10,
    h: 10,
    fillStyle: "red",
    strokeStyle: "red",
    rotate: 0,
}






/**
 * 
 * 圆圈
 * @param {any} option  配置项
 * 
 */
export const Circle = function (option) {
    var _temOption = util.extend(option, cOption);
    this.Option = _temOption;

    this._isChoosed = false;
    this._offsetX = 0;
    this._offsetY = 0;
    this.rotateOrigin = null;
}

Circle.prototype = {
    stroke: function (context) {
        context.save();
        context.beginPath();
        this._draw(context);
        context.closePath();
        context.setStrokeStyle(this.Option.strokeStyle)

        context.stroke();

        context.restore();
    },
    fill: function (context) {
        context.save();
        context.beginPath();
        this._draw(context);
        context.closePath();
        context.setFillStyle(this.Option.fillStyle);
        context.fill();
        context.restore();
    },
    _draw: function (context) {
        if (!this.rotateOrigin) {
            context.translate(this.Option.x, this.Option.y);
            context.rotate(this.Option.rotate);
            context.arc(0, 0, this.Option.r, this.Option.sA, this.Option.eA, this.Option.counterclockwise);
        } else {
            /**
             * 这里需要注意  在设置 旋转中心后  旋转的 位置点将变为rect 左上角
             */
            context.translate(this.rotateOrigin[0], this.rotateOrigin[1]);
            context.rotate(this.Option.rotate);
            context.arc(this.Option.x - this.rotateOrigin[0], this.Option.y - this.rotateOrigin[1], this.Option.r, this.Option.sA, this.Option.eA, this.Option.counterclockwise);
        }
    },
    move: function (x, y) {
        // console.log('move', x, y);
        this.Option.x = x;
        this.Option.y = y;
    },
    detected: function (x, y) {
        var _self = this;
        if (Math.pow((_self.Option.x - x), 2) + Math.pow((_self.Option.y - y), 2) <= Math.pow(_self.Option.r, 2)) {
            this._offsetX = _self.Option.x - x;
            this._offsetY = _self.Option.y - y;
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
    },
    updateOption: function (option) {
        this.Option = util.extend(option, this.Option);
        this.bus.dispatch('update', 'no');
    },
    setRotateOrigin:function(loc){
        this.rotateOrigin= loc;
    }
}



/**
 * 方块
 */


export const Rect = function (option) {
    var _temOption = util.extend(option, rOption);
    // console.log(_temOption);
    this.Option = _temOption;
    this._isChoosed = false;
    this._offsetX = 0;
    this._offsetY = 0;
    this.bus = null;
    this.rotateOrigin = null;    
}

Rect.prototype = {
    stroke: function (context) {
        context.save();
        context.beginPath();

        this._draw(context);
        context.closePath();
        context.setStrokeStyle(this.Option.strokeStyle)
        context.stroke();

        context.restore();
    },
    fill: function (context) {
        context.save();
        context.beginPath();

        this._draw(context);
        context.closePath();
        context.setFillStyle(this.Option.fillStyle);
        context.fill();
        context.restore();
    },
    _draw: function (context) {
        if (!this.rotateOrigin) {
            context.translate(this.Option.x + this.Option.w / 2, this.Option.y + this.Option.h / 2);// 坐标原点变为 矩形 中心
            context.rotate(this.Option.rotate);
            context.rect(-this.Option.w / 2, -this.Option.h / 2, this.Option.w, this.Option.h);
        } else {
            /**
             * 这里需要注意  在设置 旋转中心后  旋转的 位置点将变为rect 左上角
             */
            context.translate(this.rotateOrigin[0], this.rotateOrigin[1]);
            context.rotate(this.Option.rotate);
            context.rect(this.Option.x - this.rotateOrigin[0], this.Option.y - this.rotateOrigin[1], this.Option.w, this.Option.h);
        }
    },
    move: function (x, y) {
        this.Option.x = x;
        this.Option.y = y;
    },
    detected: function (x, y) {
        // console.log('检测方块', x, y);
        // console.log('方块', this.Option);
        var _self = this;

        // console.log('方块', _self.Option.x, x, _self.Option.y, y, (_self.Option.y + _self.Option.h), y, (_self.Option.x + _self.Option.w), x);
        if (_self.Option.x < x && _self.Option.y < y && (_self.Option.y + _self.Option.h) > y && (_self.Option.x + _self.Option.w) > x) {
            this._offsetX = x - _self.Option.x;
            this._offsetY = y - _self.Option.y;
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

        this.Option = util.extend(option, this.Option);
        this.bus.dispatch('update', 'no');
    },
     setRotateOrigin:function(loc){
        this.rotateOrigin= loc;
    }

}









// module.exports = {
//     Circle: Circle,
//     Rect: Rect
// }

