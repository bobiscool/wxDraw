/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-09-22 14:23:52 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2018-07-12 23:37:11
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

        console.log(this._type);
    }
    getOriPoints () {
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

            points.push([this.Option.x + this.Option.r * Math.sin(sA), this.Option.y - this.Option.r * Math.cos(sA)]);

            points2.push([this.Option.x + (this.Option.r + this.Option.lineWidth / 2) * Math.sin(sA), this.Option.y - (this.Option.r + this.Option.lineWidth / 2) * Math.cos(sA)]);
        }



        points.unshift([this.Option.x, this.Option.y]);
        points2.unshift([this.Option.x, this.Option.y]);
        this.oriPoints = points;
        this.detectOriPoints = points2;
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
    
    getMax () {
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


    }
    createPath(context) {
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
    }
    _draw(context) {
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

