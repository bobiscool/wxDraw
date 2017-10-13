/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-10-13 15:36:50 
 * @Last Modified by:   Thunderball.Wu 
 * @Last Modified time: 2017-10-13 15:36:50 \
 * 图形变换 还是得用矩阵
 * 以下用es6语法的形式书写
 * 这里只做
 */

export class Matrix {
    /**
     * Creates an instance of Matrix.
     * @param {any} PointsArray 矩阵数组
     * @memberof Matrix
     */
    constructor(PointsArray) {
        this.n = PointsArray.lenghth;
        this.m = PointsArray[0].lenghth;//获取矩阵的 m x n
        this.matrixArray = PointsArray;
    }

    Muti(matrix) {
        //矩阵乘法
        if (matrix.m == this.n) {

            this.matrixArray.forEach(function (everyM) {
          // 好久没接触过 矩阵，。。头都写大了。。。
                for (var i = 0; i < matrix.n; i++) {
                    everyM.forEach(function (_everN) {
                        _everN
                    });
                }


            }, this);
        } else {
            console.log('两个矩阵没法计算');// 必须前一个n 等于后一个m才能计算
            return false;
        }
    }
}