//index.js
//获取应用实例
const app = getApp()
var wxDraw = require("../../../../util/wxdraw.min.js").wxDraw;
var Shape = require("../../../../util/wxdraw.min.js").Shape;
var AnimationFrame = require("../../../../util/wxdraw.min.js").AnimationFrame;


Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    wxCanvas: null


  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  bindtouchstart: function (e) {
    // 检测手指点击事件
    // console.log(e);
    this.wxCanvas.touchstartDetect(e);

  },
  bindtouchmove: function (e) {
    // 检测手指点击 之后的移动事件
    this.wxCanvas.touchmoveDetect(e);
  },
  bindtouchend: function () {
    //检测手指点击 移出事件
    this.wxCanvas.touchendDetect();
  },
  bindtap: function (e) {
    this.wxCanvas.tapDetect(e);
  },
  bindlongpress: function (e) {
    // console.log(e);
    this.wxCanvas.longpressDetect(e);
  },
  onLoad: function () {
    /** 
     * 
     */
    // console.log(requestAnimationFrame);
    var context = wx.createCanvasContext('loadingA')




    // Fill with gradient


    this.wxCanvas = new wxDraw(context, 0, 0, 400, 500);

    /**
     * 由于 小程序没有Dom 操作，所以没法获取canvas高度以及绘图的起点
     * 所以 wxDraw初始化的时候 需要设置 以便点击检测的时候使用
    */

     let r = [];
     for(var i =0;i<15;i++){
       r[i] = new Shape('rect', {  x: 80+15*i, y: 260, w:10,h:15, fillStyle: "#E3A72F",opacity:0.2}, 'fill', false);
       this.wxCanvas.add(r[i]);
       (function(i){
         let n = 0;
         if(i<=7){
           n=7-i;
         }else{
           n = i-7;
         }
         setTimeout(function(){
             r[i].animate({'h':"+=150",opacity:1},{duration:1000}).animate({'h':"-=150",opacity:0.2},{duration:1000}).start(true);
         },n*100+1000);
       })(i)
     }

    
  },
  onUnload:function(){
    this.wxCanvas.clear(); //推荐这个
  }

})
