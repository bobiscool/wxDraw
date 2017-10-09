'use strict';

/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-09-22 09:34:43 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-10-09 11:05:33
 * 
 * 工具库
 */

// import * as _ from "lodash"



var guid = function guid() {
    var guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : r & 0x3 | 0x8;
        return v.toString(16);
    });
    return guid;
};


var util = {
    mix: function mix(target, source, overlay) {
        //混合
        target = 'prototype' in target ? target.prototype : target;
        source = 'prototype' in source ? source.prototype : source;

        this.extend(target, source, overlay);
    },
    extend: function extend(target, source, overlay) {
        for (var key in source) {
            if (source.hasOwnProperty(key) && (overlay ? source[key] != null : target[key] == null)) {
                target[key] = source[key];
            }
        }
        return target;
    }
};

var Store = function Store() {
    this.store = [];
};

Store.prototype = {
    add: function add(shape) {
        // 添加 图形
        this.store.push(shape);
    },
    update: function update() {},
    delete: function _delete() {}

};

/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-09-22 11:32:35 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-09-27 14:07:35
 */

var pOption = {
    x: 10,
    y: 10,
    r: 10,
    sides: 7,
    fillStyle: "red",
    strokeStyle: "red"
};

function Point(x, y) {
    this.x = x;
    this.y = y;
}

var Polygon = function Polygon(option) {
    var _temOption = util.extend(option, pOption);
    this.x = _temOption.x;
    this.y = _temOption.y;
    this.x = _temOption.x;
    this.radius = _temOption.r;
    this.sides = _temOption.sides; //边数
    this.max = {
        maxX: 0,
        maxY: 0,
        minX: 0,
        minY: 0
    };
    this.points = this.getPoints();
    this.fillStyle = _temOption.fillStyle;
    this.strokeStyle = _temOption.strokeStyle;
    this._isChoosed = false;
};

Polygon.prototype = {
    getPoints: function getPoints() {
        var points = [],
            angle = this.startAngle || 0;
        //每次getPoints 要刷新max

        this.max = {
            maxX: 0,
            maxY: 0,
            minX: 0,
            minY: 0
        };

        for (var i = 0; i < this.sides; ++i) {
            points.push(new Point(this.x + this.radius * Math.sin(angle), this.y - this.radius * Math.cos(angle)));
            if (this.x + this.radius * Math.sin(angle) > this.max.maxX) {
                this.max.maxX = this.x + this.radius * Math.sin(angle);
            }
            if (!this.max.minX) {
                this.max.minX = this.x + this.radius * Math.sin(angle);
            }
            if (this.max.minX && this.x + this.radius * Math.sin(angle) < this.max.minX) {
                this.max.minX = this.x + this.radius * Math.sin(angle);
            }

            if (this.y + this.radius * Math.sin(angle) > this.max.maxY) {
                this.max.maxY = this.y + this.radius * Math.sin(angle);
            }
            if (!this.max.minY) {
                this.max.minY = this.y + this.radius * Math.sin(angle);
            }
            if (this.max.minY && this.y + this.radius * Math.sin(angle) < this.max.minY) {
                this.max.minY = this.y + this.radius * Math.sin(angle);
            }

            angle += 2 * Math.PI / this.sides;
        }
        return points;
    },
    createPath: function createPath(context) {
        //创建路径
        var points = this.getPoints();

        context.beginPath();
        context.moveTo(points[0].x, points[0].y);
        for (var i = 1; i < this.sides; ++i) {
            context.lineTo(points[i].x, points[i].y);
        }
        context.closePath();
    },
    stroke: function stroke(context) {
        context.save();
        this.createPath(context);
        context.setStrokeStyle(this.strokeStyle);
        context.stroke();
        context.restore();
    },
    fill: function fill(context) {
        context.save();
        this.createPath(context);
        context.setStrokeStyle(this.fillStyle);
        context.fill();
        context.restore();
    },
    move: function move(x, y) {
        this.x = x;
        this.y = y;
    },
    detected: function detected(x, y) {
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
    moveDetect: function moveDetect(x, y) {

        if (this._isChoosed == true) {
            this.move(x + this._offsetX, y + this._offsetY);
        }
    },
    upDetect: function upDetect() {
        this._isChoosed = false;
    },
    _pnpolyTest: function _pnpolyTest(x, y) {
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
            var Xi = this.points[i].x,
                Yi = this.points[i].y;
            var Xj = this.points[j].x,
                Yj = this.points[j].y;

            var insect = Yi > y != Yj > y && x < (Xj - Xi) * (y - Yi) / (Yj - Yi) + Xi;

            if (insect) ifInside = !ifInside;
        }

        console.log(ifInside);
        return ifInside;
    }
};

/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-09-22 14:23:52 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-09-27 14:10:00
 * 普通形状
 * 
 */
var cOption = {
    fillStyle: "red",
    strokeStyle: "red",
    x: 10,
    y: 10,
    r: 10,
    sA: 0,
    eA: Math.PI * 2,
    counterclockwise: false
};
var rOption = {
    x: 10,
    y: 10,
    w: 10,
    h: 10,
    fillStyle: "red",
    strokeStyle: "red"

    /**
     * 
     * 圆圈
     * @param {any} option  配置项
     * 
     */
};var Circle = function Circle(option) {
    var _temOption = util.extend(option, cOption);
    console.log('_temOption', _temOption);
    this.x = _temOption.x;
    this.y = _temOption.y;
    this.r = _temOption.r;
    this.sA = _temOption.sA;
    this.eA = _temOption.eA;
    this.counterclockwise = _temOption.counterclockwise;
    this.fillStyle = _temOption.fillStyle;
    this.strokeStyle = _temOption.strokeStyle;
    this._isChoosed = false;
    this._offsetX = 0;
    this._offsetY = 0;
};

Circle.prototype = {
    stroke: function stroke(context) {
        context.save();
        context.beginPath();
        context.arc(this.x, this.y, this.r, this.sA, this.eA, this.counterclockwise);
        context.closePath();
        context.setStrokeStyle(this.strokeStyle);
        context.stroke();

        context.restore();
    },
    fill: function fill(context) {
        context.save();
        context.beginPath();
        context.arc(this.x, this.y, this.r, this.sA, this.eA, this.counterclockwise);
        context.closePath();
        context.setFillStyle(this.fillStyle);
        context.fill();
        context.restore();
    },
    move: function move(x, y) {
        // console.log('move', x, y);
        this.x = x;
        this.y = y;
    },
    detected: function detected(x, y) {
        var _self = this;
        if (Math.pow(_self.x - x, 2) + Math.pow(_self.y - y, 2) <= Math.pow(_self.r, 2)) {
            this._offsetX = _self.x - x;
            this._offsetY = _self.y - y;
            console.log('x', this._offsetX);
            console.log('y', this._offsetY);
            this._isChoosed = true;
            return true; // 点击
        }
    },
    moveDetect: function moveDetect(x, y) {
        // if (!this.detected(x, y)) {
        //     this._isChoosed = false;
        // } else {
        if (this._isChoosed == true) {

            this.move(x + this._offsetX, y + this._offsetY);
        }
        // }
    },
    upDetect: function upDetect() {
        this._isChoosed = false;
    }

    /**
     * 方块
     */

};var Rect = function Rect(option) {
    var _temOption = util.extend(option, rOption);
    console.log(_temOption);
    this.x = _temOption.x;
    this.y = _temOption.y;
    this.w = _temOption.w;
    this.h = _temOption.h;
    this.fillStyle = _temOption.fillStyle;
    this.strokeStyle = _temOption.strokeStyle;
    this._isChoosed = false;
    this._offsetX = 0;
    this._offsetY = 0;
};

Rect.prototype = {
    stroke: function stroke(context) {
        context.save();
        context.beginPath();
        context.rect(this.x, this.y, this.w, this.h);
        context.closePath();
        context.setStrokeStyle(this.strokeStyle);
        context.stroke();

        context.restore();
    },
    fill: function fill(context) {
        context.save();
        context.beginPath();
        context.rect(this.x, this.y, this.w, this.h);
        context.closePath();
        context.setFillStyle(this.fillStyle);
        context.fill();
        context.restore();
    },
    move: function move(x, y) {
        this.x = x;
        this.y = y;
    },
    detected: function detected(x, y) {
        var _self = this;
        if (_self.x < x && _self.y < y && _self.y + _self.h > y && _self.x + _self.w > x) {
            this._offsetX = x - _self.x;
            this._offsetY = y - _self.y;
            console.log('移动方块');
            this._isChoosed = true;
            return true; // 点击
        }
    },
    moveDetect: function moveDetect(x, y) {

        if (this._isChoosed == true) {
            this.move(x - this._offsetX, y - this._offsetY);
        }
    },
    upDetect: function upDetect() {
        this._isChoosed = false;
    }

    // module.exports = {
    //     Circle: Circle,
    //     Rect: Rect
    // }

};

/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-09-28 13:43:40 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-10-08 18:49:36
  时间函数 基于
  http://easings.net/zh-cn
 */

var EasingFunctions = {
  // 线性函数
  linear: function linear(pos) {
    return pos;
  },
  easeInQuad: function easeInQuad(pos) {
    return Math.pow(pos, 2);
  },

  easeOutQuad: function easeOutQuad(pos) {
    return -(Math.pow(pos - 1, 2) - 1);
  },

  easeInOutQuad: function easeInOutQuad(pos) {
    if ((pos /= 0.5) < 1) return 0.5 * Math.pow(pos, 2);
    return -0.5 * ((pos -= 2) * pos - 2);
  },

  easeInCubic: function easeInCubic(pos) {
    return Math.pow(pos, 3);
  },

  easeOutCubic: function easeOutCubic(pos) {
    return Math.pow(pos - 1, 3) + 1;
  },

  easeInOutCubic: function easeInOutCubic(pos) {
    if ((pos /= 0.5) < 1) return 0.5 * Math.pow(pos, 3);
    return 0.5 * (Math.pow(pos - 2, 3) + 2);
  },

  easeInQuart: function easeInQuart(pos) {
    return Math.pow(pos, 4);
  },

  easeOutQuart: function easeOutQuart(pos) {
    return -(Math.pow(pos - 1, 4) - 1);
  },

  easeInOutQuart: function easeInOutQuart(pos) {
    if ((pos /= 0.5) < 1) return 0.5 * Math.pow(pos, 4);
    return -0.5 * ((pos -= 2) * Math.pow(pos, 3) - 2);
  },

  easeInQuint: function easeInQuint(pos) {
    return Math.pow(pos, 5);
  },

  easeOutQuint: function easeOutQuint(pos) {
    return Math.pow(pos - 1, 5) + 1;
  },

  easeInOutQuint: function easeInOutQuint(pos) {
    if ((pos /= 0.5) < 1) return 0.5 * Math.pow(pos, 5);
    return 0.5 * (Math.pow(pos - 2, 5) + 2);
  },

  easeInSine: function easeInSine(pos) {
    return -Math.cos(pos * (Math.PI / 2)) + 1;
  },

  easeOutSine: function easeOutSine(pos) {
    return Math.sin(pos * (Math.PI / 2));
  },

  easeInOutSine: function easeInOutSine(pos) {
    return -0.5 * (Math.cos(Math.PI * pos) - 1);
  },

  easeInExpo: function easeInExpo(pos) {
    return pos === 0 ? 0 : Math.pow(2, 10 * (pos - 1));
  },

  easeOutExpo: function easeOutExpo(pos) {
    return pos === 1 ? 1 : -Math.pow(2, -10 * pos) + 1;
  },

  easeInOutExpo: function easeInOutExpo(pos) {
    if (pos === 0) return 0;
    if (pos === 1) return 1;
    if ((pos /= 0.5) < 1) return 0.5 * Math.pow(2, 10 * (pos - 1));
    return 0.5 * (-Math.pow(2, -10 * --pos) + 2);
  },

  easeInCirc: function easeInCirc(pos) {
    return -(Math.sqrt(1 - pos * pos) - 1);
  },

  easeOutCirc: function easeOutCirc(pos) {
    return Math.sqrt(1 - Math.pow(pos - 1, 2));
  },

  easeInOutCirc: function easeInOutCirc(pos) {
    if ((pos /= 0.5) < 1) return -0.5 * (Math.sqrt(1 - pos * pos) - 1);
    return 0.5 * (Math.sqrt(1 - (pos -= 2) * pos) + 1);
  },

  easeOutBounce: function easeOutBounce(pos) {
    if (pos < 1 / 2.75) {
      return 7.5625 * pos * pos;
    } else if (pos < 2 / 2.75) {
      return 7.5625 * (pos -= 1.5 / 2.75) * pos + 0.75;
    } else if (pos < 2.5 / 2.75) {
      return 7.5625 * (pos -= 2.25 / 2.75) * pos + 0.9375;
    } else {
      return 7.5625 * (pos -= 2.625 / 2.75) * pos + 0.984375;
    }
  },

  easeInBack: function easeInBack(pos) {
    var s = 1.70158;
    return pos * pos * ((s + 1) * pos - s);
  },

  easeOutBack: function easeOutBack(pos) {
    var s = 1.70158;
    return (pos = pos - 1) * pos * ((s + 1) * pos + s) + 1;
  },

  easeInOutBack: function easeInOutBack(pos) {
    var s = 1.70158;
    if ((pos /= 0.5) < 1) return 0.5 * (pos * pos * (((s *= 1.525) + 1) * pos - s));
    return 0.5 * ((pos -= 2) * pos * (((s *= 1.525) + 1) * pos + s) + 2);
  },

  elastic: function elastic(pos) {
    return -1 * Math.pow(4, -8 * pos) * Math.sin((pos * 6 - 1) * (2 * Math.PI) / 2) + 1;
  },

  swingFromTo: function swingFromTo(pos) {
    var s = 1.70158;
    return (pos /= 0.5) < 1 ? 0.5 * (pos * pos * (((s *= 1.525) + 1) * pos - s)) : 0.5 * ((pos -= 2) * pos * (((s *= 1.525) + 1) * pos + s) + 2);
  },

  swingFrom: function swingFrom(pos) {
    var s = 1.70158;
    return pos * pos * ((s + 1) * pos - s);
  },

  swingTo: function swingTo(pos) {
    var s = 1.70158;
    return (pos -= 1) * pos * ((s + 1) * pos + s) + 1;
  },

  bounce: function bounce(pos) {
    if (pos < 1 / 2.75) {
      return 7.5625 * pos * pos;
    } else if (pos < 2 / 2.75) {
      return 7.5625 * (pos -= 1.5 / 2.75) * pos + 0.75;
    } else if (pos < 2.5 / 2.75) {
      return 7.5625 * (pos -= 2.25 / 2.75) * pos + 0.9375;
    } else {
      return 7.5625 * (pos -= 2.625 / 2.75) * pos + 0.984375;
    }
  },

  bouncePast: function bouncePast(pos) {
    if (pos < 1 / 2.75) {
      return 7.5625 * pos * pos;
    } else if (pos < 2 / 2.75) {
      return 2 - (7.5625 * (pos -= 1.5 / 2.75) * pos + 0.75);
    } else if (pos < 2.5 / 2.75) {
      return 2 - (7.5625 * (pos -= 2.25 / 2.75) * pos + 0.9375);
    } else {
      return 2 - (7.5625 * (pos -= 2.625 / 2.75) * pos + 0.984375);
    }
  },

  easeFromTo: function easeFromTo(pos) {
    if ((pos /= 0.5) < 1) return 0.5 * Math.pow(pos, 4);
    return -0.5 * ((pos -= 2) * Math.pow(pos, 3) - 2);
  },

  easeFrom: function easeFrom(pos) {
    return Math.pow(pos, 4);
  },

  easeTo: function easeTo(pos) {
    return Math.pow(pos, 0.25);
  }
};

/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-09-27 23:31:49 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-10-09 14:28:39
 * 单个小物件自己的计时器
 */
function Watch() {
    this.startTime = 0; //启动时间
    this.running = false; //是否还在运行
    this.goesBytime = 0;
    this.goesBy = undefined;
    this.DEFAULT_ELASTIC = 2;
}

Watch.prototype = {
    start: function start() {
        this.startTime = +new Date();
        this.goesBytime = undefined;
        this.running = true;
    },

    stop: function stop() {
        this.goesBy = +new Date() - this.startTime;
        this.running = false;
    },

    getGoesByTime: function getGoesByTime() {

        if (this.running) {
            var _tem = +new Date() - this.startTime;
            return _tem > 1 && !isNaN(_tem) ? _tem : 0;
        } else {
            return this.goesBy;
        }
    },
    isRunning: function isRunning() {
        return this.running;
    },
    reset: function reset() {
        this.goesBy = 0;
    }
};

var AnimationTimer = function AnimationTimer(duration, timeFunc) {
    if (duration !== undefined) this.duration = duration;
    if (timeFunc !== undefined) this.timeFunc = timeFunc;
    this.watch = new Watch();
};

AnimationTimer.prototype = {
    start: function start() {
        //开始计时
        this.watch.start();
    },
    stop: function stop() {
        this.watch.stop();
    },
    getGoesByTime: function getGoesByTime() {
        //注意这里的时间与 watch 里面的时间不是同一概念 这里面还有扭曲时间 用于产生不同的动画效果的
        var goesBytime = this.watch.getGoesByTime();
        console.log(goesBytime);
        var aniPercent = goesBytime / this.duration; //动画进行的程度


        if (!this.watch.running) return undefined; //没有运行 那就没有
        if (!this.timeFunc) return goesBytime; //如果没有时间函数那就直接返回正常的 时间
        //关键点
        // console.log('扭曲时间',EasingFunctions[this.timeFunc](aniPercent)/aniPercent);
        // console.log('扭曲时间',this.timeFunc);
        return goesBytime * (EasingFunctions[this.timeFunc](aniPercent) / aniPercent); //时间扭曲
    },
    isOver: function isOver() {
        return this.watch.getGoesByTime() > this.duration;
    }

};

/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-09-29 16:34:09 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-10-09 16:23:58
 */

var FRAGOPTION = {
    onStart: function onStart() {
        // 动画碎片开始的函数
    },
    onLooping: function onLooping() {
        //在动画重复执行的时候 需要循环的函数 这里 可能需要一些传参
    },
    onEnd: function onEnd() {
        // 动画结束 的时候 执行
    },
    duration: 1000, // 毫秒
    easing: "linear" // 缓动函数 


};

function genExe(exe) {
    if (!isNaN(Number(exe))) {
        return {
            target: Number(exe)
        };
    }

    if (exe.indexOf('+=') == 0) {
        var tem = exe.split('=')[1];

        return {
            incre: tem
        };
    }

    if (exe.indexOf('-=') == 0) {
        var _tem = exe.split('=')[1];

        return {
            incre: -1 * _tem
        };
    }
}

var AnimationFrag = function AnimationFrag(object, atrribute, exe, option) {
    // 这里是动画碎片 更改 obj的地方 但是 问题就在这里 这应该是 最简单的功能 就是对比目标 
    // 添加 delta
    // 一旦完成 那这个 running就等于 false 而对于时间 的控制 不应该在这里 控制时间 来 控制 动画 
    // 假比 是 linear 传进来的 deatla 时间 就是 均衡的
    // 那这一刻增加的东西就是 均衡的 

    var _temOption = util.extend(option, FRAGOPTION);
    this.object = object;

    this.source = 0;
    if (genExe(exe).target) {
        this.incre = genExe(exe).target - this.source;
    } else {
        this.incre = genExe(exe).incre;
    }
    this.complete = false;
    this.running = false;
    this.started = false;
    this.duration = _temOption.duration;
    this.atrribute = atrribute;
    // console.log(this.object);
    this.timer = new AnimationTimer(_temOption.duration, _temOption.easing);
    this.endCallFrag = null; // 用于动画叠加调用

    this.onEnd = _temOption.onEnd;
    this.onLooping = _temOption.onLooping;
    this.onStart = _temOption.onStart;
};

AnimationFrag.prototype = {
    updateAnimation: function updateAnimation() {
        //获取时间  以及计算出来 的变化时间 来  如果现在的时间 一加到达 
        if (this.complete) {
            if (this.endCallFrag) {
                this.endCallFrag.updateAnimation(); // 朝后调用
            }
            return false;
        }

        if (this.timer.isOver()) {
            this.onEnd();
            this.complete = true;
            this.running = false;
            if (this.endCallFrag) {
                // console.log('朝后调用');
                this.endCallFrag.updateAnimation(); // 朝后调用
            }
            return false;
        }
        if (!this.started && !this.complete) {
            this.source = this.object.Shape[this.atrribute]; // 最初动画开始的属性            
            this.started = true;
            this.running = true;
            this.onStart();
            this.timer.start();
        } else {
            this.onLooping();
            this.updateAtrribute();
        }
    },
    updateAtrribute: function updateAtrribute() {
        // console.log('x', this.source + this.target * this.timer.getGoesByTime() / this.duration);
        // console.log('cx', this.object.Shape[this.atrribute]);
        this.object.Shape[this.atrribute] = this.source + this.incre * this.timer.getGoesByTime() / this.duration;
    }
};

/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-09-22 15:45:51 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-10-09 17:49:31
 * 在这里添加事件 
 */

var Shape = function Shape(type, option, strokeOrfill, draggable, highlight) {
    this.draggable = draggable ? true : false;
    this.highlight = highlight ? true : false;
    this.strokeOrfill = strokeOrfill ? true : false; //是否填充
    this.type = type;
    this.Shape = new shapeTypes[type](option);
    this.AnimationTimer = new AnimationTimer();
    this.animtionFragList = []; // flag List
    this.bus = null;
    this.Shapeid = "sp" + guid();
};

Shape.prototype = {
    updateBus: function updateBus(bus) {
        this.bus = bus;
    },
    paint: function paint(context) {
        if (this.strokeOrfill) {
            this.Shape.fill(context);
        } else {
            this.Shape.stroke(context);
        }
    },
    detect: function detect(x, y) {
        //检查点击了谁
        this.Shape.detected(x, y);
        if (this.Shape.detected(x, y)) {}
    },
    moveDetect: function moveDetect(x, y) {
        // console.log('moveDetect')
        this.Shape.moveDetect(x, y);
    },
    upDetect: function upDetect() {
        this.Shape.upDetect();
    },

    /**
     * 
     * 
     * @param {any} atrribute 哪个属性动画
     * @param {any} exp   表达式
     * @param {any} option  其他设置项目
     */
    animate: function animate(atrribute, exp, option) {
        console.log("添加形状");
        // 在这里添加 动画
        // 所有的动画其实就是目标
        // 一旦 每个动画对象执行 animate其实就是给自己立了一个flag
        /**
         *所以的动画碎片其实就是所有的flag
         这些flag you刚开始的 有结束的 于是 改变的时候就要去记录状态 
         对比 这些状态 是不是以及完成 
         完成了就完事 
         没完成 那就继续 按照时间 完成
         */
        //    if(atrribute=="x"){
        // @TODO 方向
        // @TODO 表达式
        // @TODO 回调

        //    if(exp.indexOf('+=')==0){
        //       let tem = exp.split('=')[1];

        /**
         * 这里的animate 世纪路所有动画 
         * 但是在哪里执行呢 ？
         * 在父集里面 有一个 aniamtion 哪个是 动画控制器 
         * 是一个总的 宗华控制器 
         * 但是 是事实上 总的动画控制器 
         * uodate 还是 每一个单个 shape自己跟新 动画 这样思路上 
         * 才不不会乱 
         * 
         */

        var _temFrag = new AnimationFrag(this, atrribute, exp, option);
        //在添加动画的时候 就行应该 指明这个动画的方向 动画的目标 而不是每次 执行的时候 才去 计算是不是 到达了这个 目标 

        //    console.log('添加形状',this.bus);
        this.bus.dispatch('addAnimation', "no", _temFrag, this.Shapeid);

        //    }


        //    }

        console.log("继续调用", this);
        return this;
    }
};

var shapeTypes = {
    "circle": function circle(option) {
        return new Circle(option);
    },
    'rect': function rect(option) {
        return new Rect(option);
    },
    'polygon': function polygon(option) {
        return new Polygon(option);
    }
};

/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-09-27 16:12:38 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-09-29 10:56:10
 * 帧动画控制器
 */
//todo cancelRequestAnimationFrame 
// cancel setTimeOut
var AnimationFrame = function AnimationFrame() {
    // console.log('requestAnimationFrame',requestAnimationFrame);
    // if(requestAnimationFrame){
    //     this.animationType = "r";
    //     this.AnimationFrame = requestAnimationFrame;
    // }else{
    //     this.animationType = 's';
    //     this.AnimationFrame = fakeAnimationFrame;
    // }

    // this.animationId = null;

    if (requestAnimationFrame) {
        return requestAnimationFrame;
    } else {
        return fakeAnimationFrame;
    }
};

// AnimationFrame.prototype = {
//     getAnimationFrame:function(){
//         return this.AnimationFrame;
//     },
//     cancelAnimationFrame:function(){//取消动画
//         if(thid.animationType=='r'){
//            cancelAnimationFrame(this.animationId);
//         }else{
//             clearTimeout(this.animationId);
//         }
//     }
// }


function fakeAnimationFrame(callback) {
    var start;
    setTimeout(function () {
        start = +new Date();
        callback(start);
        

        //   console.log(finish - start);
    }, 16);
}

/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-09-29 09:58:45 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-10-09 18:01:58
 * 动画 对象 接管所有动画
 */

var animationFrame = AnimationFrame();
var Animation = function Animation(bus) {
    this.running = false;
    this.paused = true; // 我觉得暂停 不应哎全局的这个暂停上 而是每一个对象有一个自己的暂停 用于 当时wait的时候用  但是现在为我写的
    // 这个动画对象不是用与单个运动而是用于 全局动画控制的 一个动画控制器

    this.bus = bus;
    //    console.log(this.bus);
    this.animationFragStore = {}; // 动画碎片仓库 存储 所有 动画 
    //    this.animationFragStore2 = {};
};

Animation.prototype = {
    start: function start() {
        //开始整个动画
        this.running = true;
        this.loopAnimation();
    },
    loopAnimation: function loopAnimation() {
        //循环 整场动画
        var _self = this;
        function stepAnimation() {
            animationFrame(stepAnimation);
            // console.log('---');
            _self.running && _self.updateStep();
        }

        animationFrame(stepAnimation);
    },
    updateStep: function updateStep() {
        //这里是执行小动画的地方 每一个obj都有自己的动画 在obj添加动画的时候 
        // 便在动画循环里面添加 
        // 动画是根据时间 来执行的 
        // this._bus()
        // console.log(this.animationFragStore);
        // this.animationFragStore.forEach(function(ele){
        //     ele.updateAnimation();
        // });

        var _keys = Object.keys(this.animationFragStore);

        _keys.forEach(function (item) {
            var _temFragStore = this.animationFragStore[item];
            _temFragStore.forEach(function (item, index) {
                item.endCallFrag = _temFragStore[index + 1];
                if (index == 0) {
                    item.updateAnimation();
                }
            });
        }, this);

        this.bus.dispatch('update', 'no'); //通知更新 
    }
};

var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();

















































var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-09-29 15:33:40 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-10-09 13:25:54
 * 事件对象
 * 
 */

var eventBus = function eventBus() {
    this.eventList = [];
};
eventBus.prototype = {
    add: function add(name, scope, event) {
        //添加事件 初始化事件
        // console.log('添加'+name);
        if (!this.eventList.length) {
            this.eventList.push({
                name: name,
                scope: scope,
                thingsList: [event]
            });
            return false;
        }

        this.eventList.forEach(function (ele) {
            if (ele.name === name) {
                ele.thingsList.push(event);
            } else {
                this.eventList.push({
                    name: name,
                    scope: scope,
                    thingsList: [event]
                });
            }
        }, this);
    },
    dispatch: function dispatch(name, scope) {
        //执行事件 这里有两种状况  执行最外层或者是事件添加层 的scope 或者是 当地的scope


        var _temArgu = arguments;

        if (arguments.length < 2) {
            return false;
        }

        var _params = Array.prototype.slice.call(_temArgu, 1);

        this.eventList.forEach(function (ele) {
            if (ele.name === name) {
                console.log('触发' + name);
                ele.thingsList.forEach(function (_ele) {
                    if (scope !== "no") {
                        _ele.call.apply(_ele, [scope].concat(toConsumableArray(_params)));
                    } else {
                        _ele.call.apply(_ele, [ele.scope].concat(toConsumableArray(_params)));
                    }

                    //  TODO 添加 解构 

                });
            }
        });
    },
    destroy: function destroy() {
        // 取消事件
    }
};

/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-09-21 13:47:34 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-10-09 18:00:47
 * 主要 引入对象
 * 
 * 
 */

// import { AnimationFrame } from "./animation/animationFrame.js";
/**
 * 
 * 
 * @param {any} canvas canvas对象
 * @param {any} x   由于小程序的无法获取 canvas 大小高宽 必须指定 x y 长宽 才能 去检测点击
 * @param {any} y 
 * @param {any} w 
 * @param {any} h 
 */
function WxDraw(canvas, x, y, w, h) {

    this.canvas = canvas;
    this.wcid = guid();
    this.store = new Store();
    this.bus = new eventBus();
    console.log(this.bus);
    this.animation = new Animation(this.bus);
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    // 初始化 动画仓库 接收点 
    this.bus.add('addAnimation', this, this.addAnimationFrag);
    this.bus.add('update', this, this.update);
    // console.log(this.bus);
    this.animation.start();
    Shape.bus = this.bus;
}

WxDraw.prototype = {
    add: function add(item) {
        item.updateBus(this.bus);
        this.store.add(item);
    },
    draw: function draw() {
        this.store.store.forEach(function (item) {
            item.paint(this.canvas);
        }, this);
    },
    detect: function detect(e) {
        //事件检测
        var loc = this.getLoc(e.touches[0].x, e.touches[0].y);

        this.store.store.forEach(function (item) {
            item.detect(loc.x, loc.y);
        }, this);
        // this.getLoc()
    },
    moveDetect: function moveDetect(e) {
        var loc = this.getLoc(e.touches[0].x, e.touches[0].y);

        this.store.store.forEach(function (item) {
            item.moveDetect(loc.x, loc.y);
            // console.log('item',item)ﬂ
        }, this);

        //  console.log(loc);
        this.draw();
        this.canvas.draw();
    },
    upDetect: function upDetect() {
        this.store.store.forEach(function (item) {
            item.upDetect();
        }, this);
    },
    getLoc: function getLoc(x, y) {
        //获取点击相对位置
        return {
            x: x - this.x > 0 ? x - this.x > this.w ? this.w : x - this.x : this.x,
            y: y - this.y > 0 ? y - this.y > this.h ? this.h : y - this.y : this.y
        };
    },
    update: function update() {
        // 用户手动更新 
        this.draw();
        this.canvas.draw();
    },
    AnimationCenter: function AnimationCenter() {},
    addAnimationFrag: function addAnimationFrag(scope, AnimationOption, Shapeid) {
        console.log(AnimationOption);
        // this.animation.animationFragStore.push(AnimationOption);// 添加 动画碎片 
        // this.animation.animationFragStore2.push(AnimationOption);// 添加 动画碎片 

        if (this.animation.animationFragStore[Shapeid]) {
            // 
            console.log('已经有动画了');
            this.animation.animationFragStore[Shapeid].push(AnimationOption);
        } else {
            console.log('初始化 ');

            this.animation.animationFragStore[Shapeid] = [AnimationOption];
        }

        console.log(this.animation.animationFragStore2);
    }
};

module.exports = {

    WxDraw: WxDraw,
    Shape: Shape,
    AnimationFrame: AnimationFrame()
};
