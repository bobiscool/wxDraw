//index.js
//获取应用实例
const app = getApp()
var  wxDraw= require("../../utils/wxdraw.js").wxDraw;
var Shape = require("../../utils/wxdraw.js").Shape;
var AnimationFrame = require("../../utils/wxdraw.js").AnimationFrame;

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
    var context = wx.createCanvasContext('first')


   

    // Fill with gradient


    this.wxCanvas = new wxDraw(context,0,0,400,500);

    /**
     * 由于 小程序没有Dom 操作，所以没法获取canvas高度以及绘图的起点
     * 所以 wxDraw初始化的时候 需要设置 以便点击检测的时候使用
    */

    let rect = new Shape('rect', { x: 60, y: 60, w: 40, h: 40, opacity: 0.3, fillStyle: "#2FB8AC", rotate: 0, needShadow: true, shadow: { color: "#cccccc" } }, 'mix', true)
    let circle = new Shape('circle', { x: 100, y: 100, r: 40, sA: 0.7, fillStyle: "#C0D860", strokeStyle: "#CC333F", rotate: 20, lineWidth: 20 }, 'mix', true)
    let ellipse = new Shape('ellipse', { x: 200, y: 200, a: 40, b: 100, fillStyle: "#00A0B0", rotate: Math.PI / 7, needGra: true, lg: [[0, '#00A0B0'], [0.2, '#6A4A3C'], [0.4, '#CC333F'], [0.6, '#EB6841'], [1, '#EDC951']] }, 'mix', true)
    let cshape = new Shape('cshape', {
      rotate: Math.PI / 2,
      points: [[70, 85], [40, 20], [24, 46], [2, 4], [14, 6], [4, 46]],
      lineWidth: 5,
      fillStyle: "#00A0B0",
      rotate: Math.PI / 7,
      needGra: true,
      lg: [[0, '#00A0B0'], [0.2, '#6A4A3C'], [0.4, '#CC333F'], [0.6, '#EB6841'], [1, '#EDC951']]
    }, 'fill', true)
    let polygon = new Shape('polygon', { x: 200, y: 200, r: 40, sides: 9, fillStyle: "#FC354C", rotate: Math.PI / 4, needGra:'line', lg: [[0, '#00A0B0'], [0.2, '#6A4A3C'], [0.4, '#CC333F'], [0.6, '#EB6841'], [1, '#EDC951']] }, 'mix', true)
    let text = new Shape('text', { x: 200, y: 200, text: "我是测试文字", fillStyle: "#E6781E", rotate: Math.PI / 3 }, 'fill', true)
    let line = new Shape('line', { points:[[70, 85], [40, 20], [24, 46], [2, 4], [14, 6], [4, 46]], strokeStyle: "#2FB8AC",lineWidth:20, rotate: 0, needShadow: true }, 'fill', true)
    console.log(cshape);
    this.wxCanvas.add(rect);
    this.wxCanvas.add(circle);
    this.wxCanvas.add(ellipse);
    this.wxCanvas.add(polygon);
    this.wxCanvas.add(text);
    this.wxCanvas.add(line);
    this.wxCanvas.add(cshape);
  }

  
})
