/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-10-17 18:01:37 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-10-18 13:53:18
 * 线条 
 */

import { util, matrixToarray } from '../util/utils.js';
import { Matrix } from '../util/matrix.js';
import { Point } from "./mixins/points.js"

var lOption = {
    strokeStyle: "#000000",
    points: [
        [1, 2],
        [23, 45],
        [2, 45],
        [230, 205]
    ],
    rotate: 0
}

export class Line {
    constructor(option) {
        let _temOption = util.extend(lOption, option);
        this.Option = _temOption;
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
    }
    getOriPoints() {
        let _points = [];

        this.posPoints.forEach(function (item) {
            _points.push([this.massCenter.x - item[0], this.massCenter.y - item[1]]);
        }, this);//计算点位
        this.oriPoints = _points;
    }
    genPointsPositiveLoc() {
        // 计算出所有 点与中心的相对位置 只用一次。。。 之后不再用 所以 cshaoe
        // 不能放大 缩小
        let _allPos = [];
        this.Option.points.forEach(function (item) {
            _allPos.push([this.massCenter.x - item[0], this.massCenter.y - item[1]])
        }, this);
        return _allPos;
    }
    getDetectPoints() {
        let prePoints = [],
            behPoints = [];//头尾点
        this._Points.forEach(function (item, index) {
            //除了头尾 其余的都要产生 两个对应点
            if (index == 0 || index == this._Points.length - 1) {
                prePoints.push(item)
            } else {
                prePoints.push(item);
                behPoints.shift([item[0], item[1] - 2]);//行成一个圈用于区域检测

            }
        }, this);

        return prePoints.concat(behPoints);//合在一起就是 一个圈了 
    }
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
            // console.log('el',element[1]);
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


    }
}