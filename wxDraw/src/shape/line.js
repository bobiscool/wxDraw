/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-10-17 18:01:37 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-10-17 18:28:26
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
        this.posPoints =  this.genPointsPositiveLoc();
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
            _allPos.push([this.massCenter.x- item[0], this.massCenter.y- item[1]])
        }, this);
        return _allPos;
    }
}