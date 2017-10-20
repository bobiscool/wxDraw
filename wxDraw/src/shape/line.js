/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-10-17 18:01:37 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-10-20 11:02:54
 * 线条 
 */

import { util, matrixToarray } from '../util/utils.js';
import { Matrix } from '../util/matrix.js';
import { Point } from "./mixins/points.js";
import { commonAttr, commonUnAttr } from "./mixins/commonAttr.js"; //共有属性
import { commonMethods } from "./mixins/commonMethods.js"; //共有方法

var lOption = {
    strokeStyle: "#000000",
    points: [
        [1, 2],
        [23, 45],
        [2, 45],
        [230, 205]
    ],
    ...commonAttr
}

export function Line(option) {
    let _temOption = util.extend(option, lOption);
    var _temUnOption = util.extend(option, commonUnAttr);

    this.Option = _temOption;
    this.UnOption = _temUnOption;//不参与动画的属性

    this.max = {
        maxX: null,
        maxY: null,
        minX: null,
        minY: null,
    };
    this.massCenter = this.genMassCenter(this.Option.points);// 拿到点位 先计算线段重心
    this.posPoints = this.genPointsPositiveLoc();

    this.oriPoints = this.Option.points;
    this._Points = this.Option.points;
    this.detectPoints = this.getDetectPoints();
    this.getMax();
    this._isChoosed = false;

    this.rotateOrigin = null

}
/**
 * 线的质心
 * 线的平移 
 * 线的旋转
 * 线的绘制
 */
Line.prototype = {
    genMassCenter(points) {
        //计算质心 
        let _allX = 0;
        let _allY = 0;
        points.forEach(function (item) {
            _allX += item[0];
            _allY += item[1];
        });

        return {
            x: _allX / points.length,
            y: _allY / points.length
        }
    },
    getOriPoints() {
        let _points = [];

        this.posPoints.forEach(function (item) {
            _points.push([this.massCenter.x - item[0], this.massCenter.y - item[1]]);
        }, this);//计算点位
        this.oriPoints = _points;
    },
    genPointsPositiveLoc() {
        // 计算出所有 点与中心的相对位置 只用一次。。。 之后不再用 所以 cshaoe
        // 不能放大 缩小
        let _allPos = [];
        this.Option.points.forEach(function (item) {
            _allPos.push([this.massCenter.x - item[0], this.massCenter.y - item[1]])
        }, this);
        return _allPos;
    },
    getDetectPoints() {
        let prePoints = [],
            behPoints = [];//头尾点
        this._Points.forEach(function (item, index) {
            //除了头尾 其余的都要产生 两个对应点
            if (index == 0 || index == this._Points.length - 1) {
                prePoints.push(item)
            } else {
                prePoints.push(item);
                behPoints.shift([item[0], item[1] - 5]);//行成一个圈用于区域检测

            }
        }, this);

        return prePoints.concat(behPoints);//合在一起就是 一个圈了 
    },
    genPoints() {
        let _points = [];
        let origin = null;
        if (!this.rotateOrigin) {
            origin = [this.massCenter.x, this.massCenter.y];
        } else {
            origin = this.rotateOrigin;
        }

        // //console.log('item', origin);

        this.oriPoints.forEach(function (item) {
            _points.push(this.getPointTodraw(item[0], item[1], origin))
        }, this);

        // //console.log('points',_points);
        this._Points = matrixToarray(_points);//除掉矩阵多余的部分
        // //console.log(this._Points);
        // //console.log(this.oriPoints);
        return this._Points;//除掉矩阵多余的部分;
    },
    getPointTodraw(x, y, origin) {
        let angle = this.Option.rotate;
        return new Point(x, y).rotate(origin, angle);//计算出每一个点变化之后的位置
    },
    getMax() {
        //绘制 与检测 不能在统一个地方
        let _Points = this._Points;

        this.max = {
            maxX: null,
            maxY: null,
            minX: null,
            minY: null,
        };

        _Points.forEach(function (element) {
            // //console.log('el',element[1]);
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
    createPath(context) {
        //创建路径
        var points = this._Points;
        if (points.length <= 0) {
            return false;
        }
        context.beginPath();
        // //console.log(points.length);
        context.moveTo(points[0][0], points[0][1]);
        for (var i = 1; i < points.length; i++) {
            context.lineTo(points[i][0], points[i][1]);
        }
    },
    stroke(context) {//线条就只有stroke了
        context.save();
        this._draw(context);
        context.setStrokeStyle(this.Option.strokeStyle)
        context.setLineWidth(this.Option.lineWidth);
        this.setCommonstyle(context);
        if (this.Option.Shadow) {
            // console.log(objToArray(this.Option.Shadow));
            context.setShadow(this.Option.Shadow.offsetX, this.Option.Shadow.offsetY, this.Option.Shadow.blur, this.Option.Shadow.color);
        }
        context.stroke();
        context.restore();
    },
    fill(context) {
        this.stroke(context);//这里先这样写吧
    },
    _draw(context) {
        // //console.log(this.massCenter);
        //    //console.log(this.oriPoints);
        this.getOriPoints();
        this.genPoints();//拿到所有真实点
        // //console.log('_POINTS',this._Points);
        this.detectPoints = this.getDetectPoints();
        this.getMax();//所有真实点max min
        this.createPath(context);//绘制
    },
    move(x, y) {

        this.massCenter.x = x;
        this.massCenter.y = y;
        // //console.log('---------------', this.Option);
    },
    detected(x, y) {
        // pnpoly 算法区域
        if (x > this.max.minX && x < this.max.maxX && y > this.max.minY && y < this.max.maxY) {
            this._offsetX = this.massCenter.x - x;
            this._offsetY = this.massCenter.y - y;
            if (this._pnpolyTest(x, y)) {
                this._isChoosed = true;
                return true;
            }
        }

        return false;
    },
    moveDetect(x, y) {

        if (this._isChoosed == true) {
            this.move(x + this._offsetX, y + this._offsetY);
            this.getOriPoints();
            // //console.log(this.massCenter);
            // //console.log(this.oriPoints);
            this.genPoints();
            this.detectPoints = this.getDetectPoints();
            this.getMax();
        }

    },
    _pnpolyTest(x, y) {
        // 核心测试代码 理论源于  https://wrf.ecse.rpi.edu//Research/Short_Notes/pnpoly.html
        // var A = this.points[0];// 拿到前面两个点
        // var B = this.points[1];
        var ifInside = false;
        var Points = this.detectPoints;
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

        return ifInside;
    },
    ...commonMethods
}

