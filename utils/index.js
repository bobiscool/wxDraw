/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-09-21 13:47:34 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-09-24 12:03:16
 * 主要 引入对象
 * 
 * 
 */

var  _guid = require("./util/utils.js")._guid;
var  Store = require("./store/store.js").Store;
var  Shape = require("./shape/shape.js").Shape;

/**
 * 
 * 
 * @param {any} canvas canvas对象
 * @param {any} x   由于小程序的无法获取 canvas 大小高宽 必须指定 x y 长宽 才能 去检测点击
 * @param {any} y 
 * @param {any} w 
 * @param {any} h 
 */
function WxDraw(canvas,x,y,w,h){
    this._canvas = canvas;
    this._wcid = _guid();
    this.store = new Store();
}

WxDraw.prototype = {
    add:function(item){
         this.store.add(item);
    },
    draw:function(){
        this.store.store.forEach(function(item) {
            item.paint(this._canvas);
        }, this);
    },
       
}





module.exports = {
    WxDraw:WxDraw,
    Shape:Shape
}