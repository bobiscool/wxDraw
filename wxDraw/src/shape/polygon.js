/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-09-22 11:32:35 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-10-13 10:19:05
 */

import { util } from '../util/utils.js';


var pOption = {
    x: 10,
    y: 10,
    r: 10,
    sides: 7,
    fillStyle: "red",
    strokeStyle: "red",
    rotate: 0,
    rotateOrigin: null
}



function Point(x, y) {
    this.x = x;
    this.y = y;
}




export const Polygon = function (option) {
    var _temOption = util.extend(option, pOption);

    this.Option = _temOption;

    this.max = {
        maxX: 0,
        maxY: 0,
        minX: 0,
        minY: 0,
    };
    this.points = this.getPoints(this.Option.x, this.Option.y);
    this.getMax();
    this._isChoosed = false;
    this.rotateOrigin=null    
}

Polygon.prototype = {
    getPoints: function (x, y) {
        var points = [],
            angle = this.Option.startAngle || 0;

        // console.log('Option',this.Option);
        //每次getPoints 要刷新max
        // console.log('init xy', x, y);

        for (var i = 0; i < this.Option.sides; ++i) {
            points.push(new Point(x + this.Option.r * Math.sin(angle), y - this.Option.r * Math.cos(angle)));
            angle += 2 * Math.PI / this.Option.sides;
        }
        return points;
    },
    getMax: function () {
        //绘制 与检测 不能在统一个地方
        let _Points = this.getPoints(this.Option.x, this.Option.y);

        this.max = {
            maxX: 0,
            maxY: 0,
            minX: 0,
            minY: 0,
        };

        _Points.forEach(function (element) {
            if (element.x > this.max.maxX) {
                this.max.maxX = element.x;
            }
            if (!this.max.minX) {
                this.max.minX = element.x;
            }
            if (this.max.minX && element.x < this.max.minX) {
                this.max.minX = element.x;
            }



            if (element.y > this.max.maxY) {
                this.max.maxY = element.y;
            }
            if (!this.max.minY) {
                this.max.minY = element.y;
            }
            if (this.max.minY && element.y < this.max.minY) {
                this.max.minY = element.y;
            }
        }, this);


    },
    createPath: function (context, x, y) {
        //创建路径
        var points = this.getPoints(x, y);

        context.beginPath();
        context.moveTo(points[0].x, points[0].y);
        for (var i = 1; i < this.Option.sides; ++i) {
            context.lineTo(points[i].x, points[i].y);
        }
        context.closePath();
    },
    stroke: function (context) {
        context.save();
        this._draw(context);
        context.setStrokeStyle(this.Option.strokeStyle)
        context.stroke();
        context.restore();
    },
    fill: function (context) {
        context.save();
        this._draw(context);
        context.setFillStyle(this.Option.fillStyle);
        context.fill();
        context.restore();
    },
    _draw: function (context) {
        this.getMax();
        if (!this.rotateOrigin) {
            context.translate(this.Option.x, this.Option.y);
            context.rotate(this.Option.rotate);
            this.createPath(context, 0, 0);
        } else {
            /**
             * 这里需要注意  在设置 旋转中心后  旋转的 位置点将变为rect 左上角
             */
            // console.log('不按原点旋转');
            context.translate(this.rotateOrigin[0], this.rotateOrigin[1]);
            context.rotate(this.Option.rotate);
            this.createPath(context, this.Option.x - this.rotateOrigin[0], this.Option.y - this.rotateOrigin[1])
        }
    },
    move: function (x, y) {

        this.Option.x = x;
        this.Option.y = y;
        // console.log('---------------', this.Option);
    },
    detected: function (x, y) {
        // pnpoly 算法区域

        // 首先找到 最大x 最小x 最大y 最小y
        // console.log('多边形点击',x,y,this.max)
        if (x > this.max.minX && x < this.max.maxX && y > this.max.minY && y < this.max.maxY) {
            //在最小矩形里面才开始
            console.log('点中');
            this.points = this.getPoints(this.Option.x, this.Option.y);

            this._offsetX = this.Option.x - x;
            this._offsetY = this.Option.y - y;
            if (this._pnpolyTest(x, y)) {
                this._isChoosed = true;
            }
        }


    },
    moveDetect: function (x, y) {

        if (this._isChoosed == true) {
            this.move(x + this._offsetX, y + this._offsetY);
            this.getMax();
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
    },
    updateOption: function (option) {
        console.log(option);        
        this.Option = util.extend(this.Option,option);
        console.log(this.Option);
        this.bus.dispatch('update', 'no');
    },
    setRotateOrigin:function(loc){
        this.rotateOrigin= loc;
    }


}


