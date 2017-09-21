/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-09-21 13:47:34 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-09-21 14:30:08
 * 主要 引入对象
 * 
 * 
 */

var  uitl = require("./util/utils.js");
var  Store = require("./store/store.js").Store;



function WxDraw(canvas){
    this._canvas = canvas;
    this._wcid = util._guid()
    this.store = new Store();
}

WxDraw.prototype = {
    
}