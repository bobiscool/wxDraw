/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-10-15 23:33:37 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-10-16 09:38:56
 * 关于点的一些方法 
 * 
 */


import { Matrix } from '../../util/matrix.js';

export class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    translate(dx, dy) {
        this.x += dx;
        this.y += dy;
    }
    rotate(origin,angle) {

        if (origin) {
            let tx = -origin[0] + this.x;
            let ty = -origin[1] + this.y;
            let AtranslateMatrix = new Matrix([
                [origin[0]],
                [origin[1]]
            ]);//平移


            let rotateMatrix = new Matrix([
                [Math.cos(angle), -Math.sin(angle)],
                [Math.sin(angle), Math.cos(angle)]
            ]);//旋转

            let getChangeMatrix = new Matrix([
                [tx], [ty]
            ]);
            
            let _temMatrix = rotateMatrix.multi(getChangeMatrix).add(AtranslateMatrix);
            return _temMatrix.matrixArray;
        }
    }
    scale(){
        //现在 还不用 
    }
}