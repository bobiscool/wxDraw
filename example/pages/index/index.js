//index.js
//获取应用实例
const app = getApp()
var WxDraw = require("../../utils/wxdraw.js").WxDraw;
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
    // console.log(requestAnimationFrame);
    var context = wx.createCanvasContext('first')


   

    // Fill with gradient


    this.wxCanvas = new WxDraw(context,0,0,400,500);
    /**
     * 由于 小程序没有Dom 操作，所以没法获取canvas高度以及绘图的起点
     * 所以 wxDraw初始化的时候 需要设置 以便点击检测的时候使用
    */

    // this.wxCanvas.add(new Shape('circle',{x:20,y:20,r:20,fillStyle:"#333333"},true));

    var cir1 = new Shape('cshape', {
      fillStyle: "#000000", rotate: Math.PI / 2, points: [
        [200, 185]
        , [206.2666616782152, 185.11827948028284]
        , [212.43449435824274, 185.47125258307054]
        , [218.40622763423391, 186.05335271167624]
        , [224.08768370508577, 186.85539979934205]
        , [229.38926261462365, 187.86474508437578]
        , [234.22735529643444, 189.06547058867883]
        , [238.52566213878947, 190.43864015376965]
        , [242.21639627510075, 191.96259807531504]
        , [245.24135262330097, 193.6133106265239]
        , [247.55282581475768, 195.36474508437578]
        , [249.11436253643444, 197.18928028121414]
        , [249.9013364214136, 199.05814220706029]
        , [249.9013364214136, 200.9418577929397]
        , [249.11436253643444, 202.81071971878586]
        , [247.55282581475768, 204.63525491562422]
        , [245.241352623301, 206.3866893734761]
        , [242.21639627510075, 208.03740192468496]
        , [238.52566213878947, 209.56135984623035]
        , [234.22735529643444, 210.93452941132117]
        , [229.38926261462365, 212.13525491562422]
        , [224.08768370508574, 213.14460020065795]
        , [218.40622763423386, 213.9466472883238]
        , [212.4344943582427, 214.52874741692946]
        , [206.26666167821517, 214.88172051971716]
        , [199.99999999999994, 215]
        , [193.73333832178471, 214.88172051971716]
        , [187.5655056417572, 214.52874741692946]
        , [181.59377236576603, 213.94664728832376]
        , [175.91231629491415, 213.14460020065795]
        , [170.61073738537627, 212.1352549156242]
        , [165.77264470356548, 210.93452941132114]
        , [161.47433786121047, 209.56135984623032]
        , [157.7836037248992, 208.03740192468493]
        , [154.75864737669897, 206.38668937347606]
        , [152.4471741852423, 204.6352549156242]
        , [150.88563746356556, 202.81071971878583]
        , [150.0986635785864, 200.94185779293966]
        , [150.09866357858644, 199.05814220706026]
        , [150.8856374635656, 197.18928028121408]
        , [152.44717418524237, 195.36474508437573]
        , [154.75864737669912, 193.61331062652386]
        , [157.78360372489934, 191.96259807531501]
        , [161.47433786121067, 190.4386401537696]
        , [165.7726447035657, 189.06547058867878]
        , [170.61073738537652, 187.86474508437576]
        , [175.91231629491443, 186.85539979934202]
        , [181.5937723657663, 186.0533527116762]
        , [187.56550564175748, 185.4712525830705]
        , [193.73333832178503, 185.1182794802828]],lineWidth:0.5,Shadow:"#ffffff"}, false,true)
    // var cir4 = new Shape('line', {
    //   fillStyle: "#000000", rotate: Math.PI / 2, points: [
    //     [163, 193], [-18, 48]], lineWidth: 12, Shadow: "#ffffff"
    // }, true, true)
    // var cir2 = new Shape('rect', { x: 0, y: 60, w: 40, h: 40, fillStyle: "#000000", rotate: 200}, true,true)

    // var cir3 = new Shape('polygon', { x: 0, y: 300, r: 20, sides: 5,rotate:0}, true, true)
 
    var cir3 = new Shape('rect', { x: 200, y: 100, w: 200,h:200,lineWidth:100, fillStyle:"#FF370F",rotate:Math.PI/4}, false, true)

    var cir4 = new Shape('ellipse',{
      x:200,y:200,
      a: 100, b: 300, rotate:0,
      fillStyle: "#000000",
      lineWidth:10
    },false, true)    

    console.log(cir4);
    // // cir3.setOrigin([40,40])
    // console.log(cir3);
    this.wxCanvas.add(cir4);
    // this.wxCanvas.add(cir1);
    
    // // cir1.updateOption({x:100})
    // this.wxCanvas.add(cir2);
    // console.log(cir2);
    // cir2.updateOption({ x: 200 })
    // setTimeout(function(){
    //   cir2.updateOption({ x: 100 })
    // },2000);

    console.log(this.wxCanvas);
    // cir1.animate({
    //   "x":"+=100",
    //   "y":"+=100",
    //   "r":"+=100"

    // // },{
    // //   duration: 4000,
    // //   onLooping: function () {
    // //     console.log('***');
    // //   },
    // //   easing: "bouncePast"
    // //   }).animate({ 'rotate': Math.PI, "x": "-=20", y: 200 }, {
    // //     duration: 2000,
    // //     onLooping: function () {
    // //       console.log('----');
    // //     },
    // //     easing: "bouncePast"
    // //   });


    cir4.animate({a: "+=100",b:"10",lineWidth:"1",Shadow:{
      offsetX:100,
      offsetY: 100,
      color:"#cccccc"
    }}, {
        duration: 1000,
        onLooping: function () {
          console.log('----');
        },
        easing: "linear"
    }).start(1);
    // cir1.animate("y", "-=500", {
    //   duration: 10000,
    //   onLooping: function () {
    //     console.log('----');
    //   },
    //   easing: "bouncePast"
    // }).start();
    // .animate({ 'rotate': Math.PI, "x": "+=200", y: 400 }, {
    //   duration: 2000,
    //   onLooping: function () {
    //     console.log('----');
    //   },
    //   easing: "bouncePast"
    //   }).animate({ 'rotate': -1*Math.PI, "x": 200, y: 260 }, {
    //     duration: 2000,
    //     onLooping: function () {
    //       console.log('----');
    //     },
    //     easing: "bouncePast"
    //   }).start(5);



    // cir2.animate({ "fillStyle": "#ff0000", "x": "+=100"}, {
    //   duration: 1000,
    //   onLooping: function () {
    //      console.log('动画1');
    //   },
    //   easing: "linear"
    // }).animate({"x":"+=100","y":"+=200"},{duration:2000})
    //   .animate({ "rotate": "+=100", "y": "-=200" }, { duration: 2000, easing: "easeTo" })
    //   .animate({ "w": "+=100", "h": "-=10", "fillStyle":"#CDECCC" }, { duration: 4000, easing:"bouncePast" }).
    //   animate({ "w": "-=100", "h": "+=40", "fillStyle": "#B3204D", "rotate": "+=10", }, { duration: 4000, easing: "bouncePast" })
    //   .start();


      
    // cir1.updateOption({ lineJoin:"round"})
    // cir1.updateOption({
    //   lineCap:"butt"
    // })
    // cir3.animate({
    //    Shadow: {
    //     color: "#E84A5F",
    //     offsetX:200,
    //     offsetY:200,
    //     blur:100
    //   }}, {
    //   duration: 5000,
    //   onLooping: function () {
    //     console.log('动画2'
        
        
    //     );
    //   },
   
    //   easing: "linear"
    // }).start(1);




    // cir2.animate({
    //   Shadow: {
    //     color: "#E84A5F",
    //     offsetX: 200,
    //     offsetY: 200,
    //     blur: 100
    //   }
    // }, {
    //     duration: 5000,
    //     onLooping: function () {
    //       console.log('动画2'


    //       );
    //     },

    //     easing: "linear"
    //   }).start(1);




    // cir3.animate({ "rotate": "+=" + 2 * Math.PI, "fillStyle": "#ff0000",x:"-=400",r:"-=40"}, {
    //   duration: 4000,
    //   onLooping: function () {
    //     console.log('动画2'


    //     );
    //   },
    //   easing: "linear"
    // }).start(200);  
    // this.wxCanvas.add(new Shape('circle', { x: 200, y: 20, r: 20 }, true))
    // this.wxCanvas.add(new Shape('rect', { x: 200, y: 20, w: 40,h:50 }))
    // this.wxCanvas.add(new Shape('polygon', { sides:876,r:100}))
   
  




    // this.wxCanvas.draw();
    // context.draw();
    
    // const grd = context.createLinearGradient(30, 10, 120, 10)
    // grd.addColorStop(0, 'red')
    // grd.addColorStop(1, 'white')
    // context.setFillStyle(grd)
    // context.setStrokeStyle('#000000');
    // context.arc(200, 100, 100,0,Math.PI*2,)
    // context.stroke();
    // context.draw();

    const grd = context.createLinearGradient(100,0, 250, 0)
    // grd.addColorStop(0, 'red')
    // // grd.addColorStop(0.16, 'orange')
    // // grd.addColorStop(0.33, 'yellow')
    // // grd.addColorStop(0.5, 'green')
    // grd.addColorStop(0.66, 'cyan')
    // // grd.addColorStop(0.83, 'blue')
    // grd.addColorStop(1, 'purple')

    // // Fill with gradient
    // context.setFillStyle(grd)
    // // context.arc(100, 100, 150, 80)
    //     context.setStrokeStyle('#000000');
    // context.arc(200, 100, 100,0,Math.PI*2,);
    // context.stroke();
    // context.fill();
    // context.draw();
  }
})
