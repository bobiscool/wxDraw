//index.js
//获取应用实例
const app = getApp()
var WxDraw = rquire("../../utils/index.js").WxDraw;
var Shape = rquire("../../utils/index.js").Shape;
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,

  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  detect:function(e){
   
  },
  touchDown:function(){
   
  },
  touchUp:function(){

  },
  onLoad: function () {
   
  }
})
