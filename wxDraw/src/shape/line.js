/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-10-17 18:01:37 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-10-17 18:10:30
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
    ]
}

export class Line {
    constructor() {
       
    }
    /**
     * 线的质心
     * 线的平移 
     * 线的旋转
     * 线的绘制
     */
}