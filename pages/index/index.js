//index.js
//获取应用实例
const app = getApp()
var WxDraw = require("../../utils/index.js").WxDraw;
var Shape = require("../../utils/index.js").Shape;
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    wxCanvas:null

  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  bindtouchstart:function(e){
    //  console.log(e);
     this.wxCanvas.detect(e);
  },
  bindtouchmove:function(e){
    // console.log(e);
    this.wxCanvas.moveDetect(e);
  },
  bindtouchend:function(e){
    // console.log(e);
  },
  detect:function(e){
   
  },
  touchDown:function(){
   
  },
  touchUp:function(){

  },
  onLoad: function () {
    /**
     * 
     */
    var context = wx.createCanvasContext('first')

    this.wxCanvas = new WxDraw(context,0,0,400,500);
    /**
     * 由于 小程序没有Dom 操作，所以没法获取canvas高度以及绘图的起点
     * 所以 wxDraw初始化的时候 需要设置 以便点击检测的时候使用
    */

    this.wxCanvas.add(new Shape('circle',{}))

    this.wxCanvas.draw();
    context.draw();
  }
})
