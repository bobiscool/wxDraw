/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-09-22 14:23:52 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2018-07-13 23:54:13
 * 普通形状
 * 
 */
import { util, matrixToarray, objToArray } from '../util/utils.js';
import { Matrix } from '../util/matrix.js';
import { Point } from './mixins/points.js'; 
import { commonAttr, commonUnAttr } from './mixins/commonAttr.js'; //共有属性
import { defaultConfig } from "./mixins/defaultConfig.js"; //共有方法
import { shapeBase } from './shapeBase'


/**
 * 
 * 圆圈
 * @param {any} option  配置项
 * 
 */
export class Circle extends shapeBase {
   
    constructor(options){
        super(options, defaultConfig['circle']);
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
       this._detectPoints = [
            [this.Option.x + this.Option.r, this.Option.y + this.Option.r],
            [this.Option.x + this.Option.r, this.Option.y + this.Option.r],
            [this.Option.x + this.Option.r, this.Option.y + this.Option.r],
            [this.Option.x + this.Option.r, this.Option.y + this.Option.r]
       ]
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

