/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-09-21 13:47:34 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-09-22 22:23:59
 * 主要 引入对象
 * 
 * 
 */

var  _guid = require("./util/utils.js")._guid;
var  Store = require("./store/store.js").Store;
var  Shape = require("./shape/shape.js").Shape;



function WxDraw(canvas){
    this._canvas = canvas;
    this._wcid = _guid()
    this.store = new Store();
}

WxDraw.prototype = {
    add:function(item){
         this.store.add(item);
    },
    draw:function(context){
        this.store.store.forEach(function(item) {
            item.paint(context);
            console.log('绘制');
        }, this);
    }   
}

module.exports = {
    WxDraw:WxDraw,
    Shape:Shape
}