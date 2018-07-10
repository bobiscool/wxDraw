/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-09-22 14:23:52 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2018-07-11 00:18:06
 * 普通形状
 * 
 */
import { util, matrixToarray, objToArray } from '../util/utils.js';
import { Matrix } from '../util/matrix.js';
import { Point } from "./mixins/points.js"; //准备把rect 改成 点形式
import { commonAttr, commonUnAttr } from "./mixins/commonAttr.js"; //共有属性
import { commonMethods } from "./mixins/commonMethods.js"; //共有方法



/**
 * 
 * 圆圈
 * @param {any} option  配置项
 * 
 */
export const Circle = function (option) {
    // var _temOption1 = util.mix(option,)
    var cOption = {
        x: 10,
        y: 10,
        r: 10,
        sA: 0,
        eA: Math.PI * 2,
        ...commonAttr()
    }

    var cUoption = {
        ...commonUnAttr(),
        counterclockwise: false, //这个还没用,
        closePath: false
    }
    var _temOption = util.extend(option, cOption);
    var _temUnOption = util.extend(option, cUoption);
    this.Option = _temOption;
    // console.log(_temUnOption);
    this.UnOption = _temUnOption;//不参与动画的属性
    this._isChoosed = false;
    this._offsetX = 0;
    this._offsetY = 0;
    this.fullCircle = true;
    // this.rotateOrigin = null;
    // 用于渐变的
    this._colorLock = false; //颜色锁 设置渐变之后 颜色就就不能动画了
    this._canRotateOrigin = true; // 限制 rotateOrigin 

    this.max = {
        maxX: null,
        maxY: null,
        minX: null,
        minY: null,
    };
    this.oriPoints = null//拿到最初的点位
    this._Points = [];//用于检测位置的 点位数组 也是当前位置

    this._isChoosed = false;
    this.rotateOrigin = null;
    this._drawLine = false; //用于标识是否画外框
    this.detectOriPoints = [];
    this._detectPoints = [];
    this.getOriPoints();//拿到原始点 
    this.getMax();//根据原始点 
    this._dirty = true;
    this._type = 'circle';
}

Circle.prototype = {
    getOriPoints: function () {
        var points = [],
            points2 = [],
            sA = this.Option.sA || 0,
            eA = this.Option.eA || Math.PI * 2,
            aA = eA - sA;

        // console.log(aA);            
        if (aA >= 2 * Math.PI) {
            this.fullCircle = true;
        } else {
            this.fullCircle = false;

        }


        for (var i = 0; i <= 100; ++i) {

            sA = this.Option.sA + i * aA / 100;
            // console.log(sA);
            // console.log(this.Option.x + this.Option.r * Math.sin(sA), this.Option.y - this.Option.r * Math.cos(sA));
            points.push([this.Option.x + this.Option.r * Math.sin(sA), this.Option.y - this.Option.r * Math.cos(sA)]);

            points2.push([this.Option.x + (this.Option.r + this.Option.lineWidth / 2) * Math.sin(sA), this.Option.y - (this.Option.r + this.Option.lineWidth / 2) * Math.cos(sA)]);
        }



        points.unshift([this.Option.x, this.Option.y]);
        points2.unshift([this.Option.x, this.Option.y]);
        this.oriPoints = points;
        this.detectOriPoints = points2;
    },
    getPoints: function () {
        //getPoints修改 现在不用 tranlate+rotate形式 
        let _points = [];
        let _points2 = [];
        let origin = null;
        if (!this.rotateOrigin) {
            origin = [this.Option.x, this.Option.y];
        } else {
            origin = this.rotateOrigin;
        }

        // //console.log('item', origin);

        this.oriPoints.forEach(function (item) {
            _points.push(this.getPointTodraw(item[0], item[1], origin))
        }, this);

        this.detectOriPoints.forEach(function (item) {
            _points2.push(this.getPointTodraw(item[0], item[1], origin))
        }, this);

        this._Points = matrixToarray(_points);//除掉矩阵多余的部分
        this._detectPoints = matrixToarray(_points2);
        // //console.log(this._Points);
        // //console.log(this.oriPoints);
        return this._Points;//除掉矩阵多余的部分;
    },
    getMax: function () {
        //绘制 与检测 不能在统一个地方
        let _Points = this.detectOriPoints;

        // console.log(_Points);
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
        var points = this._Points;

        context.beginPath();
        var startInt = 0;
        if (!this.UnOption.closePath) {
            startInt = 1;
        }

        context.moveTo(points[startInt][0], points[startInt][1]);
        for (var i = startInt + 1; i <= 101; ++i) {
            context.lineTo(points[i][0], points[i][1]);
        }
        if(this.UnOption.closePath){
        context.closePath();        
        }
    },
    _draw: function (context) {
        let changeMatrix = null;
        let getchaMatrix = null;
        let origin = null;
        if (this._dirty) {
            this.getOriPoints();//拿到所有原始点
            this.getPoints();//拿到所有真实点
            // //console.log('_POINTS',this._Points);
            this.getMax();//所有真实点max min
        }
        this.createPath(context);//绘制
        this._dirty = true;
    },
    getPointTodraw: function (x, y, origin) {

        let angle = this.Option.rotate;


        //将所有变化 都转到 Point对象去了 
        return new Point(x, y).rotate(origin, angle);//计算出每一个点变化之后的位置
    },
    move: function (x, y) {
        // //console.log('move', x, y);
        this.Option.x = x;
        this.Option.y = y;
        this._dirty = true;
    },

    detected: function (x, y) {
        // if (x > this.max.minX && x < this.max.maxX && y > this.max.minY && y < this.max.maxY) {
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
        // }

        return false;
    },
    moveDetect: function (x, y) {
        // if (!this.detected(x, y)) {
        //     this._isChoosed = false;
        // } else {
        if (this._isChoosed == true) {
            this.move(x + this._offsetX, y + this._offsetY);
            // this.getOriPoints();//拿到原始点
            // this.getPoints();//拿到变化点
            // this.getMax();//拿到边界点
        }
        // }
    },
    _pnpolyTest(x, y) {
        // 核心测试代码 理论源于  https://wrf.ecse.rpi.edu//Research/Short_Notes/pnpoly.html
        // var A = this.points[0];// 拿到前面两个点
        // var B = this.points[1];
        var ifInside = false;

        var Points = null;
        if (this._drawLine) {
            Points = this._detectPoints;
            // console.log("监测点");
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
    ...commonMethods
}



