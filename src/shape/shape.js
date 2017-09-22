/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-09-22 15:45:51 
 * @Last Modified by:   Thunderball.Wu 
 * @Last Modified time: 2017-09-22 15:45:51 
 * 在这里添加事件 
 */


var ShapeBase = require('./shapeBase.js').ShapeBase;
var Circle = require('./normalShape.js').Circle;

function Shape(type,option,draggable){
   this.draggable = draggable?true:false;
   this.Shape = new shapeTypes[type](option);
}





var shapeTypes={
   "circle": function(options){
       return new 
   }
}

