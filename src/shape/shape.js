/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-09-22 15:45:51 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-09-22 16:00:49
 * 在这里添加事件 
 */


var ShapeBase = require('./shapeBase.js').ShapeBase;
var Circle = require('./normalShape.js').Circle;

function Shape(type,option,strokeOrfill,draggable){
   this.draggable = draggable?true:false;
   this.strokeOrfill = strokeOrfill?true:false;//是否填充
   this.Shape = new shapeTypes[type](option);
}



Shape.prototype = {
    paint:function(){
       if(strokeOrfill)
    }
}




var shapeTypes={
   "circle": function(option){
       return new Circle(option)
   }
}

