/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-09-22 09:29:58 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2018-07-13 23:17:31
 * 图形的基本性质 用于绑定 事件 以及拖拽 高亮用的
 */
import { util, matrixToarray, objToArray } from '../util/utils.js';
import { Matrix } from '../util/matrix.js';
import { Point } from "./mixins/points.js"; //准备把rect 改成 点形式
import { commonAttr, commonUnAttr } from "./mixins/commonAttr.js"; //共有属性
import { commonMethods } from "./mixins/commonMethods.js"; //共有方法

export class shapeBase {

    constructor(options, cOption, cUoption) {

        var _temOption = util.extend(options, cOption);
        var _temUnOption = util.extend(options, cUoption);
        this.Option = _temOption;
        // console.log(_temUnOption);
        this.UnOption = _temUnOption; //不参与动画的属性
        this._isChoosed = false;
        this._offsetX = 0;
        this._offsetY = 0;
        this.fullCircle = true;
        // this.rotateOrigin = null;
        // 用于渐变的
        this._colorLock = false; //颜色锁 设置渐变之后 颜色就就不能动画了
        this._canRotateOrigin = true; // 限制 rotateOrigin 

        this.max = {
            maxX: null,
            maxY: null,
            minX: null,
            minY: null,
        };
        this.oriPoints = null //拿到最初的点位
        this._Points = []; //用于检测位置的 点位数组 也是当前位置

        this._isChoosed = false;
        this.rotateOrigin = null;
        this._drawLine = false; //用于标识是否画外框
        this.detectOriPoints = [];
        this._detectPoints = [];
        this.getMax(); //根据原始点 
        this._dirty = true;
        this._type = 'circle';
    }
    

    updateOption(option) {
        //这个更新属性 是不是有点问题 好像和set属性重复了
        if (option.fillStyle && option.gra && option.gra.length) {
          this.UnOption.needGra == "no";
          this.turnColorLock(false);
        }
        this.Option = util.extend(option, this.Option);
        this.UnOption = util.extend(option, this.UnOption);
        // console.log('更新属性',this.Option);
        // console.log('更新 option',option);
        // console.log("更新属性", this.bus);
        this._dirty = true;
        this.bus.dispatch("update", "no");
      }
      restoreOption(oldOption) {
        // console.log(oldOption);
        this.Option = util.extend(oldOption, this.Option);
        this.UnOption = util.extend(oldOption, this.UnOption);
        // console.log('更新属性',this.Option);
        // console.log('更新 option',option);
        // console.log('更新  this.UnOption',this.UnOption);
        // console.log('更新属性',this);
        this._dirty = true;
      }
      upDetect() {
        this._isChoosed = false;
      }
      /**
       *
       *
       * @param {any} lineCap 线端点
       * @param {any} lineJoin 线连接
       * @param {any} lineDash 虚线
       */
      // setLine (lineCap, lineJoin, lineDash) { //设置线
      //     this.UnOption.lineCap = lineCap;
      //     this.UnOption.lineJoin = lineJoin;
      //     this.UnOption.lineDash = lineDash;
      // },
      setRotateOrigin(loc) {
        //设置旋转中心
        if (this._canRotateOrigin) {
          this.rotateOrigin = loc;
        } else {
          this.rotateOrigin = null;
        }
      }
      setCommonstyle(context) {
        // console.log(context);
        // return false;
        let gra = null;
        let type = this._type;
        if (this.UnOption.lineCap) {
          context.setLineCap(this.UnOption.lineCap);
          context.setLineJoin(this.UnOption.lineJoin);
        }
        // context.setLineDash(this.UnOption.lineDash);
        if (this.UnOption.gra && !(this.UnOption.gra instanceof Array)) {
          this.UnOption.gra = objToArray(this.UnOption.gra);
        }
        if (
          this.UnOption.needGra &&
          this.UnOption.needGra == "line" &&
          this.UnOption.gra &&
          this.UnOption.gra.length > 0
        ) {
          /**
           * lg
           * cg
           * stop
           * [0,"#dddcdd" ]
           * [0.2,"#ddcddd"]
           * [0.5,"#dcdddd"]
           * [0.6,"#cddddd"]
           */
          this.turnColorLock(true); //开启颜色锁
          gra = context.createLinearGradient(...this.getGradientOption(type).lg);
          // gra = context.createLinearGradient(100, 0, 200, 0);
          this.UnOption.gra.forEach(function(element) {
            gra.addColorStop(element[0], element[1]);
          }, this);
          // console.log('继续渐变',gra);
          context.setFillStyle(gra);
        }
        if (
          this.UnOption.needGra &&
          this.UnOption.needGra == "circle" &&
          this.UnOption.gra &&
          this.UnOption.gra.length > 0
        ) {
          this.turnColorLock(true); //开启颜色锁
          gra = context.createCircularGradient(...this.getGradientOption(type).cg);
          this.UnOption.gra.forEach(function(element) {
            // console.log(element);
            gra.addColorStop(element[0], element[1]);
          }, this);
          // console.log(gra);
          context.setFillStyle(gra);
        }
    
        if (!this._colorLock || (this.needGra && his.UnOption.needGra == "no")) {
          // console.log("没有渐变");
          context.setFillStyle(this.Option.fillStyle);
        }
        if (this.UnOption.lineJoin == "miter") {
          context.setMiterLimit(this.Option.miterLimit);
        }
        context.setStrokeStyle(this.Option.strokeStyle);
        context.setLineWidth(this.Option.lineWidth);
        context.setGlobalAlpha(this.Option.opacity);
        if (this.UnOption.needShadow && this.Option.shadow) {
          // console.log(objToArray(this.Option.Shadow));
          context.setShadow(
            this.Option.shadow.offsetX,
            this.Option.shadow.offsetY,
            this.Option.shadow.blur,
            this.Option.shadow.color
          );
        }
        if (this.UnOption.isLineDash) {
          // console.log(this.Option.lineDash instanceof Array);
          if (context.setLineDash) {
            // console.log('设置dash')
            if (!(this.Option.lineDash instanceof Array)) {
              this.Option.lineDash[0] = objToArray(this.Option.lineDash[0]); //clone留下来的
            }
            context.setLineDash(this.Option.lineDash[0], this.Option.lineDash[1]); //设置linedash
          }
        }
      }
      stroke(context) {
        if (this._type == "text") {
          this.fill(context);
          return false;
        }
    
        if (this._type == "image") {
          this._draw(context);
          return false;
        }
    
        context.save();
        this._drawLine = true; //用于标识是否画外框
        this._draw(context);
        this.setCommonstyle(context);
        context.stroke();
        context.restore();
      }
      fill(context) {
        if (this._type == "line") {
          this.stroke(context); //这里先这样写吧
          return false;
        }
        if (this._type == "text") {
          context.save();
          context.setGlobalAlpha(this.Option.opacity);
          context.beginPath();
          context.setFontSize(this.Option.fontSize);
          context.setTextAlign(this.UnOption.align);
          context.setTextBaseline(this.UnOption.textBaseline);
          context.setFillStyle(this.Option.fillStyle);
          if (this.UnOption.needShadow && this.Option.shadow) {
            // console.log(objToArray(this.Option.Shadow));
            context.setShadow(
              this.Option.shadow.offsetX,
              this.Option.shadow.offsetY,
              this.Option.shadow.blur,
              this.Option.shadow.color
            );
          }
          this._draw(context);
          context.closePath();
          context.restore();
          return false;
        }
    
        if (this._type == "image") {
          this._draw(context);
          return false;
        }
        context.save();
        this._drawLine = false; //用于标识是否画外框
        this._draw(context);
        this.setCommonstyle(context);
        context.fill();
        context.restore();
      }
      mixDraw(context) {
        if (this._type == "line") {
          this.stroke(context); //这里先这样写吧
          return false;
        }
    
        if (this._type == "text") {
          this.fill(context);
          return false;
        }
    
        if (this._type == "image") {
          this._draw(context);
          return false;
        }
    
        context.save();
        this._drawLine = true; //用于标识是否画外框
        this._draw(context);
        this.setCommonstyle(context);
        context.fill();
        context.stroke();
        context.restore();
      }
      turnColorLock(onOff) {
        if (onOff) {
          this._colorLock = true;
        } else {
          this._colorLock = false;
        }
      }
      getGradientOption(type) {
        return {
          circle:
            type == "circle"
              ? {
                  lg: [
                    this.Option.x - this.Option.r,
                    0,
                    this.Option.x + this.Option.r,
                    0
                  ],
                  cg: [this.Option.x, this.Option.y, this.Option.r]
                }
              : {},
          rect:
            type == "rect"
              ? {
                  lg: [
                    //这里还得改
                    this.Option.x - this.Option.w / 2,
                    this.Option.y - this.Option.h / 2,
                    this.Option.x + this.Option.w / 2,
                    this.Option.y - this.Option.h / 2
                  ],
                  cg: [
                    this.Option.x,
                    this.Option.y,
                    Math.sqrt(
                      Math.pow(this.Option.w / 2, 2) +
                        Math.pow(this.Option.h / 2, 2)
                    )
                  ]
                }
              : {},
          polygon:
            type == "polygon"
              ? {
                  lg: [this.max.minX, this.max.minY, this.max.maxX, this.max.minY],
                  cg: [this.Option.x, this.Option.y, this.Option.r]
                }
              : {},
          cshape:
            type == "cshape"
              ? {
                  lg: [this.max.minX, this.max.minY, this.max.maxX, this.max.minY],
                  cg: [
                    this.massCenter.x,
                    this.massCenter.y,
                    Math.sqrt(
                      Math.pow((this.max.maxX - this.max.minX) / 2, 2) +
                        Math.pow((this.max.maxY - this.max.minY) / 2, 2)
                    )
                  ]
                }
              : {},
          ellipse:
            type == "ellipse"
              ? {
                  lg: [this.max.minX, this.max.minY, this.max.maxX, this.max.minY],
                  cg: [
                    this.Option.x,
                    this.Option.y,
                    Math.sqrt(
                      Math.pow((this.max.maxX - this.max.minX) / 2, 2) +
                        Math.pow((this.max.maxY - this.max.minY) / 2, 2)
                    )
                  ]
                }
              : {}
          //加这个 是为了 没必要的计算
        }[type];
      }
      _drawHelperPoints(context) {
        // 绘制辅助点
        context.save();
        context.setFillStyle("#F34739");
        context.beginPath();
        if (this._detectPoints) {
          this._detectPoints.forEach(function(item) {
            context.arc(item[0], item[1], 5, Math.PI * 2, 0, Math.PI * 2, false);
          });
        } else {
          this._Points.forEach(function(item) {
            context.arc(item[0], item[1], 5, Math.PI * 2, 0, Math.PI * 2, false);
          });
        }
        context.closePath();
        context.fill();
        context.restore();
      }
      closeRotateOrigin() {
        this._canRotateOrigin = false; // 限制 rotateOrigin
      }
      _pnpolyTest(x, y) {
        // 核心测试代码 理论源于  https://wrf.ecse.rpi.edu//Research/Short_Notes/pnpoly.html
        // var A = this.points[0];// 拿到前面两个点
        // var B = this.points[1];
        var ifInside = false;

        var Points = null;
        if (this._drawLine) {
            Points = this._detectPoints;
            // console.log("监测点");
        } else {
            Points = this._Points;
        }

        for (var i = 0, j = Points.length - 1; i < Points.length; j = i++) {
            /**
             * 0 4
               1 0
               2 1
               3 2
               4 3
             */
            var Xi = Points[i][0], Yi = Points[i][1];
            var Xj = Points[j][0], Yj = Points[j][1];

            var insect = ((Yi > y) != (Yj > y)) && (x < (Xj - Xi) * (y - Yi) / (Yj - Yi) + Xi);

            if (insect) ifInside = !ifInside;
        }

        // //console.log(ifInside);
        return ifInside;
    }

    getMax () {
       // 获取极限点击位置 用于
    }
}