
/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-09-22 15:45:51 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-09-28 14:31:22
 * 在这里添加事件 
 */

import { Polygon } from './polygon.js';
import { Rect,Circle } from './normalShape.js';
import { AnimationTimer } from '../aniamtion/animation.js';


export var  Shape=function(type, option, strokeOrfill, draggable, highlight) {
    this.draggable = draggable ? true : false;
    this.highlight = highlight ? true : false;
    this.strokeOrfill = strokeOrfill ? true : false;//是否填充
    this.type = type;
    this.Shape = new shapeTypes[type](option);
    this.AnimationTimer = new AnimationTimer();
}



Shape.prototype = {
    paint: function (context) {
        if (this.strokeOrfill) {
            this.Shape.fill(context);
        } else {
            this.Shape.stroke(context);
        }
    },
    detect: function (x, y) {
        //检查点击了谁
        this.Shape.detected(x, y);
        if (this.Shape.detected(x, y)) {

        }

    },
    moveDetect: function (x, y) {
        // console.log('moveDetect')
        this.Shape.moveDetect(x, y);
    },
    upDetect:function(){
        this.Shape.upDetect();
    },
    animate:function(atrribute,exp,option){
       
    }
}




var shapeTypes = {
    "circle": function (option) {
        return new Circle(option);
    },
    'rect': function (option) {
        return new Rect(option);
    },
    'polygon': function (option) {
        return new Polygon(option);
    }
}
