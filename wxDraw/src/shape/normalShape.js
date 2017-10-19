/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-09-22 14:23:52 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-10-19 17:10:55
 * 普通形状
 * 
 */
import { util, matrixToarray } from '../util/utils.js';
import { Matrix } from '../util/matrix.js';
import { Point } from "./mixins/points.js" //准备把rect 改成 点形式
import { commonAttr } from "./mixins/commonAttr.js" //共有属性



var cOption = {
    fillStyle: "#000000",
    strokeStyle: "red",
    x: 10,
    y: 10,
    r: 10,
    sA: 0,
    eA: Math.PI * 2,
    counterclockwise: false,
    rotate: 0,
    ...commonAttr
}
var rOption = {
    x: 10,
    y: 10,
    w: 10,
    h: 10,
    fillStyle: "#000000",
    strokeStyle: "#000000",
    rotate: 0,
    ...commonAttr    
}






/**
 * 
 * 圆圈
 * @param {any} option  配置项
 * 
 */
export const Circle = function (option) {
    // var _temOption1 = util.mix(option,)
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
        // //console.log('move', x, y);
        this.Option.x = x;
        this.Option.y = y;
    },
    detected: function (x, y) {
        var _self = this;
        if (Math.pow((_self.Option.x - x), 2) + Math.pow((_self.Option.y - y), 2) <= Math.pow(_self.Option.r, 2)) {
            this._offsetX = _self.Option.x - x;
            this._offsetY = _self.Option.y - y;
            //console.log('x', this._offsetX);
            //console.log('y', this._offsetY);
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
    setRotateOrigin: function (loc) {
        this.rotateOrigin = loc;
    }
}



/**
 * 方块
 */


export const Rect = function (option) {
    var _temOption = util.extend(option, rOption);
    //console.log(_temOption);
    this.Option = _temOption;
    this._isChoosed = false;
    this._offsetX = 0;
    this._offsetY = 0;
    this.bus = null;
    this.rotateOrigin = null;
    this.oriPoints = [];
    this._Points = [];

    this.max = {
        maxX: null,
        maxY: null,
        minX: null,
        minY: null,
    };
    this.getOriPoints();
    this.getPoints();
    this.getMax();
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
        let changeMatrix = null;
        let getchaMatrix = null;
        let origin = null;
        this.getOriPoints();
        this.getPoints();//拿到所有真实点
        // //console.log('_POINTS',this.Option);
        this.getMax();//所有真实点max min
        this.createPath(context);//绘制
    },
    getOriPoints: function () {
        let points = [];

        points.push([this.Option.x - this.Option.w / 2, this.Option.y - this.Option.h / 2])
        points.push([this.Option.x - this.Option.w / 2, this.Option.y + this.Option.h / 2])        
        points.push([this.Option.x + this.Option.w / 2, this.Option.y + this.Option.h / 2])        
        points.push([this.Option.x + this.Option.w / 2, this.Option.y - this.Option.h / 2])

        this.oriPoints = points;
    },
    getPoints: function () {
        let _points = [];
        let origin = null;
        if (!this.rotateOrigin) {
            origin = [this.Option.x, this.Option.y];
        } else {
            origin = this.rotateOrigin;
        }

        //console.log('item', origin);

        this.oriPoints.forEach(function (item) {
            _points.push(this.getPointTodraw(item[0], item[1], origin))
        }, this);

        this._Points = matrixToarray(_points);//除掉矩阵多余的部分
        // //console.log(this._Points);
        // //console.log(this.oriPoints);
        return this._Points;//除掉矩阵多余的部分;
    },
    getPointTodraw: function (x, y, origin) {
        let angle = this.Option.rotate;
        //将所有变化 都转到 Point对象去了 
        return new Point(x, y).rotate(origin, angle);//计算出每一个点变化之后的位置
    },
    getMax: function () {
        //绘制 与检测 不能在统一个地方
        let _Points = this._Points;

        this.max = {
            maxX: null,
            maxY: null,
            minX: null,
            minY: null,
        };

        _Points.forEach(function (element) {
            if (element[0] > this.max.maxX) {
                this.max.maxX = element[0];
            }
            if (!this.max.minX && this.max.minX !== 0) {
                this.max.minX = element[0];
            }
            if (this.max.minX && element[0] < this.max.minX) {
                this.max.minX = element[0];
            }



            if (element[1] > this.max.maxY) {
                this.max.maxY = element[1];
            }
            if (!this.max.minY && this.max.minY !== 0) {
                this.max.minY = element[1];
            }
            if (this.max.minY && element[1] < this.max.minY) {
                this.max.minY = element[1];
            }
        }, this);


    },
    createPath: function (context) {
        //创建路径
        //console.log('创建路径');
        var points = this._Points;
// //console.log(points);
        context.beginPath();
        context.moveTo(points[0][0], points[0][1]);
        for (var i = 1; i < points.length; ++i) {
            context.lineTo(points[i][0], points[i][1]);
        }
        context.closePath();
    },
    _pnpolyTest(x, y) {
        // 核心测试代码 理论源于  https://wrf.ecse.rpi.edu//Research/Short_Notes/pnpoly.html
        // var A = this.points[0];// 拿到前面两个点
        // var B = this.points[1];
        var ifInside = false;

        for (var i = 0, j = this._Points.length - 1; i < this._Points.length; j = i++) {
            /**
             * 0 4
               1 0
               2 1
               3 2
               4 3
             */
            var Xi = this._Points[i][0], Yi = this._Points[i][1];
            var Xj = this._Points[j][0], Yj = this._Points[j][1];

            var insect = ((Yi > y) != (Yj > y)) && (x < (Xj - Xi) * (y - Yi) / (Yj - Yi) + Xi);

            if (insect) ifInside = !ifInside;
        }

        // //console.log(ifInside);
        return ifInside;
    },
    move: function (x, y) {
        this.Option.x = x;
        this.Option.y = y;
    },
    detected: function (x, y) {
        // //console.log('检测方块', x, y);
        // //console.log('方块', this.Option);
        var _self = this;

        // //console.log('方块', _self.Option.x, x, _self.Option.y, y, (_self.Option.y + _self.Option.h), y, (_self.Option.x + _self.Option.w), x);
         if (x > this.max.minX && x < this.max.maxX && y > this.max.minY && y < this.max.maxY) {
            //在最小矩形里面才开始
            // //console.log('点中');
            // this.points = this._Points;

            this._offsetX = this.Option.x - x;
            this._offsetY = this.Option.y - y;
            if (this._pnpolyTest(x, y)) {
                this._isChoosed = true;
                return true;
            }
        }
    },
    moveDetect: function (x, y) {

        if (this._isChoosed == true) {
            this.move(x + this._offsetX, y + this._offsetY);
            this.getOriPoints();//拿到原始点
            this.getPoints();//拿到变化点
            this.getMax();//拿到边界点
        }

    },
    upDetect: function () {
        this._isChoosed = false;
    },
    updateOption: function (option) {

        this.Option = util.extend(option, this.Option);
        this.bus.dispatch('update', 'no');
    },
    setRotateOrigin: function (loc) {
        this.rotateOrigin = loc;
    }

}









// module.exports = {
//     Circle: Circle,
//     Rect: Rect
// }

