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
    console.log(e);        
    this.wxCanvas.touchmoveDetect(e);
  },
  bindtouchend:function(){
     //检测手指点击 移出事件
    this.wxCanvas.touchendDetect();
  },
  bindtap:function(e){
    console.log(e);    
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


    this.wxCanvas = new wxDraw(context,50,50,400,500);

    /**
     * 由于 小程序没有Dom 操作，所以没法获取canvas高度以及绘图的起点
     * 所以 wxDraw初始化的时候 需要设置 以便点击检测的时候使用
    */

    // let rect = new Shape('rect', { x: 60, y: 60, w: 40, h: 40, opacity: 0.3, fillStyle: "#2FB8AC", rotate: 0, needShadow: true, shadow: { color: "#cccccc" },needGra: 'line', gra: [[0, '#00A0B0'], [0.2, '#6A4A3C'], [0.4, '#CC333F'], [0.6, '#EB6841'], [1, '#EDC951']] }, 'mix', true)
    var rect = new Shape('rect', { x: 160, y: 160, w: 40, h: 40, lineWidth: 20, fillStyle: "#2FB8AC", rotate: Math.PI / 2, needShadow: true, isLineDash: true, lineDash: [[5, 5], 5], lineJoin:"miter",miterLimit:100 }, 'fill', true);

    let circle = new Shape('circle', { x: 160, y: 160, r: 40, sA: 0, fillStyle: "#C0D860", strokeStyle: "#CC333F", rotate: 20, lineWidth: 0, needGra: 'line', gra: [[0, '#00A0B0'], [0.2, '#6A4A3C'], [0.4, '#CC333F'], [0.6, '#EB6841'], [1, '#EDC951']]}, 'fill', true)
    console.log(rect);
    let ellipse = new Shape('ellipse', { x: 180, y: 200, a: 100, b: 140, fillStyle: "#2964CC", rotate: Math.PI / 2, opacity:1,shadow:{blur:2}}, 'fill', true)
    let cshape = new Shape('cshape', {
      rotate: Math.PI / 2,
      points: [[70, 85], [40, 20], [24, 46], [2, 4], [14, 6], [4, 46]],
      lineWidth: 5,
      fillStyle: "#00A0B0",
      rotate: Math.PI / 7,
      needGra: 'circle',
      smooth:false,
      gra: [[0, '#00A0B0'], [0.2, '#6A4A3C'], [0.4, '#CC333F'], [0.6, '#EB6841'], [1, '#EDC951']]
    }, 'fill', true)
    let polygon = new Shape('polygon', { x: 200, y: 200, r: 40, sides: 9, fillStyle: "#FC354C", rotate: Math.PI / 4 }, 'mix', true)
    let text = new Shape('text', { x: 180, y: 200, text: "W", fillStyle: "#ffffff", fontSize:40,rotate: 0,align:"center",textBaseline:'middle'}, 'fill', true)
    let line = new Shape('line', { points:[[240,373],[11,32],[28,423],[12,105],[203,41],[128,0.06]], strokeStyle: "#2FB8AC",lineWidth:1, rotate: 0, needShadow: true,smooth:true}, 'fill', true)
    // console.log(cshape);
    // this.wxCanvas.add(rect);
    // this.wxCanvas.add(circle);
    this.wxCanvas.add(ellipse);
    // this.wxCanvas.add(polygon);
    
    // this.wxCanvas.add(line);
    // this.wxCanvas.add(cshape);

    

    // rect.updateOption({ needGra: "no" });
    // rect.animate("x", "+=100", { duration: 1000 }).animate({ "x": "+=100", "y": "-=30", "rotate": "10", "fillStyle": "#1BB0CE" }, { duration: 1000 }).
    //   animate({ "x": "-=100", "y": "+=30", "rotate": "+10", "fillStyle": "#6A5E72" }, { duration: 1000 }).
    //   animate({ "fillStyle": "#563444","opacity":1 }, { duration: 1000 }).start(3);



    // rect.animate("shadow", { color:"#F56218",offsetX:100,offsetY:100}, { duration: 1000 }).animate({ "lineWidth": "-=10", "y": "-=30", "rotate": "10", "fillStyle": "#1BB0CE" }, { duration: 1000 }).start(3);
    // let rect2 = rect.clone();
    // let rect3 = rect.clone();
    // let rect4 = rect.clone();
    // let rect5 = rect.clone();
    // let rect6 = rect.clone();
    // let rect7 = rect.clone();
    // let rect8 = rect.clone();
    // let rect9 = rect.clone();
    // let rect10 = rect.clone();
    // let rect11 = rect.clone();

    // this.wxCanvas.add(rect2);
    // this.wxCanvas.add(rect3);
    // this.wxCanvas.add(rect4);
    // this.wxCanvas.add(rect5);
    // this.wxCanvas.add(rect6);
    // this.wxCanvas.add(rect7);
    // this.wxCanvas.add(rect8);
    // this.wxCanvas.add(rect9);
    // this.wxCanvas.add(circle);

    // rect2.updateOption({ fillStyle:"#F8DB9A",x:100,y:200});
    // rect3.updateOption({ fillStyle:"#F3A358",x:110,y:200});
    // rect4.updateOption({ fillStyle:"#933C60",x:120,y:200});
    // rect5.updateOption({ fillStyle:"#37324A",x:130,y:200});
    // rect6.updateOption({ fillStyle:"#329996",x:140,y:200});
    // rect7.updateOption({ fillStyle:"#302C5B",x:150,y:200});
    // rect8.updateOption({ fillStyle:"#3C6C84",x:160,y:200});
    // rect9.updateOption({ fillStyle:"#92AD9F",x:170,y:200});
    // rect10.updateOption({ fillStyle:"#E1D5A3",x:180,y:200});

    // rect2.updateLayer("+2");
    
    // rect2.destroy();
    
    // circle/*.animate({ "x": "+=100", "y": "+=100" }, { duration: 1000 })*/.animate("sA", Math.PI*3/2, { duration: 1500, easing:"bouncePast" }).start(4);

    // rect.animate({ lineWidth: 10, w: "+=100", h: "+=50" }, { duration: 1000 }).animate({ x: "+=100", "rotate": "+10"}, { duration: 1000 }).animate({ lineDash: [[8, 6], 5] }, { duration: 1000 }).start(2)
    
    // line.animate({ x: "+=100", y: "-=20" }).animate({
    //   rotate: "-=1"}).start(3)



  //   cshape.animate({ x: "+=100", y: "+=120" }).animate({
  //     rotate: "-=10"}).start(3)
  // }



    // text.animate({ x: "+=40", y: "+=20", fillStyle: "#2B4E72" },{duration:2000}).animate({
    //   fontSize:"+=30"
    // }, { duration: 2000 }).start(1)


    // ellipse.bind('longpress',function(){

    //   rect.destroy();
    // });

    let a = ellipse.clone();
    let b = ellipse.clone();
    let c = ellipse.clone();
    let d = ellipse.clone();
    let e = ellipse.clone();
    let f = ellipse.clone();
    
    ellipse.destroy();
    this.wxCanvas.add(b);
    this.wxCanvas.add(a);
    this.wxCanvas.add(c);
    // this.wxCanvas.add(text);
    
   b.updateOption({fillStyle:"#ff65ff",rotate:0});
   a.updateOption({ fillStyle: "#29ffff", rotate: 0 });
   
   a.animate({ rotate: "+=" + Math.PI * 2 }, { duration: 4000, easing:"linear"}).start(true);
   b.animate({ rotate: "+=" + Math.PI * 2 }, { duration: 5000, easing: "linear" }).start(true)
   c.animate({ rotate: "+=" + Math.PI * 2 }, { duration: 3000, easing: "linear" }).start(true)
  }
  
})
