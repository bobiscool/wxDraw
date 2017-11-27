//index.js
//获取应用实例
const app = getApp()
var  wxDraw= require("../../../../util/wxdraw.js").wxDraw;
var Shape = require("../../../../util/wxdraw.js").Shape;
var AnimationFrame = require("../../../../util/wxdraw.min.js").AnimationFrame;



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
    // 检测手指点击事件
    // console.log(e);
    this.wxCanvas.touchstartDetect(e);
    
  },
  bindtouchmove:function(e){
    // 检测手指点击 之后的移动事件
    this.wxCanvas.touchmoveDetect(e);
  },
  bindtouchend:function(){
     //检测手指点击 移出事件
    this.wxCanvas.touchendDetect();
  },
  bindtap:function(e){
    this.wxCanvas.tapDetect(e);
  },
  bindlongpress:function(e){
    // console.log(e);
    this.wxCanvas.longpressDetect(e);
  },
  onLoad: function () {

    var context = wx.createCanvasContext('rect')



    this.wxCanvas = new wxDraw(context,0,0,400,500);
    // console.log(this.wxCanvas)
    
    /**
     * 由于 小程序没有Dom 操作，所以没法获取canvas高度以及绘图的起点
     * 所以 wxDraw初始化的时候 需要设置 以便点击检测的时候使用
    */

    var rect = new Shape('rect', { x: 150, y: 250, w: 80, h: 80,fillStyle:"#36BBA6" }, 'fill', true);
    this.wxCanvas.add(rect);
    rect.setOrigin([40,40]);
    rect.updateOption({rotate:Math.PI/4})

  },
  onUnload: function () {
    this.wxCanvas.clear(); //推荐这个
  }
  
})
