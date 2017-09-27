/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-09-22 11:32:35 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-09-27 13:42:45
 */

var pOption = {
    x: 10,
    y: 10,
    r: 10,
    sides: 7,
    fillStyle: "red",
    strokeStyle: "red",
}



function Point(x, y) {
    this.x = x;
    this.y = y;
}

var util = require('../util/utils.js').util;


export const Polygon=function(option) {
    var _temOption = util.extend(option, pOption);
    this.x = _temOption.x;
    this.y = _temOption.y;
    this.x = _temOption.x;
    this.radius = _temOption.r;
    this.sides = _temOption.sides;//边数
    this.max = {
        maxX: 0,
        maxY: 0,
        minX: 0,
        minY: 0,
    };
    this.points = this.getPoints();
    this.fillStyle = _temOption.fillStyle;
    this.strokeStyle = _temOption.strokeStyle;
    this._isChoosed = false;
}

Polygon.prototype = {
    getPoints: function () {
        var points = [],
            angle = this.startAngle || 0;
        //每次getPoints 要刷新max

        this.max = {
            maxX: 0,
            maxY: 0,
            minX: 0,
            minY: 0,
        };


        for (var i = 0; i < this.sides; ++i) {
            points.push(new Point(this.x + this.radius * Math.sin(angle), this.y - this.radius * Math.cos(angle)));
            if ((this.x + this.radius * Math.sin(angle)) > this.max.maxX) {
                this.max.maxX = (this.x + this.radius * Math.sin(angle));
            }
            if (!this.max.minX) {
                this.max.minX = this.x + this.radius * Math.sin(angle)
            }
            if (this.max.minX && ((this.x + this.radius * Math.sin(angle)) < this.max.minX)) {
                this.max.minX = (this.x + this.radius * Math.sin(angle));
            }



            if ((this.y + this.radius * Math.sin(angle)) > this.max.maxY) {
                this.max.maxY = (this.y + this.radius * Math.sin(angle));
            }
            if (!this.max.minY) {
                this.max.minY = this.y + this.radius * Math.sin(angle)
            }
            if (this.max.minY && ((this.y + this.radius * Math.sin(angle)) < this.max.minY)) {
                this.max.minY = (this.y + this.radius * Math.sin(angle));
            }


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
    fill: function (context) {
        context.save();
        this.createPath(context);
        context.setStrokeStyle(this.fillStyle);
        context.fill();
        context.restore();
    },
    move: function (x, y) {
        this.x = x;
        this.y = y;
    },
    detected: function (x, y) {
        // pnpoly 算法区域

        // 首先找到 最大x 最小x 最大y 最小y
        if (x > this.max.minX && x < this.max.maxX && y > this.max.minY && y < this.max.maxY) {
            //在最小矩形里面才开始
            this.points = this.getPoints();

            this._offsetX = this.x - x;
            this._offsetY = this.y - y;
            if (this._pnpolyTest(x, y)) {
                this._isChoosed = true;
            }
        }


    },
    moveDetect: function (x, y) {

        if (this._isChoosed == true) {
            this.move(x + this._offsetX, y + this._offsetY);
        }

    },
    upDetect: function () {
        this._isChoosed = false;
    },
    _pnpolyTest(x, y) {
        // 核心测试代码 理论源于  https://wrf.ecse.rpi.edu//Research/Short_Notes/pnpoly.html
        // var A = this.points[0];// 拿到前面两个点
        // var B = this.points[1];
        var ifInside = false;

        for (var i = 0, j = this.points.length - 1; i < this.points.length; j = i++) {
            /**
             * 0 4
               1 0
               2 1
               3 2
               4 3
             */
            var Xi = this.points[i].x, Yi = this.points[i].y;
            var Xj = this.points[j].x, Yj = this.points[j].y;

            var insect = ((Yi > y) != (Yj > y)) && (x < (Xj - Xi) * (y - Yi) / (Yj - Yi) + Xi);

            if (insect) ifInside = !ifInside;
        }

        console.log(ifInside);
        return ifInside;
    }


}


