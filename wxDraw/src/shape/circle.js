/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-09-22 14:23:52 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2018-07-13 23:15:23
 * 普通形状
 * 
 */
import { util, matrixToarray, objToArray } from '../util/utils.js';
import { Matrix } from '../util/matrix.js';
import { Point } from './mixins/points.js'; 
import { commonAttr, commonUnAttr } from './mixins/commonAttr.js'; //共有属性
import { commonMethods } from "./mixins/commonMethods.js"; //共有方法
import { shapeBase } from './shapeBase'


/**
 * 
 * 圆圈
 * @param {any} option  配置项
 * 
 */
export class Circle extends shapeBase {
    // var _temOption1 = util.mix(option,)
   
    constructor(options){
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

        super(options, cOption, cUoption);
        this._type = 'circle';
        this.fullCircle = true;
        
    }

    getMax () {
      
        this.max = {
            maxX: this.Option.x + this.Option.r,
            maxY: this.Option.y + this.Option.r,
            minX: this.Option.y - this.Option.r,
            minY: this.Option.x - this.Option.r,
        };

    }
    
    getPoints() {
        //getPoints修改 现在不用 tranlate+rotate形式 
        let _points = [];
        let _points2 = [];
        let origin = null;
        if (!this.rotateOrigin) {
            origin = [this.Option.x, this.Option.y];
        } else {
            origin = this.rotateOrigin;
        }



        this.oriPoints.forEach(function (item) {
            _points.push(this.getPointTodraw(item[0], item[1], origin))
        }, this);

        this.detectOriPoints.forEach(function (item) {
            _points2.push(this.getPointTodraw(item[0], item[1], origin))
        }, this);

        this._Points = matrixToarray(_points);//除掉矩阵多余的部分
        this._detectPoints = matrixToarray(_points2);

        return this._Points;//除掉矩阵多余的部分;
    }
    
    
    createPath(context) {
        //创建路径
        var points = this._Points;
        context.beginPath();
        context.arc(this.Option.x, this.Option.y , this.Option.r , this.Option.sA, this.Option.eA);
    }
    _draw(context) {
        let changeMatrix = null;
        let getchaMatrix = null;
        let origin = null;
        if (this._dirty) {
            this.getPoints();//拿到所有真实点
            // //console.log('_POINTS',this._Points);
            this.getMax();//所有真实点max min
        }
        this.createPath(context);//绘制
        this._dirty = true;
    }

    getPointTodraw(x, y, origin) {

        let angle = this.Option.rotate;


        //将所有变化 都转到 Point对象去了 
        return new Point(x, y).rotate(origin, angle);//计算出每一个点变化之后的位置
    }
    move(x, y) {
        // //console.log('move', x, y);
        this.Option.x = x;
        this.Option.y = y;
        this._dirty = true;
    }
    detected(x, y) {
            this._offsetX = this.Option.x - x;
            this._offsetY = this.Option.y - y;
            if (this._pnpolyTest(x, y)) {
                this._isChoosed = true;
                return true;
            } else {
                return false;
            }
        return false;
    }
    moveDetect(x, y) {
   
        if (this._isChoosed == true) {
            this.move(x + this._offsetX, y + this._offsetY);
        }
    }

}

