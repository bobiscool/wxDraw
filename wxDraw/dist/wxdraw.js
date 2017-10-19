'use strict';

/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-09-22 09:34:43 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-10-19 17:16:13
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

    /**
     * 
     * 
     * @param {any} target 被覆盖者
     * @param {any} source 覆盖者
     * @param {any} overlay 是否全部抹掉
     * @returns 
     */
    extend: function extend(target, source) {
        for (var key in target) {
            if (source.hasOwnProperty(key)) //如果是覆盖的话 只要源source 有那就覆盖掉。。。 不是那就沿用现在的这叫extend太绕了
                {
                    source[key] = target[key];
                }
        }
        return source;
    }
};

var matrixToarray = function matrixToarray(a) {
    var _points = []; //将矩阵洗成 点位数组
    a.forEach(function (item) {
        _points.push([item[0][0], item[1][0]]);
    });

    return _points;
};

// 将 16进制 颜色 转成 rgb 用于渐变 https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb

var hex2rgb = function hex2rgb(val) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(val);
    //console.log('hex2rgb',result);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
};

var rgb2hex = function rgb2hex(r, g, b) {
    //console.log(r,g,b);
    //console.log('1666666',((1<<24)+(r<<16)+(g<<8)+b).toString(16));
    return ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).substr(1); // << 是javascript左移运算符 
    /**
     * 1<<24 是为了防止 在r 为0的时候 左移被忽略 所以添加一个1 来保底
     * 然后 r 占在最高位 所以 左移16位（这个 16位其实是 2进制里面左移） 以此类推
     */
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
    delete: function _delete() {},
    getLength: function getLength() {
        return this.store.length;
    },
    find: function find(a, b) {
        var _tem = null;
        if (arguments.length == 1) {
            _tem = this.store[a];
        }

        if (arguments.length == 2) {
            this.store.forEach(function (element) {
                if (element[a] == b) {
                    _tem = element;
                }
            }, this);
        }

        return _tem;
    }

};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
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





var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};



































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
 * @Date: 2017-10-13 15:36:50 
 * @Last Modified by:   Thunderball.Wu 
 * @Last Modified time: 2017-10-13 15:36:50 \
 * 图形变换 还是得用矩阵
 * 所以 强忍着恶心写了一个矩阵计算。。
 * 以下用es6语法的形式书写
 * 
 */

var Matrix = function () {
    /**
     * Creates an instance of Matrix.
     * @param {any} PointsArray 矩阵数组
     * @memberof Matrix
     */
    function Matrix(PointsArray) {
        classCallCheck(this, Matrix);

        this.m = PointsArray.length;
        this.n = PointsArray[0].length; //获取矩阵的 m x n
        this.matrixArray = PointsArray;
    }

    createClass(Matrix, [{
        key: "multi",
        value: function multi(matrix) {
            //矩阵乘法
            var Points = [];
            if (matrix.m == this.n) {

                this.matrixArray.forEach(function (everyM, _index) {
                    //将每一行拎出来
                    // 好久没接触过 矩阵，。。头都写大了。。。
                    // //console.log(everyM);
                    Points.push([]);
                    // //console.log(matrix.n);
                    for (var i = 0; i < matrix.n; i++) {
                        //要乘多少次
                        // 拿到这一列所有 其实这一列所有 就是 
                        var _p = 0;
                        everyM.forEach(function (_everN, index) {
                            // 每一行的每一个 
                            _p += _everN * matrix.matrixArray[index][i]; //最小城乘数因子
                        });

                        // //console.log(_p);
                        Points[_index][i] = _p; //😓
                    }
                }, this);

                return new Matrix(Points);
            } else {
                //console.log('两个矩阵没法计算');// 必须前一个n 等于后一个m才能计算
                return false;
            }
        }
    }, {
        key: "add",
        value: function add(matrix) {
            //加法
            var Points = [];
            if (matrix.m === this.m && matrix.n == this.n) {

                this.matrixArray.forEach(function (everyM, index) {
                    Points.push([]);
                    everyM.forEach(function (_everN, _index) {
                        // 每一行的每一个 
                        Points[index][_index] = _everN + matrix.matrixArray[index][_index]; //最小城乘数因子
                    });
                });

                return new Matrix(Points);
            }
        }
    }, {
        key: "sub",
        value: function sub(matrix) {
            //减法
            var Points = [];
            if (matrix.m === this.m && matrix.n == this.n) {

                this.matrixArray.forEach(function (everyM, index) {
                    Points.push([]);
                    everyM.forEach(function (_everN, _index) {
                        // 每一行的每一个 
                        Points[index].push(_everN - matrix.matrixArray[index][_index]); //最小城乘数因子
                    });
                });

                return new Matrix(Points);
            }
        }
    }]);
    return Matrix;
}();

// var a=new Matrix([
//     [1,2],
//     [1,0],
//     [1,0]
// ]);

// var b = new Matrix([
//     [4,2],
//     [4,2],
//     [4,2],
// ]);


// //console.log(a.add(b).matrixArray)

/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-10-15 23:33:37 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-10-16 19:24:23
 * 关于点的一些方法 特别是 点相对于某点旋转之后 的
 * 
 */

var Point = function () {
    function Point(x, y) {
        classCallCheck(this, Point);

        this.x = x;
        this.y = y;
    }

    createClass(Point, [{
        key: 'translate',
        value: function translate(dx, dy) {
            this.x += dx;
            this.y += dy;
        }
    }, {
        key: 'rotate',
        value: function rotate(origin, angle) {

            if (origin) {
                var tx = -origin[0] + this.x;
                var ty = -origin[1] + this.y;
                var AtranslateMatrix = new Matrix([[origin[0]], [origin[1]]]); //平移


                var rotateMatrix = new Matrix([[Math.cos(angle), -Math.sin(angle)], [Math.sin(angle), Math.cos(angle)]]); //旋转

                var getChangeMatrix = new Matrix([[tx], [ty]]);

                var _temMatrix = rotateMatrix.multi(getChangeMatrix).add(AtranslateMatrix);
                return _temMatrix.matrixArray;
            }
        }
    }, {
        key: 'scale',
        value: function scale() {
            //现在 还不用 
        }
    }]);
    return Point;
}();

/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-09-22 11:32:35 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-10-19 17:13:24
 */

var pOption = {
    x: 10,
    y: 10,
    r: 10,
    sides: 7,
    fillStyle: "#000000", //不要手残乱改
    strokeStyle: "#000000", //不要手残
    rotate: 0,
    rotateOrigin: null

    // function Point(x, y) {
    //     this.x = x;
    //     this.y = y;
    // }


};var Polygon = function Polygon(option) {
    var _temOption = util.extend(option, pOption);
    console.log(_temOption);
    this.Option = _temOption;

    this.max = {
        maxX: null,
        maxY: null,
        minX: null,
        minY: null
    };
    this.oriPoints = null; //拿到最初的点位
    this._Points = []; //用于检测位置的 点位数组 也是当前位置
    this.getOriPoints(); //拿到原始点 
    this.getMax(this.oriPoints); //根据原始点 
    this._isChoosed = false;
    this.rotateOrigin = null;
};

Polygon.prototype = {
    getOriPoints: function getOriPoints() {
        var points = [],
            angle = this.Option.startAngle || 0;

        // //console.log('Option',this.Option);
        //每次getPoints 要刷新max
        // //console.log('init xy', x, y);

        for (var i = 0; i < this.Option.sides; ++i) {
            points.push([this.Option.x + this.Option.r * Math.sin(angle), this.Option.y - this.Option.r * Math.cos(angle)]);
            angle += 2 * Math.PI / this.Option.sides;
        }
        this.oriPoints = points;
    },
    getPoints: function getPoints() {
        //getPoints修改 现在不用 tranlate+rotate形式 
        var _points = [];
        var origin = null;
        if (!this.rotateOrigin) {
            origin = [this.Option.x, this.Option.y];
        } else {
            origin = this.rotateOrigin;
        }

        // //console.log('item', origin);

        this.oriPoints.forEach(function (item) {
            _points.push(this.getPointTodraw(item[0], item[1], origin));
        }, this);

        this._Points = matrixToarray(_points); //除掉矩阵多余的部分
        // //console.log(this._Points);
        // //console.log(this.oriPoints);
        return this._Points; //除掉矩阵多余的部分;
    },
    getMax: function getMax() {
        //绘制 与检测 不能在统一个地方
        var _Points = this._Points;

        this.max = {
            maxX: null,
            maxY: null,
            minX: null,
            minY: null
        };

        _Points.forEach(function (element) {
            if (element[0] > this.max.maxX) {
                this.max.maxX = element[0];
            }
            if (!this.max.minX && this.max.minX !== 0) {
                this.max.minX = element[0];
            }
            if (this.max.minX && element[0] < this.max.minX) {
                this.max.minX = element[0];
            }

            if (element[1] > this.max.maxY) {
                this.max.maxY = element[1];
            }
            if (!this.max.minY && this.max.minY !== 0) {
                this.max.minY = element[1];
            }
            if (this.max.minY && element[1] < this.max.minY) {
                this.max.minY = element[1];
            }
        }, this);
    },
    createPath: function createPath(context) {
        //创建路径
        var points = this._Points;

        context.beginPath();
        context.moveTo(points[0][0], points[0][1]);
        for (var i = 1; i < this.Option.sides; ++i) {
            context.lineTo(points[i][0], points[i][1]);
        }
        context.closePath();
    },
    stroke: function stroke(context) {
        context.save();
        this._draw(context);
        context.setStrokeStyle(this.Option.strokeStyle);
        context.stroke();
        context.restore();
    },
    fill: function fill(context) {
        context.save();
        this._draw(context);
        context.setFillStyle(this.Option.fillStyle);
        context.fill();
        context.restore();
    },
    _draw: function _draw(context) {
        this.getOriPoints(); //拿到所有原始点
        this.getPoints(); //拿到所有真实点
        // //console.log('_POINTS',this._Points);
        this.getMax(); //所有真实点max min
        this.createPath(context); //绘制
        // } else {
        /**
         * 这里需要注意  在设置 旋转中心后  旋转的 位置点将变为rect 左上角
         */
        // //console.log('不按原点旋转');
        // context.translate(this.rotateOrigin[0], this.rotateOrigin[1]);
        // context.rotate(this.Option.rotate);
        // this.createPath(context, this.Option.x - this.rotateOrigin[0], this.Option.y - this.rotateOrigin[1])
        // // }
    },
    getPointTodraw: function getPointTodraw(x, y, origin) {
        //利用矩阵计算点位
        // let tx = -origin[0] + x;
        // let ty = -origin[1] + y;
        // let ox = x;
        // let oy = x;
        var angle = this.Option.rotate;
        // //console.log(origin);
        // //console.log(tx);
        // //console.log(ty);
        // let changeMatrix = new Matrix([
        //     [Math.cos(angle), -Math.sin(angle), (Math.cos(angle)-1)*tx - ty*Math.sin(angle)],
        //     [Math.sin(angle), Math.cos(angle), (Math.cos(angle)-1)*ty + tx*Math.sin(angle)],
        //     [0, 0, 1]
        // ]);
        //公式 源于 https://math.stackexchange.com/questions/2093314/rotation-matrix-and-of-rotation-around-a-point
        // let AtranslateMatrix = new Matrix([
        //     [1, 0, origin[0]],
        //     [0, origin[1], 0],
        //     [0, 0, 1]
        // ]);//平移

        // let BtranslateMatrix = new Matrix([
        //     [1, 0, -origin[0]],
        //     [0, -origin[1], 0],
        //     [0, 0, 1]
        // ]);//平移

        // let rotateMatrix = new Matrix([
        //     [Math.cos(angle), Math.sin(angle), 0],
        //     [-Math.sin(angle), Math.cos(angle), 0],
        //     [0, 0, 1]
        // ]);//旋转


        // let getChangeMatrix = new Matrix([
        //     [x], [y], [1]
        // ]);


        //    let AtranslateMatrix = new Matrix([
        //     [origin[0]],
        //     [origin[1]]
        // ]);//平移


        // let rotateMatrix = new Matrix([
        //     [Math.cos(angle), Math.sin(angle)],
        //     [-Math.sin(angle), Math.cos(angle)]
        // ]);//旋转


        // let getChangeMatrix = new Matrix([
        //     [tx], [ty]
        // ]);

        // // //console.log('平移旋转计算', AtranslateMatrix.multi(getChangeMatrix));

        // // //console.log(x,y);
        // //console.log('A',rotateMatrix.multi(getChangeMatrix).add(AtranslateMatrix))
        // let _temMatrix = rotateMatrix.multi(getChangeMatrix).add(AtranslateMatrix);
        // let _temMatrix = AtranslateMatrix.multi(rotateMatrix).multi(BtranslateMatrix).multi(getChangeMatrix);
        // let _roMatrix = rotateMatrix.multi(getChangeMatrix);
        // //console.log('平移旋转计算', _temMatrix);
        // //console.log('旋转计算2', getChangeMatrix);
        // //console.log('旋转计算3', changeMatrix);


        //将所有变化 都转到 Point对象去了 
        return new Point(x, y).rotate(origin, angle); //计算出每一个点变化之后的位置
    },
    move: function move(x, y) {

        this.Option.x = x;
        this.Option.y = y;
        // //console.log('-------move--------', this.Option);
    },
    detected: function detected(x, y) {
        // pnpoly 算法区域

        // 首先找到 最大x 最小x 最大y 最小y
        // //console.log('多边形点击',x,y,this.max)
        if (x > this.max.minX && x < this.max.maxX && y > this.max.minY && y < this.max.maxY) {
            //在最小矩形里面才开始
            // //console.log('点中');
            // this.points = this._Points;

            this._offsetX = this.Option.x - x;
            this._offsetY = this.Option.y - y;
            if (this._pnpolyTest(x, y)) {
                this._isChoosed = true;
                return true;
            }
        }

        return false;
    },
    moveDetect: function moveDetect(x, y) {

        if (this._isChoosed == true) {
            this.move(x + this._offsetX, y + this._offsetY);
            this.getOriPoints(); //拿到原始点
            this.getPoints(); //拿到变化点
            this.getMax(); //拿到边界点
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

        for (var i = 0, j = this._Points.length - 1; i < this._Points.length; j = i++) {
            /**
             * 0 4
               1 0
               2 1
               3 2
               4 3
             */
            var Xi = this._Points[i][0],
                Yi = this._Points[i][1];
            var Xj = this._Points[j][0],
                Yj = this._Points[j][1];

            var insect = Yi > y != Yj > y && x < (Xj - Xi) * (y - Yi) / (Yj - Yi) + Xi;

            if (insect) ifInside = !ifInside;
        }

        // //console.log(ifInside);
        return ifInside;
    },

    updateOption: function updateOption(option) {
        // //console.log(option);
        this.Option = util.extend(this.Option, option);
        // //console.log(this.Option);
        this.bus.dispatch('update', 'no');
    },
    setRotateOrigin: function setRotateOrigin(loc) {
        this.rotateOrigin = loc;
    }

};

/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-10-17 18:01:37 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-10-18 14:41:32
 * 线条 
 */

var lOption = {
    strokeStyle: "#000000",
    points: [[1, 2], [23, 45], [2, 45], [230, 205]],
    rotate: 0
};

var Line = function () {
    function Line(option) {
        classCallCheck(this, Line);

        var _temOption = util.extend(lOption, option);
        this.Option = _temOption;
        this.max = {
            maxX: null,
            maxY: null,
            minX: null,
            minY: null
        };
        this.massCenter = this.genMassCenter(this.Option.points); // 拿到点位 先计算线段重心
        this.posPoints = this.genPointsPositiveLoc();

        this.oriPoints = this.Option.points;
        this._Points = this.Option.points;
        this.detectPoints = this.getDetectPoints();
        this.getMax();
        this._isChoosed = false;

        this.rotateOrigin = null;
    }
    /**
     * 线的质心
     * 线的平移 
     * 线的旋转
     * 线的绘制
     */

    createClass(Line, [{
        key: 'genMassCenter',
        value: function genMassCenter(points) {
            //计算质心 
            var _allX = 0;
            var _allY = 0;
            points.forEach(function (item) {
                _allX += item[0];
                _allY += item[1];
            });

            return {
                x: _allX / points.length,
                y: _allY / points.length
            };
        }
    }, {
        key: 'getOriPoints',
        value: function getOriPoints() {
            var _points = [];

            this.posPoints.forEach(function (item) {
                _points.push([this.massCenter.x - item[0], this.massCenter.y - item[1]]);
            }, this); //计算点位
            this.oriPoints = _points;
        }
    }, {
        key: 'genPointsPositiveLoc',
        value: function genPointsPositiveLoc() {
            // 计算出所有 点与中心的相对位置 只用一次。。。 之后不再用 所以 cshaoe
            // 不能放大 缩小
            var _allPos = [];
            this.Option.points.forEach(function (item) {
                _allPos.push([this.massCenter.x - item[0], this.massCenter.y - item[1]]);
            }, this);
            return _allPos;
        }
    }, {
        key: 'getDetectPoints',
        value: function getDetectPoints() {
            var prePoints = [],
                behPoints = []; //头尾点
            this._Points.forEach(function (item, index) {
                //除了头尾 其余的都要产生 两个对应点
                if (index == 0 || index == this._Points.length - 1) {
                    prePoints.push(item);
                } else {
                    prePoints.push(item);
                    behPoints.shift([item[0], item[1] - 5]); //行成一个圈用于区域检测
                }
            }, this);

            return prePoints.concat(behPoints); //合在一起就是 一个圈了 
        }
    }, {
        key: 'genPoints',
        value: function genPoints() {
            var _points = [];
            var origin = null;
            if (!this.rotateOrigin) {
                origin = [this.massCenter.x, this.massCenter.y];
            } else {
                origin = this.rotateOrigin;
            }

            // //console.log('item', origin);

            this.oriPoints.forEach(function (item) {
                _points.push(this.getPointTodraw(item[0], item[1], origin));
            }, this);

            // //console.log('points',_points);
            this._Points = matrixToarray(_points); //除掉矩阵多余的部分
            // //console.log(this._Points);
            // //console.log(this.oriPoints);
            return this._Points; //除掉矩阵多余的部分;
        }
    }, {
        key: 'getPointTodraw',
        value: function getPointTodraw(x, y, origin) {
            var angle = this.Option.rotate;
            return new Point(x, y).rotate(origin, angle); //计算出每一个点变化之后的位置
        }
    }, {
        key: 'getMax',
        value: function getMax() {
            //绘制 与检测 不能在统一个地方
            var _Points = this._Points;

            this.max = {
                maxX: null,
                maxY: null,
                minX: null,
                minY: null
            };

            _Points.forEach(function (element) {
                // //console.log('el',element[1]);
                if (element[0] > this.max.maxX) {
                    this.max.maxX = element[0];
                }
                if (!this.max.minX && this.max.minX !== 0) {
                    this.max.minX = element[0];
                }
                if (this.max.minX && element[0] < this.max.minX) {
                    this.max.minX = element[0];
                }

                if (element[1] > this.max.maxY) {
                    this.max.maxY = element[1];
                }
                if (!this.max.minY && this.max.minY !== 0) {
                    this.max.minY = element[1];
                }
                if (this.max.minY && element[1] < this.max.minY) {
                    this.max.minY = element[1];
                }
            }, this);
        }
    }, {
        key: 'createPath',
        value: function createPath(context) {
            //创建路径
            var points = this._Points;
            if (points.length <= 0) {
                return false;
            }
            context.beginPath();
            // //console.log(points.length);
            context.moveTo(points[0][0], points[0][1]);
            for (var i = 1; i < points.length; i++) {
                context.lineTo(points[i][0], points[i][1]);
            }
        }
    }, {
        key: 'stroke',
        value: function stroke(context) {
            //线条就只有stroke了
            context.save();
            this._draw(context);
            context.setStrokeStyle(this.Option.strokeStyle);
            context.stroke();
            context.restore();
        }
    }, {
        key: 'fill',
        value: function fill(context) {
            this.stroke(context); //这里先这样写吧
        }
    }, {
        key: '_draw',
        value: function _draw(context) {
            // //console.log(this.massCenter);
            //    //console.log(this.oriPoints);
            this.getOriPoints();
            this.genPoints(); //拿到所有真实点
            // //console.log('_POINTS',this._Points);
            this.detectPoints = this.getDetectPoints();
            this.getMax(); //所有真实点max min
            this.createPath(context); //绘制
        }
    }, {
        key: 'move',
        value: function move(x, y) {

            this.massCenter.x = x;
            this.massCenter.y = y;
            // //console.log('---------------', this.Option);
        }
    }, {
        key: 'detected',
        value: function detected(x, y) {
            // pnpoly 算法区域
            if (x > this.max.minX && x < this.max.maxX && y > this.max.minY && y < this.max.maxY) {
                this._offsetX = this.massCenter.x - x;
                this._offsetY = this.massCenter.y - y;
                if (this._pnpolyTest(x, y)) {
                    this._isChoosed = true;
                    return true;
                }
            }

            return false;
        }
    }, {
        key: 'moveDetect',
        value: function moveDetect(x, y) {

            if (this._isChoosed == true) {
                this.move(x + this._offsetX, y + this._offsetY);
                this.getOriPoints();
                // //console.log(this.massCenter);
                // //console.log(this.oriPoints);
                this.genPoints();
                this.detectPoints = this.getDetectPoints();
                this.getMax();
            }
        }
    }, {
        key: 'upDetect',
        value: function upDetect() {
            this._isChoosed = false;
        }
    }, {
        key: '_pnpolyTest',
        value: function _pnpolyTest(x, y) {
            // 核心测试代码 理论源于  https://wrf.ecse.rpi.edu//Research/Short_Notes/pnpoly.html
            // var A = this.points[0];// 拿到前面两个点
            // var B = this.points[1];
            var ifInside = false;
            var Points = this.detectPoints;
            for (var i = 0, j = Points.length - 1; i < Points.length; j = i++) {
                /**
                 * 0 4
                   1 0
                   2 1
                   3 2
                   4 3
                 */
                var Xi = Points[i][0],
                    Yi = Points[i][1];
                var Xj = Points[j][0],
                    Yj = Points[j][1];

                var insect = Yi > y != Yj > y && x < (Xj - Xi) * (y - Yi) / (Yj - Yi) + Xi;

                if (insect) ifInside = !ifInside;
            }

            return ifInside;
        }
    }, {
        key: 'updateOption',
        value: function updateOption(option) {
            this.Option = util.extend(this.Option, option);
            this.bus.dispatch('update', 'no');
        }
    }, {
        key: 'setRotateOrigin',
        value: function setRotateOrigin(loc) {
            this.rotateOrigin = loc;
        }
    }]);
    return Line;
}();

/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-10-19 16:52:13 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-10-19 16:56:25
 * 常用的一些属性
 * 
 */

var commonAttr = {
    lineWidth: 12, //线宽
    Shadow: {
        offsetX: 5,
        offsetY: 5,
        blur: 5,
        color: "#000000"
    }

};

/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-09-22 14:23:52 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-10-19 17:10:55
 * 普通形状
 * 
 */
var cOption = _extends({
    fillStyle: "#000000",
    strokeStyle: "red",
    x: 10,
    y: 10,
    r: 10,
    sA: 0,
    eA: Math.PI * 2,
    counterclockwise: false,
    rotate: 0
}, commonAttr);
var rOption = _extends({
    x: 10,
    y: 10,
    w: 10,
    h: 10,
    fillStyle: "#000000",
    strokeStyle: "#000000",
    rotate: 0
}, commonAttr);

/**
 * 
 * 圆圈
 * @param {any} option  配置项
 * 
 */
var Circle = function Circle(option) {
    // var _temOption1 = util.mix(option,)
    var _temOption = util.extend(option, cOption);
    this.Option = _temOption;

    this._isChoosed = false;
    this._offsetX = 0;
    this._offsetY = 0;
    this.rotateOrigin = null;
};

Circle.prototype = {
    stroke: function stroke(context) {
        context.save();
        context.beginPath();
        this._draw(context);
        context.closePath();
        context.setStrokeStyle(this.Option.strokeStyle);

        context.stroke();

        context.restore();
    },
    fill: function fill(context) {
        context.save();
        context.beginPath();
        this._draw(context);
        context.closePath();
        context.setFillStyle(this.Option.fillStyle);
        context.fill();
        context.restore();
    },
    _draw: function _draw(context) {
        if (!this.rotateOrigin) {
            context.translate(this.Option.x, this.Option.y);
            context.rotate(this.Option.rotate);
            context.arc(0, 0, this.Option.r, this.Option.sA, this.Option.eA, this.Option.counterclockwise);
        } else {
            /**
             * 这里需要注意  在设置 旋转中心后  旋转的 位置点将变为rect 左上角
             */
            context.translate(this.rotateOrigin[0], this.rotateOrigin[1]);
            context.rotate(this.Option.rotate);
            context.arc(this.Option.x - this.rotateOrigin[0], this.Option.y - this.rotateOrigin[1], this.Option.r, this.Option.sA, this.Option.eA, this.Option.counterclockwise);
        }
    },
    move: function move(x, y) {
        // //console.log('move', x, y);
        this.Option.x = x;
        this.Option.y = y;
    },
    detected: function detected(x, y) {
        var _self = this;
        if (Math.pow(_self.Option.x - x, 2) + Math.pow(_self.Option.y - y, 2) <= Math.pow(_self.Option.r, 2)) {
            this._offsetX = _self.Option.x - x;
            this._offsetY = _self.Option.y - y;
            //console.log('x', this._offsetX);
            //console.log('y', this._offsetY);
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
    },
    updateOption: function updateOption(option) {
        this.Option = util.extend(option, this.Option);
        this.bus.dispatch('update', 'no');
    },
    setRotateOrigin: function setRotateOrigin(loc) {
        this.rotateOrigin = loc;
    }

    /**
     * 方块
     */

};var Rect = function Rect(option) {
    var _temOption = util.extend(option, rOption);
    //console.log(_temOption);
    this.Option = _temOption;
    this._isChoosed = false;
    this._offsetX = 0;
    this._offsetY = 0;
    this.bus = null;
    this.rotateOrigin = null;
    this.oriPoints = [];
    this._Points = [];

    this.max = {
        maxX: null,
        maxY: null,
        minX: null,
        minY: null
    };
    this.getOriPoints();
    this.getPoints();
    this.getMax();
};

Rect.prototype = {
    stroke: function stroke(context) {
        context.save();
        context.beginPath();

        this._draw(context);
        context.closePath();
        context.setStrokeStyle(this.Option.strokeStyle);
        context.stroke();

        context.restore();
    },
    fill: function fill(context) {
        context.save();
        context.beginPath();

        this._draw(context);
        context.closePath();
        context.setFillStyle(this.Option.fillStyle);
        context.fill();
        context.restore();
    },
    _draw: function _draw(context) {
        this.getOriPoints();
        this.getPoints(); //拿到所有真实点
        // //console.log('_POINTS',this.Option);
        this.getMax(); //所有真实点max min
        this.createPath(context); //绘制
    },
    getOriPoints: function getOriPoints() {
        var points = [];

        points.push([this.Option.x - this.Option.w / 2, this.Option.y - this.Option.h / 2]);
        points.push([this.Option.x - this.Option.w / 2, this.Option.y + this.Option.h / 2]);
        points.push([this.Option.x + this.Option.w / 2, this.Option.y + this.Option.h / 2]);
        points.push([this.Option.x + this.Option.w / 2, this.Option.y - this.Option.h / 2]);

        this.oriPoints = points;
    },
    getPoints: function getPoints() {
        var _points = [];
        var origin = null;
        if (!this.rotateOrigin) {
            origin = [this.Option.x, this.Option.y];
        } else {
            origin = this.rotateOrigin;
        }

        //console.log('item', origin);

        this.oriPoints.forEach(function (item) {
            _points.push(this.getPointTodraw(item[0], item[1], origin));
        }, this);

        this._Points = matrixToarray(_points); //除掉矩阵多余的部分
        // //console.log(this._Points);
        // //console.log(this.oriPoints);
        return this._Points; //除掉矩阵多余的部分;
    },
    getPointTodraw: function getPointTodraw(x, y, origin) {
        var angle = this.Option.rotate;
        //将所有变化 都转到 Point对象去了 
        return new Point(x, y).rotate(origin, angle); //计算出每一个点变化之后的位置
    },
    getMax: function getMax() {
        //绘制 与检测 不能在统一个地方
        var _Points = this._Points;

        this.max = {
            maxX: null,
            maxY: null,
            minX: null,
            minY: null
        };

        _Points.forEach(function (element) {
            if (element[0] > this.max.maxX) {
                this.max.maxX = element[0];
            }
            if (!this.max.minX && this.max.minX !== 0) {
                this.max.minX = element[0];
            }
            if (this.max.minX && element[0] < this.max.minX) {
                this.max.minX = element[0];
            }

            if (element[1] > this.max.maxY) {
                this.max.maxY = element[1];
            }
            if (!this.max.minY && this.max.minY !== 0) {
                this.max.minY = element[1];
            }
            if (this.max.minY && element[1] < this.max.minY) {
                this.max.minY = element[1];
            }
        }, this);
    },
    createPath: function createPath(context) {
        //创建路径
        //console.log('创建路径');
        var points = this._Points;
        // //console.log(points);
        context.beginPath();
        context.moveTo(points[0][0], points[0][1]);
        for (var i = 1; i < points.length; ++i) {
            context.lineTo(points[i][0], points[i][1]);
        }
        context.closePath();
    },
    _pnpolyTest: function _pnpolyTest(x, y) {
        // 核心测试代码 理论源于  https://wrf.ecse.rpi.edu//Research/Short_Notes/pnpoly.html
        // var A = this.points[0];// 拿到前面两个点
        // var B = this.points[1];
        var ifInside = false;

        for (var i = 0, j = this._Points.length - 1; i < this._Points.length; j = i++) {
            /**
             * 0 4
               1 0
               2 1
               3 2
               4 3
             */
            var Xi = this._Points[i][0],
                Yi = this._Points[i][1];
            var Xj = this._Points[j][0],
                Yj = this._Points[j][1];

            var insect = Yi > y != Yj > y && x < (Xj - Xi) * (y - Yi) / (Yj - Yi) + Xi;

            if (insect) ifInside = !ifInside;
        }

        // //console.log(ifInside);
        return ifInside;
    },

    move: function move(x, y) {
        this.Option.x = x;
        this.Option.y = y;
    },
    detected: function detected(x, y) {
        // //console.log('检测方块', x, y);
        // //console.log('方块', this.Option);
        if (x > this.max.minX && x < this.max.maxX && y > this.max.minY && y < this.max.maxY) {
            //在最小矩形里面才开始
            // //console.log('点中');
            // this.points = this._Points;

            this._offsetX = this.Option.x - x;
            this._offsetY = this.Option.y - y;
            if (this._pnpolyTest(x, y)) {
                this._isChoosed = true;
                return true;
            }
        }
    },
    moveDetect: function moveDetect(x, y) {

        if (this._isChoosed == true) {
            this.move(x + this._offsetX, y + this._offsetY);
            this.getOriPoints(); //拿到原始点
            this.getPoints(); //拿到变化点
            this.getMax(); //拿到边界点
        }
    },
    upDetect: function upDetect() {
        this._isChoosed = false;
    },
    updateOption: function updateOption(option) {

        this.Option = util.extend(option, this.Option);
        this.bus.dispatch('update', 'no');
    },
    setRotateOrigin: function setRotateOrigin(loc) {
        this.rotateOrigin = loc;
    }

    // module.exports = {
    //     Circle: Circle,
    //     Rect: Rect
    // }

};

/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-10-13 13:31:22 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-10-18 14:19:43
 * cshape 用户自定义的图形
 * 拿到形状点位后 
 * 算出中心 
 * 算出相对 距离
 * 然后 点位旋转 如果没有旋中心 那就围着中心点旋转
 * 如果被移动了 那就是中心点移动
 * 然后 计算出相对点ori
 * 然后计算出真实点
 * 
 */

var cOption$1 = {
    // x: 10,
    // y: 10,
    // r: 10,
    // sides: 7,
    fillStyle: "red",
    strokeStyle: "red",
    points: [[145, 30], [0, -211], [300, 400], [113, 50], [30, -31], [3, 40], [123, 90], [20, -1], [30, 60], [131, 40], [90, -12], [0, 400], [13, 6], [70, -17], [30, 42]],
    rotate: 0
};

var Cshape = function Cshape(option) {
    var _temOption = util.extend(option, cOption$1);

    this.Option = _temOption;

    this.max = {
        maxX: null,
        maxY: null,
        minX: null,
        minY: null
    };

    this.massCenter = this.genMassCenter(this.Option.points); // 拿到点位 先计算重心
    this.posPoints = this.genPointsPositiveLoc();
    // //console.log(this.massCenter);
    // //console.log(this.posPoints);

    this.oriPoints = this.Option.points;
    this._Points = this.Option.points; //用于绘制的点 
    // this.getOriPoints();
    this.getMax();
    // //console.log(this.max);
    this._isChoosed = false;

    this.rotateOrigin = null;
};

Cshape.prototype = {
    genPointsPositiveLoc: function genPointsPositiveLoc() {
        // 计算出所有 点与中心的相对位置 只用一次。。。 之后不再用 所以 cshaoe
        // 不能放大 缩小
        var _allPos = [];
        this.Option.points.forEach(function (item) {
            _allPos.push([this.massCenter.x - item[0], this.massCenter.y - item[1]]);
        }, this);
        return _allPos;
    },
    genMassCenter: function genMassCenter(points) {
        //计算质心 
        var _allX = 0;
        var _allY = 0;
        points.forEach(function (item) {
            _allX += item[0];
            _allY += item[1];
        });

        return {
            x: _allX / points.length,
            y: _allY / points.length
        };
    },
    getOriPoints: function getOriPoints(x, y) {
        var _points = [];

        this.posPoints.forEach(function (item) {
            _points.push([this.massCenter.x - item[0], this.massCenter.y - item[1]]);
        }, this); //计算点位
        this.oriPoints = _points;
    },
    genPoints: function genPoints() {
        var _points = [];
        var origin = null;
        if (!this.rotateOrigin) {
            origin = [this.massCenter.x, this.massCenter.y];
        } else {
            origin = this.rotateOrigin;
        }

        // //console.log('item', origin);

        this.oriPoints.forEach(function (item) {
            _points.push(this.getPointTodraw(item[0], item[1], origin));
        }, this);

        // //console.log('points',_points);
        this._Points = matrixToarray(_points); //除掉矩阵多余的部分
        // //console.log(this._Points);
        // //console.log(this.oriPoints);
        return this._Points; //除掉矩阵多余的部分;
    },
    getPointTodraw: function getPointTodraw(x, y, origin) {
        var angle = this.Option.rotate;
        return new Point(x, y).rotate(origin, angle); //计算出每一个点变化之后的位置
    },
    getMax: function getMax() {
        //绘制 与检测 不能在统一个地方
        var _Points = this._Points;

        this.max = {
            maxX: null,
            maxY: null,
            minX: null,
            minY: null
        };

        _Points.forEach(function (element) {
            // //console.log('el',element[1]);
            if (element[0] > this.max.maxX) {
                this.max.maxX = element[0];
            }
            if (!this.max.minX && this.max.minX !== 0) {
                this.max.minX = element[0];
            }
            if (this.max.minX && element[0] < this.max.minX) {
                this.max.minX = element[0];
            }

            if (element[1] > this.max.maxY) {
                this.max.maxY = element[1];
            }
            if (!this.max.minY && this.max.minY !== 0) {
                this.max.minY = element[1];
            }
            if (this.max.minY && element[1] < this.max.minY) {
                this.max.minY = element[1];
            }
        }, this);
    },
    createPath: function createPath(context) {
        //创建路径
        var points = this._Points;
        if (points.length <= 0) {
            return false;
        }
        context.beginPath();
        // //console.log(points.length);
        context.moveTo(points[0][0], points[0][1]);
        for (var i = 1; i < points.length; i++) {
            context.lineTo(points[i][0], points[i][1]);
        }
        context.closePath();
    },
    stroke: function stroke(context) {
        context.save();
        this._draw(context);
        context.setStrokeStyle(this.Option.strokeStyle);
        context.stroke();
        context.restore();
    },
    fill: function fill(context) {
        context.save();
        this._draw(context);
        context.setFillStyle(this.Option.fillStyle);
        context.fill();
        context.restore();
    },
    _draw: function _draw(context) {
        // //console.log(this.massCenter);
        //    //console.log(this.oriPoints);
        this.getOriPoints();
        this.genPoints(); //拿到所有真实点
        // //console.log('_POINTS',this._Points);
        this.getMax(); //所有真实点max min
        this.createPath(context); //绘制
    },
    move: function move(x, y) {

        this.massCenter.x = x;
        this.massCenter.y = y;
        // //console.log('---------------', this.Option);
    },
    detected: function detected(x, y) {
        // pnpoly 算法区域

        // 首先找到 最大x 最小x 最大y 最小y
        // //console.log('多边形点击',x,y,this.max)
        if (x > this.max.minX && x < this.max.maxX && y > this.max.minY && y < this.max.maxY) {
            //在最小矩形里面才开始
            //console.log('点中');
            // this.points = this.genPoints(this.Option.x, this.Option.y);

            this._offsetX = this.massCenter.x - x;
            this._offsetY = this.massCenter.y - y;
            if (this._pnpolyTest(x, y)) {
                this._isChoosed = true;
                return true;
            }
        }

        return false;
    },
    moveDetect: function moveDetect(x, y) {

        if (this._isChoosed == true) {
            this.move(x + this._offsetX, y + this._offsetY);
            this.getOriPoints();
            // //console.log(this.massCenter);
            // //console.log(this.oriPoints);
            this.genPoints();
            this.getMax();
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

        for (var i = 0, j = this._Points.length - 1; i < this._Points.length; j = i++) {
            /**
             * 0 4
               1 0
               2 1
               3 2
               4 3
             */
            var Xi = this._Points[i][0],
                Yi = this._Points[i][1];
            var Xj = this._Points[j][0],
                Yj = this._Points[j][1];

            var insect = Yi > y != Yj > y && x < (Xj - Xi) * (y - Yi) / (Yj - Yi) + Xi;

            if (insect) ifInside = !ifInside;
        }

        return ifInside;
    },
    updateOption: function updateOption(option) {
        this.Option = util.extend(this.Option, option);
        this.bus.dispatch('update', 'no');
    },
    setRotateOrigin: function setRotateOrigin(loc) {
        this.rotateOrigin = loc;
    }

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
 * @Last Modified time: 2017-10-12 17:43:45
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
        // //console.log(goesBytime);
        var aniPercent = goesBytime / this.duration; //动画进行的程度


        if (!this.watch.running) return undefined; //没有运行 那就没有
        if (!this.timeFunc) return goesBytime; //如果没有时间函数那就直接返回正常的 时间
        //关键点
        // //console.log('扭曲时间',EasingFunctions[this.timeFunc](aniPercent)/aniPercent);
        // //console.log('扭曲时间',this.timeFunc);
        return goesBytime * (EasingFunctions[this.timeFunc](aniPercent) / aniPercent); //时间扭曲
    },
    isOver: function isOver() {
        return this.watch.getGoesByTime() > this.duration;
    }

};

/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-10-16 14:46:52 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-10-18 14:36:38
 * 添加一个特殊属性库 用于支持 有一些不在Option
 * 里面的属性
 */

var specialOption = {
    "cshape": {
        "x": "massCenter", //用于平移用的
        "y": "massCenter"
    },
    "line": {
        "x": "massCenter", //用于平移用的
        "y": "massCenter"
    }
};

var specialAtrr = { //一些特殊的属性值的更改
    "fillStyle": {
        get: function get(val) {
            // //console.log('hex2wwwwwwrgb', hex2rgb(val));
            return hex2rgb(val);
        },
        set: function set(source, incre, timer) {
            // //console.log(source, incre, timer);
            var temCo = [source.r + Math.floor(incre.r * timer), source.g + Math.floor(incre.g * timer), source.b + Math.floor(incre.b * timer) //超级恶心颜色渐变
            ];
            var _val = '#' + rgb2hex.apply(undefined, temCo);
            return _val;
        },
        getIncre: function getIncre(source, target, sub) {
            //太恶心了 ！！！
            if (sub) {
                //这里都是差值的形式 没有直接增加的说法 因为是颜色嘛。。。
                var tarCo = hex2rgb(target);

                return {
                    r: tarCo.r - source.r,
                    g: tarCo.g - source.g,
                    b: tarCo.b - source.b
                };
            }
        }
    },
    "strokeStyle": {
        get: function get(val) {
            // //console.log('hex2wwwwwwrgb', hex2rgb(val));
            return hex2rgb(val);
        },
        set: function set(source, incre, timer) {
            // //console.log(source, incre, timer);
            var temCo = [source.r + Math.floor(incre.r * timer), source.g + Math.floor(incre.g * timer), source.b + Math.floor(incre.b * timer) //超级恶心颜色渐变
            ];
            var _val = '#' + rgb2hex.apply(undefined, temCo);
            return _val;
        },
        getIncre: function getIncre(source, target, sub) {
            //太恶心了 ！！！
            if (sub) {
                //这里都是差值的形式 没有直接增加的说法 因为是颜色嘛。。。
                var tarCo = hex2rgb(target);

                return {
                    r: tarCo.r - source.r,
                    g: tarCo.g - source.g,
                    b: tarCo.b - source.b
                };
            }
        }
    }
};

/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-09-29 16:34:09 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-10-17 16:11:37
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

function genExe(exe, atrribute, object) {
    //console.log('exe', exe);
    // //console.log('exe', exe.indexOf('#'));

    if (!isNaN(Number(exe)) || exe.indexOf('#') === 0) {
        //表达式 是个数字
        var temAtrr = void 0;
        if (object.Shape.Option[atrribute] || object.Shape.Option[atrribute] === 0) {
            if (specialAtrr[atrribute]) {
                //特殊属性 比如颜色
                // //console.log('特殊属性 颜色',specialAtrr[atrribute].get(exe));
                // //console.log('特殊属性 颜色',specialAtrr[atrribute].get(object.Shape.Option[atrribute]));
                temAtrr = specialAtrr[atrribute].getIncre(specialAtrr[atrribute].get(object.Shape.Option[atrribute]), exe, true);
            } else {
                temAtrr = parseFloat(exe) - parseFloat(object.Shape.Option[atrribute]);
            }
        } else {
            temAtrr = parseFloat(exe) - parseFloat(object.Shape[specialOption[object.type][atrribute]][atrribute]); //一些特殊的属性
        }
        //console.log('temAtrr', temAtrr);
        return temAtrr;
    }

    if (exe.indexOf('+=') == 0) {
        var tem = exe.split('=')[1];

        return tem;
    }

    if (exe.indexOf('-=') == 0) {
        var _tem = exe.split('=')[1];

        return -1 * _tem;
    }
}

var AnimationFrag = function AnimationFrag(object, atrribute, exe, option, bus) {
    // 这里是动画碎片 更改 obj的地方 但是 问题就在这里 这应该是 最简单的功能 就是对比目标 
    // 添加 delta
    // 一旦完成 那这个 running就等于 false 而对于时间 的控制 不应该在这里 控制时间 来 控制 动画 
    // 假比 是 linear 传进来的 deatla 时间 就是 均衡的
    // 那这一刻增加的东西就是 均衡的 

    // ATRRIBUTE 是对象的时候 那就是几个属性 一起改变


    var _temOption = util.extend(option, FRAGOPTION);
    this.object = object;
    this.source = 0;
    this.genFlag = false;
    /**
    * 若果是对象的形式 
    * 那么 就不能直接 使用exe的形式了 
    * 而是将每一个对象拆开 然后 一个一个的 进行 升级 
    * a {
    *   "a":"+=100",
    *    "b":"-=100"
    * 
    * }
    * 
    * 那就是 
    * 先把a出来
    * 
    */

    this.bus = bus;

    this.complete = false;
    this.running = false;
    this.started = false;
    this.duration = _temOption.duration;
    this.atrribute = atrribute;
    this.atrributeList = []; // 如果atrribute是对象的形式
    if ((typeof atrribute === 'undefined' ? 'undefined' : _typeof(atrribute)) == "object") {
        //console.log('对象动画');
        this.genFlag = true;

        this.genAtrributeList(atrribute);
    } else {
        this.incre = genExe(exe, atrribute, object);
        this.exe = exe; // 这是为了及时更新属性
    }
    // //console.log(this.object);
    this.timer = new AnimationTimer(_temOption.duration, _temOption.easing);
    this.oriOption = _temOption;
    this.endCallFrag = null; // 用于动画叠加调用

    this.onEnd = _temOption.onEnd;
    this.onLooping = _temOption.onLooping;
    this.onStart = _temOption.onStart;

    this._aniWrapbus = null;
};

AnimationFrag.prototype = {
    updateAnimation: function updateAnimation() {
        //获取时间  以及计算出来 的变化时间 来  如果现在的时间 一加到达 
        if (this.complete) {
            // if (this.endCallFrag) {
            //     this.endCallFrag.updateAnimation(); // 朝后调用
            // } else {
            //     this.bus.dispatch('animationComplete', "no", this.object.Shapeid);
            // }
            return false;
        }

        if (this.timer.isOver()) {
            this.onEnd();
            this.complete = true;
            this.running = false;
            // if (this.endCallFrag) {
            //     // //console.log('朝后调用');
            //     this.endCallFrag.updateSourceAndtarget();//更新 起始源  在动画叠加中 有用
            //     // 更新 endcall的 source
            //     this.endCallFrag.updateAnimation(); // 朝后调用
            // }//@todo 有了 wraper 这里的 超后调用就可以 拆掉了

            this._aniWrapbus.dispatch('fragAniOver', 'no', 'me'); // 这里不需要传一个 特定的 东西


            return false;
        }
        if (!this.started && !this.complete) {
            if (!this.genFlag) {
                // 如果是 单点动画
                // this.source = this.object.Shape.Option[this.atrribute];// 最初动画开始的属性
                this.source = this.object.Shape.Option[this.atrribute] || this.object.Shape.Option[this.atrribute] == 0 ? this.object.Shape.Option[this.atrribute] : this.object.Shape[specialOption[this.object.type][this.atrribute]][this.atrribute]; //两种拿取source得方法

                if (specialAtrr[this.atrribute]) {
                    //特殊属性 比如颜色
                    this.source = specialAtrr[this.atrribute].get(this.object.Shape.Option[this.atrribute]);
                }
            }
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
        // //console.log('x', this.source + this.target * this.timer.getGoesByTime() / this.duration);
        // //console.log('cx', this.object.Shape[this.atrribute]);
        if (!this.genFlag) {
            if (this.object.Shape.Option[this.atrribute] || this.object.Shape.Option[this.atrribute] == 0) {
                if (specialAtrr[this.atrribute]) {
                    this.object.Shape.Option[this.atrribute] = specialAtrr[this.atrribute].set(this.source, this.incre, this.timer.getGoesByTime() / this.duration);
                } else {
                    this.object.Shape.Option[this.atrribute] = this.source + this.incre * this.timer.getGoesByTime() / this.duration;
                }
            } else {
                this.object.Shape[specialOption[this.object.type][this.atrribute]][this.atrribute] = this.source + this.incre * this.timer.getGoesByTime() / this.duration;
                //console.log(this.object);
            }
        } else {
            this.atrributeList.forEach(function (item) {
                //  //console.log(item);
                if (this.object.Shape.Option[item.attr] || this.object.Shape.Option[item.attr] == 0) {
                    if (specialAtrr[item.attr]) {
                        // //console.log('颜色');
                        this.object.Shape.Option[item.attr] = specialAtrr[item.attr].set(item.source, item.incre, this.timer.getGoesByTime() / this.duration);
                    } else {
                        this.object.Shape.Option[item.attr] = item.source + item.incre * this.timer.getGoesByTime() / this.duration;
                    }
                } else {
                    // //console.log(item);
                    this.object.Shape[specialOption[this.object.type][item.attr]][item.attr] = item.source + item.incre * this.timer.getGoesByTime() / this.duration;
                }
                // this.object.Shape.Option[item.attr] = item.source + item.incre * this.timer.getGoesByTime() / this.duration;
            }, this);
        }
    },
    genAtrributeList: function genAtrributeList(atrribute) {
        //生成 属性 更改列表
        var _keys = Object.keys(atrribute);
        var _self = this;
        // //console.log(_self);
        _keys.forEach(function (item) {
            var source = this.object.Shape.Option[item] || this.object.Shape.Option[item] == 0 ? this.object.Shape.Option[item] : this.object.Shape[specialOption[this.object.type][item]][item]; //两种拿取source得方法
            // //console.log(specialAtrr[item]);
            if (specialAtrr[item]) {
                //特殊属性 比如颜色
                // //console.log("特殊属性");
                source = specialAtrr[item].get(this.object.Shape.Option[item]);
                // //console.log(source);
            }
            _self.atrributeList.push({ "attr": item, "incre": genExe(atrribute[item], item, _self.object), "source": source }); //两种拿取source得方法
        }, this);
    },
    updateSourceAndtarget: function updateSourceAndtarget() {
        if (!this.genFlag) {
            this.source = this.object.Shape.Option[this.atrribute] || this.object.Shape.Option[this.atrribute] == 0 ? this.object.Shape.Option[this.atrribute] : this.object.Shape[specialOption[this.object.type][this.atrribute]][this.atrribute]; //两种拿取source得方法

            if (specialAtrr[this.atrribute]) {
                //特殊属性 比如颜色
                this.source = specialAtrr[this.atrribute].get(this.object.Shape.Option[this.atrribute]);
            }
            this.incre = genExe(this.exe, this.atrribute, this.object);
        } else {
            // this.atrributeList.forEach(function(item){
            //     item.source = this.object.Shape.Option[item.attr];

            // },this);
            this.genAtrributeList(this.atrribute);
        }
    },
    addWrapBus: function addWrapBus(bus) {
        this._aniWrapbus = bus;
    },
    restart: function restart() {
        this.complete = false;
        this.running = false;
        this.started = false;
        this.timer = new AnimationTimer(this.oriOption.duration, this.oriOption.easing);
    }
};

/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-09-29 15:33:40 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-10-12 17:43:12
 * 事件对象
 * 
 */

var eventBus = function eventBus() {
    this.eventList = [];
};
eventBus.prototype = {
    add: function add(name, scope, event) {
        //添加事件 初始化事件
        //console.log('添加' + name);
        if (this.eventList.length) {
            this.eventList.forEach(function (ele) {
                if (ele.name == name) {
                    ele.thingsList.push(event); //如果已经有了这个事件 那就 存list 并且退出程序
                    return false;
                }
            }, this);
            // 如果没有 那就再造一个
            this.eventList.push({
                name: name,
                scope: scope,
                thingsList: [event]
            });
        } else {
            this.eventList.push({
                name: name,
                scope: scope,
                thingsList: [event]
            });
        }

        //console.log(this.eventList);
    },
    dispatch: function dispatch(name, scope) {
        //执行事件 这里有两种状况  执行最外层或者是事件添加层 的scope 或者是 当地的scope


        var _temArgu = arguments;

        // //console.log(_temArgu);

        if (arguments.length < 2) {
            return false;
        }

        var _params = Array.prototype.slice.call(_temArgu, 2);

        // //console.log('_params',_params);
        this.eventList.forEach(function (ele) {
            if (ele.name === name) {
                // //console.log('触发' + name);
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
 * @Date: 2017-10-12 11:28:31 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-10-16 15:12:34
 * 动画 碎片包裹
 * 用于控制 较复杂 的 动画 情景 
 * 动画的 循环 
 * 动画循环多少次 结束
 * 
 */

var AniFragWrap = function AniFragWrap(bus, id, object) {
    this.runing = false;
    this.stoped = false;
    this.started = false;
    this.fragStore = [];
    this.animationPick = 0; //动画戳
    this.bus = bus;
    this.aniFraBus = new eventBus(); // 这里需要创建一个 私有的bus
    this.aniFraBus.add('fragAniOver', this, this.getAniOver); //获取当前 aniwrapper 里面有几个动画完成了
    this.overAni = []; // 哪几个动画完成了
    this.aniFragListId = id;
    this.loop = false; //用于循环的 
    this.loopTimes = false;
    this.looped = 0;
    this.object = object;
    this.oriOption = util.extend({}, object.Shape.Option); // 记录最初的样式
    this.endCallWraper = null;
    this.firstTime = true;
};

AniFragWrap.prototype = {
    updateFrag: function updateFrag(frag) {
        frag.addWrapBus(this.aniFraBus);
        if (this.fragStore.length) {
            this.fragStore[this.fragStore.length - 1].endCallFrag = frag;
            this.fragStore.push(frag);
        } else {
            this.fragStore.push(frag);
        }
    },
    exeAnimate: function exeAnimate() {
        // 执行 仓库内部 动画 
        // //console.log(this.stoped);
        if (this.firstTime) {
            this.firstTime = false;
            this.oriOption = util.extend({}, this.object.Shape.Option);
        }
        if (this.stoped) {
            if (this.endCallWraper) {
                this.endCallWraper.exeAnimate();
            }
            return false;
        }
        // //console.log('animationPick',this.animationPick);
        if (this.fragStore[this.animationPick]) {
            this.fragStore[this.animationPick].updateAnimation();
        }
    },
    getAniOver: function getAniOver(who) {
        this.overAni.push(who);
        //console.log('连续碎片是否完成?', this.overAni);
        if (this.overAni.length == this.fragStore.length) {
            // 动画执行完毕后 还有几种情况 1 直接结束
            if (this.loop) {
                if (this.loopTimes && this.looped <= this.loopTimes) {
                    this.looped++;
                }
                if (this.loopTimes && this.looped > this.loopTimes) {
                    this.stop();
                    return false;
                }
                // 如果 没有looptime 那就无线循环
                this.restart();
            } else {

                this.stop();
            }

            return false;
        }
        this.animationPick++;
        this.fragStore[this.animationPick].updateSourceAndtarget(); //更新属性
    },
    restart: function restart() {
        // 重新开始就得需要记住 最初物体的属性
        //console.log('restart');
        this.object.updateOption(this.oriOption);
        this.overAni = [];
        this.animationPick = 0;
        this.fragStore.forEach(function (element) {
            element.restart();
        }, this);
        this.started = false;
        this.stoped = false;
        this.firstTime = true;
    },
    stop: function stop() {
        this.stoped = true;
        // //console.log('停止');
        this.bus.dispatch('wraperAniComplete', 'no', this.aniFragListId, this.object.Shapeid);
    },
    resume: function resume() {
        // 先不要有重启
    },
    setLoop: function setLoop(loop, loopTimes) {
        this.loop = loop ? loop : false; //用于循环的 
        this.loopTimes = loopTimes ? loopTimes : false;
        this.looped = 1;
    }
};

/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-09-22 15:45:51 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-10-18 14:26:24
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
    this.animationStart = false;
    this.aniFragListId = "";
    this.aniFragWraper = null;
    //
    this._layerIndex = 0; //用于点击时候的
    this._getChoosed = false; //用于选中
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
        if (this.Shape.detected(x, y)) {
            //console.log('点击')
            this.bus.dispatch('getDetectedLayers', 'no', this._layerIndex);
        } else {
            this.bus.dispatch('getDetectedLayers', 'no', -1); //这是 为了保证 所以层级都检测一遍             
        }
    },
    moveDetect: function moveDetect(x, y) {
        if (this.draggable && this._getChoosed) {
            //console.log('move',this._layerIndex);            
            this.Shape.moveDetect(x, y);
        }
    },
    upDetect: function upDetect() {
        if (this._getChoosed) {
            this.bus.dispatch('clearDetectedLayers', 'no'); //清空选中数组            
            this.Shape.upDetect();
            this._getChoosed = false;
        }
    },

    /**
     * 
     * 
     * @param {any} atrribute 哪个属性动画
     * @param {any} exp   表达式
     * @param {any} option  其他设置项目
     */
    animate: function animate(atrribute, exp, option) {
        if (!this.aniFragListId) {
            this.aniFragListId = "af" + guid();
            this.aniFragWraper = new AniFragWrap(this.bus, this.aniFragListId, this); // 一旦开始连续调用 就创建一个
        }

        //console.log("添加形状")
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

        var _temFrag = null;
        if ((typeof atrribute === 'undefined' ? 'undefined' : _typeof(atrribute)) == "object") {
            _temFrag = new AnimationFrag(this, atrribute, "no", arguments[1], this.bus); //懒得写 就写arguments吧
        } else {
            _temFrag = new AnimationFrag(this, atrribute, arguments[1], arguments[2], this.bus);
        }

        this.aniFragWraper.updateFrag(_temFrag); // 动画容器包裹动画

        //在添加动画的时候 就行应该 指明这个动画的方向 动画的目标 而不是每次 执行的时候 才去 计算是不是 到达了这个 目标 

        //    //console.log('添加形状',this.bus);

        //    }


        //    }

        //console.log("继续调用", this)


        return this;
    },
    // 动画循环
    start: function start(a) {
        this.animationStart = true;
        if (this.aniFragWraper) {
            if (a === true) {
                this.aniFragWraper.setLoop(a); //设置循环                
            }

            if (typeof a === 'number') {
                this.aniFragWraper.setLoop(true, a);
            }
            this.bus.dispatch('addAnimation', "no", this.aniFragWraper, this.Shapeid);
            this.aniFragListId = ""; // 每一段动画的id
            this.aniFragWraper = null; // 每一段动画的id
        } else {
                //console.log('未添加动画对象');
            }
    }, //开始动画
    updateOption: function updateOption(option) {
        if (!this.Shape.bus) {
            this.Shape.bus = this.bus;
        }

        this.Shape.updateOption(option);

        return this;
    },
    setOrigin: function setOrigin(loc) {
        this.Shape.setRotateOrigin(loc);
        return this;
    },
    updateLayer: function updateLayer(layer) {
        //console.log('更新层级', layer);
        this._layerIndex = layer;
    },
    getChoosed: function getChoosed() {
        //console.log('选中',this._layerIndex);
        this._getChoosed = true;
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
    },
    'cshape': function cshape(option) {
        return new Cshape(option);
    },
    'line': function line(option) {
        return new Line(option);
    }
};

/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-09-27 16:12:38 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-10-19 14:04:17
 * 帧动画控制器
 */
//todo cancelRequestAnimationFrame 
// cancel setTimeOut
var AnimationFrame = function AnimationFrame() {
    // //console.log('requestAnimationFrame',requestAnimationFrame);
    // if(requestAnimationFrame){
    //     this.animationType = "r";
    //     this.AnimationFrame = requestAnimationFrame;
    // }else{
    //     this.animationType = 's';
    //     this.AnimationFrame = fakeAnimationFrame;
    // }

    // this.animationId = null;

    if (typeof requestAnimationFrame !== 'undefined') {
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
        

        //   //console.log(finish - start);
    }, 16);
}

/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-09-29 09:58:45 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-10-17 16:13:09
 * 动画 对象 接管所有动画
 */

var animationFrame = AnimationFrame();
var Animation = function Animation(bus) {
    this.running = false;
    this.paused = true; // 我觉得暂停 不应哎全局的这个暂停上 而是每一个对象有一个自己的暂停 用于 当时wait的时候用  但是现在为我写的
    // 这个动画对象不是用与单个运动而是用于 全局动画控制的 一个动画控制器

    this.bus = bus;
    //    //console.log(this.bus);
    this.animationFragStore = {}; // 动画碎片仓库 存储 所有 动画 
    this.animationCompleteList = []; // 动画完成清单
    this.wraperAniCompleteOb = {}; //每一个包裹的 动画是否完成
    this.bus.add('animationComplete', this, this.animationComplete); // 添加动画事件 
    this.bus.add('wraperAniComplete', this, this.wraperAniComplete); // 添加动画事件 


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
            // //console.log('---');
            _self.running && _self.updateStep();
        }

        animationFrame(stepAnimation);
    },
    updateStep: function updateStep() {
        //这里是执行小动画的地方 每一个obj都有自己的动画 在obj添加动画的时候 
        // 便在动画循环里面添加 
        // 动画是根据时间 来执行的 
        // this._bus()
        // //console.log(this.animationFragStore);
        // this.animationFragStore.forEach(function(ele){
        //     ele.updateAnimation();
        // });

        var _keys = Object.keys(this.animationFragStore);

        _keys.forEach(function (item) {
            var _temFragStore = this.animationFragStore[item];
            _temFragStore[0].exeAnimate(); // 先简单  这样顺序执行 
        }, this);

        this.bus.dispatch('update', 'no'); //通知绘制更新 
    },
    animationComplete: function animationComplete(who) {
        // //console.log('who',who,this.animationCompleteList);
        this.animationCompleteList.push(who);
        if (Object.keys(this.wraperAniCompleteOb).length === Object.keys(this.animationFragStore).length) {
            this.running = false; // 动画执行 结束
            // //console.log('结束动画')
        }
    },
    wraperAniComplete: function wraperAniComplete(afID, shaId) {
        // //console.log(afID, shaId);
        if (this.wraperAniCompleteOb[shaId]) {
            this.wraperAniCompleteOb[shaId].push(afID);
        } else {
            this.wraperAniCompleteOb[shaId] = [afID]; // 用于检测吗每一个shape的动画是否完成
        }

        // //console.log('shaId', this.wraperAniCompleteOb[shaId].length, this.animationFragStore[shaId].length,this.wraperAniCompleteOb[shaId].length == this.animationFragStore[shaId].length);

        if (this.wraperAniCompleteOb[shaId].length == this.animationFragStore[shaId].length) {
            this.bus.dispatch('animationComplete', 'no', shaId); // 某一个物件的动画完成
        }
        // //console.log('wraperAniComplete', this.wraperAniCompleteOb);
    }
};

/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-09-21 13:47:34 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-10-19 15:22:45
 * 主要 引入对象
 * 
 * 写给开发者的:
 * 特别注意 
 *  由于微信小程序不稳定  注释太多,console太多会导致小程序无法加载此文件 
 *  如果是准备真机运行 建议使用 wxdraw的压缩版本
 *  还有在有些实机( 比如我的一加3 )小程序里面 使用console.log 一个构造函数 会显示null
 *  实际上是拿到了的，具体原因，还要找微信官方开发者解释
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
    this.animation = new Animation(this.bus);
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    // 初始化 动画仓库 接收点 
    this.bus.add('addAnimation', this, this.addAnimationFrag);
    this.bus.add('update', this, this.update);
    this.bus.add('getDetectedLayers', this, this.getDetectedLayers);
    this.bus.add('clearDetectedLayers', this, this.clearDetectedLayers);
    // //console.log(this.bus);
    this.animation.start();
    Shape.bus = this.bus;
    this.detectedLayers = [];
}

WxDraw.prototype = {
    add: function add(item) {
        item.updateBus(this.bus);
        item.updateLayer(this.store.getLength());
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
            // //console.log('item',item)ﬂ
        }, this);

        //  //console.log(loc);
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
    /**
     * 更新动画 
     * 每次创建的都是动画碎片
     * - 创建完整的动画包裹容器
     * - 创建动画碎片
     * 先是 创建容器 
     * 然后创建碎片
     * 只在start的时候 将其推送到动画空间里面 
     * 
     * @param {any} AnimationWraper  创建好的动画容器
     * @param {any} Shapeid  id
     */
    addAnimationFrag: function addAnimationFrag(AnimationWraper, Shapeid) {
        // //console.log(AnimationOption);
        // this.animation.animationFragStore.push(AnimationOption);// 添加 动画碎片 
        // this.animation.animationFragStore2.push(AnimationOption);// 添加 动画碎片 

        if (this.animation.animationFragStore[Shapeid]) {
            // 
            // //console.log('已经有动画了');
            this.animation.animationFragStore[Shapeid][this.animation.animationFragStore[Shapeid].length - 1].endCallWraper = AnimationWraper;
            this.animation.animationFragStore[Shapeid].push(AnimationWraper);
        } else {
            // //console.log('初始化 ');

            this.animation.animationFragStore[Shapeid] = [AnimationWraper];
        }

        // //console.log(this.animation.animationFragStore2);
    },
    getDetectedLayers: function getDetectedLayers(layers) {
        this.detectedLayers.push(layers); // 这个地方不能推一次 就 判断一次 应该全部推完了 之后再来判断 
        if (this.detectedLayers.length == this.store.getLength() && Math.max.apply(null, this.detectedLayers) != -1) {
            this.store.find(Math.max.apply(null, this.detectedLayers)).getChoosed();
        }

        if (this.detectedLayers.length == this.store.getLength() && Math.max.apply(null, this.detectedLayers) == -1) {
            this.clearDetectedLayers();
        }
        //   //console.log(this.detectedLayers);
    },
    clearDetectedLayers: function clearDetectedLayers() {
        //console.log('清空选中层级');
        this.detectedLayers = []; //清空选中层级
    }

};

var wxDraw = {
    WxDraw: WxDraw,
    Shape: Shape,
    AnimationFrame: AnimationFrame()
};

module.exports = wxDraw;
