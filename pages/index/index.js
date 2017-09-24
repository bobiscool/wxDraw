//index.js
//获取应用实例
const app = getApp()
var WxDraw = require("../../utils/index.js").WxDraw;
var Shape = require("../../utils/index.js").Shape;
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
