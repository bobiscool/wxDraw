//index.js
//获取应用实例
const app = getApp()
var WxDraw = require("../../wxDraw/dist/wxdraw.js").WxDraw;
var Shape = require("../../wxDraw/dist/wxdraw.js").Shape;
var AnimationFrame = require("../../wxDraw/dist/wxdraw.js").AnimationFrame;

console.log(cancelAnimationFrame);

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
     this.wxCanvas.detect(e);
    
  },
  bindtouchmove:function(e){
    // 检测手指点击 之后的移动事件
    this.wxCanvas.moveDetect(e);
  },
  bindtouchend:function(e){
     //检测手指点击 移出事件
    this.wxCanvas.upDetect(e);
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
    console.log(requestAnimationFrame);
    var context = wx.createCanvasContext('first')

    this.wxCanvas = new WxDraw(context,0,0,400,500);
    /**
     * 由于 小程序没有Dom 操作，所以没法获取canvas高度以及绘图的起点
     * 所以 wxDraw初始化的时候 需要设置 以便点击检测的时候使用
    */

    this.wxCanvas.add(new Shape('circle',{x:20,y:20,r:20,fillStyle:"#333333"},true));

    var cir1 = new Shape('circle', { x: 40, y: 20, r: 20, fillStyle: "#e3e223" }, true)
  
    this.wxCanvas.add(cir1)
    cir1.animate('x', "+=100", {
      duration: 1000
    })
    this.wxCanvas.add(new Shape('circle', { x: 200, y: 20, r: 20 }, true))
    this.wxCanvas.add(new Shape('rect', { x: 200, y: 20, w: 40,h:50 }))
    this.wxCanvas.add(new Shape('polygon', { sides:876,r:100}))
   
  




    this.wxCanvas.draw();
    context.draw();
  }
})
