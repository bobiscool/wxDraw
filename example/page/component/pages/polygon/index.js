//index.js
//获取应用实例
const app = getApp()
var  wxDraw= require("../../../../util/wxdraw.min.js").wxDraw;
var Shape = require("../../../../util/wxdraw.min.js").Shape;
var AnimationFrame = require("../../../../util/wxdraw.min.js").AnimationFrame;

// console.log(cancelAnimationFrame);

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
    // console.log(e);        
    this.wxCanvas.touchmoveDetect(e);
  },
  bindtouchend:function(){
     //检测手指点击 移出事件
    this.wxCanvas.touchendDetect();
  },
  bindtap:function(e){
    // console.log(e);    
    this.wxCanvas.tapDetect(e);
  },
  bindlongpress:function(e){
    // console.log(e);
    this.wxCanvas.longpressDetect(e);
  },
  onLoad: function () {
    /** 
     * 
     */
    // console.log(requestAnimationFrame);
    var context = wx.createCanvasContext('polygon')


   

    // Fill with gradient


    this.wxCanvas = new wxDraw(context,0,0,400,500);

    /**
     * 由于 小程序没有Dom 操作，所以没法获取canvas高度以及绘图的起点
     * 所以 wxDraw初始化的时候 需要设置 以便点击检测的时候使用
    */


    let polygon = new Shape('polygon', { x: 200, y: 100, r: 40, sides: 3, fillStyle: "#FC354C", rotate: Math.PI / 4 }, 'mix', true)
    this.wxCanvas.add(polygon);
    
    let p2 = polygon.clone();
    let p3 = polygon.clone();

    this.wxCanvas.add(p2);
    this.wxCanvas.add(p3);

    p2.updateOption({y:200,rotate:Math.PI/5,fillStyle:"#7CB490",sides:5})
    p3.updateOption({y:300,isLineDash:true,sides:13})
  },
  onUnload: function () {
    this.wxCanvas.clear(); //推荐这个
  }
  
})
