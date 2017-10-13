/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-10-13 15:36:50 
 * @Last Modified by:   Thunderball.Wu 
 * @Last Modified time: 2017-10-13 15:36:50 \
 * 图形变换 还是得用矩阵
 * 所以 强忍着恶心写了一个矩阵计算。。
 * 以下用es6语法的形式书写
 * 
 */

export class Matrix {
    /**
     * Creates an instance of Matrix.
     * @param {any} PointsArray 矩阵数组
     * @memberof Matrix
     */
    constructor(PointsArray) {
        this.m = PointsArray.length;
        this.n = PointsArray[0].length;//获取矩阵的 m x n
        this.matrixArray = PointsArray;
    }

    multi(matrix) {
        //矩阵乘法
        let Points = [];
        if (matrix.m == this.n) {

            this.matrixArray.forEach(function (everyM, _index) {//将每一行拎出来
                // 好久没接触过 矩阵，。。头都写大了。。。
                // console.log(everyM);
                Points.push([]);
                // console.log(matrix.n);
                for (var i = 0; i < matrix.n; i++) {//要乘多少次
                    // 拿到这一列所有 其实这一列所有 就是 
                    let _p = 0;
                    everyM.forEach(function (_everN, index) {// 每一行的每一个 
                        _p += _everN * matrix.matrixArray[index][i]; //最小城乘数因子
                    });

                    // console.log(_p);
                    Points[_index][i] = _p;//😓
                }

            }, this);

            return new Matrix(Points);
        } else {
            console.log('两个矩阵没法计算');// 必须前一个n 等于后一个m才能计算
            return false;
        }
    }
    add(matrix) {//加法
        var Points = [];
        if (matrix.m === this.m && matrix.n == this.n) {
            
            this.matrixArray.forEach(function(everyM,index){
                Points.push([]);                
                everyM.forEach(function (_everN, _index) {// 每一行的每一个 
                        Points[index][_index]=_everN + matrix.matrixArray[index][_index]; //最小城乘数因子
                    });
            });

            return new Matrix(Points);
        }
    }
    sub(matrix) {//减法
         var Points = [];
        if (matrix.m === this.m && matrix.n == this.n) {
            
            this.matrixArray.forEach(function(everyM,index){
                Points.push([]);                
                everyM.forEach(function (_everN, _index) {// 每一行的每一个 
                        Points[index].push(_everN - matrix.matrixArray[index][_index]); //最小城乘数因子
                    });
            });

            return new Matrix(Points);
        }
    }
}


// var a=new Matrix([
//     [1,2],
//     [1,0],
//     [1,0]
// ]);

// var b = new Matrix([
//     [4,2],
//     [4,2],
//     [4,2],
// ]);


// console.log(a.add(b).matrixArray)