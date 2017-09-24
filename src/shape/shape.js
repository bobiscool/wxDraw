/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-09-22 15:45:51 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-09-24 10:50:46
 * 在这里添加事件 
 */


var ShapeBase = require('./shapeBase.js').ShapeBase;
var Circle = require('./normalShape.js').Circle;
var Rect = require('./normalShape.js').Rect;
var Polygon = require('./polygon.js').Polygon;


function Shape(type,option,strokeOrfill,draggable){
   this.draggable = draggable?true:false;
   this.strokeOrfill = strokeOrfill?true:false;//是否填充
   this.type = type;
   this.Shape = new shapeTypes[type](option);
}



Shape.prototype = {
    paint:function(context){
       if(this.strokeOrfill){
            this.Shape.fill(context);
       }else{
           this.Shape.stroke(context);
       }
    },
    detect:function(){
        //检查点击了谁
        
    }
}




var shapeTypes={
   "circle": function(option){
       return new Circle(option);
   },
    'rect':function(option){
       return new Rect(option);
    },
    'polygon':function(option){
       return new Polygon(option);
    }
}


var detectWay = {
    //侦查方式
    "circle":function(){
        
    }
}

module.exports = {
    Shape:Shape
}