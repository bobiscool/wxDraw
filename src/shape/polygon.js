/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-09-22 11:32:35 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-09-22 13:17:10
 */



function Polygon(centerX, centerY, radius, sides, fillStyle, filled) {
    this.x = centerX;
    this.y = centerY;
    this.radius = radius;
    this.sides = sides;//边数
    this.points = this.getPoints(); 
    this.fillStyle = fillStyle;

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
    paint: function (context) {

    },


}











 function Points(x,y){
   this.x = x;
   this.y = y;
}