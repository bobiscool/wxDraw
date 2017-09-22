/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-09-22 11:32:35 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-09-22 23:32:20
 */

var pOption = {
    x:10,
    y:10,
    r:10,
    sides: 7,
    fillStyle:"red",
    strokeStyle:"red",
}

var util = require('../util/utils.js').util;


function Polygon(option) {
    var _temOption = util.extend(option,pOption);
    this.x = _temOption.x;
    this.y = _temOption.y;
    this.x = _temOption.x;
    this.radius = _temOption.r;
    this.sides = _temOption.sides;//边数
    this.points = this.getPoints();
    this.fillStyle = _temOption.fillStyle;
    this.strokeStyle = _temOption.strokeStyle;
}

Polygon.prototype = {
    getPoints: function () {
        var points = [],
            angle = this.startAngle || 0;

        for (var i = 0; i < this.sides; ++i) {
            points.push(new Point(this.x + this.radius * Math.sin(angle), this.y - this.radius * Math.cos(angle)));
            angle += 2 * Math.PI / this.sides;
        }
        return points;
    },
    createPath: function (context) {
        //创建路径
        var points = this.getPoints();

        context.beginPath();
        context.moveTo(points[0].x, points[0].y);
        for (var i = 1; i < this.sides; ++i) {
            context.lineTo(points[i].x, points[i].y);
        }
        context.closePath();
    },
    stroke: function (context) {
        context.save();
        this.createPath(context);
        context.setStrokeStyle(this.strokeStyle)
        context.stroke();
        context.restore();
    },
    fill: function(context){
       context.save();
        this.createPath(context);
        context.setStrokeStyle(this.fillStyle);
        context.fill();
        context.restore();
    },
    move: function (x,y) {
        this.x = x;
        this.y = y;
    }


}











function Point(x, y) {
    this.x = x;
    this.y = y;
}


module.exports = {
    Polygon: Polygon
}