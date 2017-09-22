/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-09-22 14:23:52 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-09-22 17:56:50
 * 普通形状
 * 
 */

var cOption = {
    fillStyle: "red",
    strokeStyle: "red",
    centerX:10,
    centerY:10,
    radius:10,
    startAngle: 0,
    endAngle: Math.PI*2,
    counterclockwise:false
}



var util = require('../util/utils.js').util;
function Circle(option) {
    var _temOption = util.extends(option,cOption);
    this.x = _temOption.centerX;
    this.y = _temOption.centerY;
    this.radius = _temOption.radius;
    this.startAngle = _temOption.startAngle;
    this.endAngle  = _temOption.endAngle;
    this.counterclockwise = _temOption.counterclockwise;
}

Circle.prototype = {
    stroke: function (context) {
        context.save();
        context.arc(this.x,this.y,this.radius,this.startAngle,this.endAngle,this.counterclockwise);
        context.setStrokeStyle(this.strokeStyle)
        context.stroke();
        context.restore();
    },
    fill: function(context) {
        context.save();
        context.arc(this.x,this.y,this.radius,this.startAngle,this.endAngle,this.counterclockwise);        
        context.setStrokeStyle(this.fillStyle);
        context.fill();
        context.restore();
    },
    move: function (x, y) {
        this.x = x;
        this.y = y;
    }
}












module.exports = {
    Circle:Circle
}