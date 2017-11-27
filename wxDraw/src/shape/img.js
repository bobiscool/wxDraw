/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-11-24 10:39:42 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-11-27 11:30:35
 * 添加图像
 */

import { util, matrixToarray, objToArray } from "../util/utils.js";
import { Matrix } from "../util/matrix.js";
import { Point } from "./mixins/points.js"; //准备把rect 改成 点形式
import { commonAttr, commonUnAttr } from "./mixins/commonAttr.js"; //共有属性
import { commonMethods } from "./mixins/commonMethods.js"; //共有方法

export const Img = function (option) {
    var iOption = {
        x: 10,
        y: 10,
        w: 10,
        h: 10,
        rotate: 0,
        opacity: 1
    }

    var iUnOption = {
        file:""
    }

    var _temOption = util.extend(option, iOption);
    var _temUnOption = util.extend(option, iUnOption);

    this.Option = util.extend({}, _temOption);
    this.UnOption = _temUnOption;//不参与动画的属性

    this._isChoosed = false;
    this._offsetX = 0;
    this._offsetY = 0;
    // this.bus = null;
    this.rotateOrigin = null;
    this.oriPoints = [];
    this._Points = [];
    this._drawLine = false; //用于标识是否画外框
    this.detectOriPoints = [];
    this._detectPoints = [];
    this.max = {
        maxX: null,
        maxY: null,
        minX: null,
        minY: null,
    };
    this.getOriPoints();
    this.getPoints();
    this.getMax();
    this._dirty = true;
    this._type = 'image';
}

Img.prototype = {
    _draw: function (context) {
        let changeMatrix = null;
        let getchaMatrix = null;
        let origin = null;
      

        if (this._dirty) {
            this.getOriPoints();
            this.getPoints();//拿到所有真实点
            // //console.log('_POINTS',this.Option);
            this.getMax();//所有真实点max min
        }
        this.drawImage(context);//绘制
        this._dirty = false;

    },
    getOriPoints: function () {
        let points = [];
        points.push([this.Option.x - this.Option.w / 2, this.Option.y - this.Option.h / 2])
        points.push([this.Option.x - this.Option.w / 2, this.Option.y + this.Option.h / 2])
        points.push([this.Option.x + this.Option.w / 2, this.Option.y + this.Option.h / 2])
        points.push([this.Option.x + this.Option.w / 2, this.Option.y - this.Option.h / 2])

        this.oriPoints = points;
        this.detectOriPoints = points;
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
        this._detectPoints = matrixToarray(_points);//除掉矩阵多余的部分
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
        let _Points = this._detectPoints;

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
    drawImage: function (context) {
        //创建路径
        //console.log('创建路径');
        var points = this._Points;
        // //console.log(points);
        context.save();
        context.setGlobalAlpha(this.Option.opacity);
        context.beginPath();
        context.moveTo(points[0][0], points[0][1]);
        for (var i = 1; i < points.length; ++i) {
            context.lineTo(points[i][0], points[i][1]);
        }
        context.closePath();
        context.save();        
        if (!this.rotateOrigin) {
            context.translate(this.Option.x, this.Option.y);
            context.rotate(this.Option.rotate);
            // context.rect(-this.Option.w / 2, -this.Option.h / 2, this.Option.w, this.Option.h);
            context.drawImage(this.UnOption.file,-this.Option.w / 2, -this.Option.h / 2,this.Option.w,this.Option.h)
        } else {
            /**
             * 这里需要注意  在设置 旋转中心后  旋转的 位置点将变为rect 左上角
             */
            console.log('其他旋转中心')
            context.translate( this.rotateOrigin[0], this.rotateOrigin[1]);
            context.rotate(this.Option.rotate);
            // context.rect(this.Option.x - this.Option.rotateOrigin[0], this.Option.y - this.Option.rotateOrigin[1], this.Option.w, this.Option.h);
            context.drawImage(this.UnOption.file,this.Option.x - this.rotateOrigin[0],this.Option.y - this.rotateOrigin[1],this.Option.w,this.Option.h);
        }

        context.rotate(this.Option.rotate);
        // console.log(this.oriPoints);
        // console.log(this.UnOption);
        // console.log(this.UnOption.file);
        // console.log(this.oriPoints);
        
        context.restore();
        console.log(context);
       
    },
    _pnpolyTest(x, y) {
        // 核心测试代码 理论源于  https://wrf.ecse.rpi.edu//Research/Short_Notes/pnpoly.html
        // var A = this.points[0];// 拿到前面两个点
        // var B = this.points[1];
        var ifInside = false;

        var Points = null;

        // console.log('_detectPoints',this._detectPoints);
        // console.log('_detectPoints2',this._Points);
        if (this._drawLine) {
            Points = this._detectPoints;
        } else {
            Points = this._Points;
        }


        for (var i = 0, j = Points.length - 1; i < Points.length; j = i++) {
            /**
             * 0 4
               1 0
               2 1
               3 2
               4 3
             */
            var Xi = Points[i][0], Yi = Points[i][1];
            var Xj = Points[j][0], Yj = Points[j][1];

            var insect = ((Yi > y) != (Yj > y)) && (x < (Xj - Xi) * (y - Yi) / (Yj - Yi) + Xi);

            if (insect) ifInside = !ifInside;
        }

        // //console.log(ifInside);
        return ifInside;
    },
    move: function (x, y) {
        // console.log('move');
        this.Option.x = x;
        this.Option.y = y;
        this._dirty = true;
    },
    detected: function (x, y) {
        console.log('检测方块', x, y);
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
            } else {
                return false;
            }
        }

        return false;
    },
    moveDetect: function (x, y) {

        if (this._isChoosed == true) {
            this.move(x + this._offsetX, y + this._offsetY);
            // this.getOriPoints();//拿到原始点
            // this.getPoints();//拿到变化点
            // this.getMax();//拿到边界点
        }

    },
    ...commonMethods
}
