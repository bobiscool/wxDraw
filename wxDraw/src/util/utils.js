/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-09-22 09:34:43 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-10-17 14:09:50
 * 
 * 工具库
 */



// import * as _ from "lodash"

export const getLocation=function(x, y) {
    return {
        x: (x - canvas.getBoundingClientRect().left) > 0 ? (x - canvas.getBoundingClientRect().left) : 0,
        y: (y - canvas.getBoundingClientRect().top) > 0 ? (y - canvas.getBoundingClientRect().top) : 0,
    }
}


export const guid=function(){
   var guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
         return v.toString(16);
    });     
    return guid;
}




export const arrLikeToArray=function (al) {
    let len = al.length;
    let temArray = [];
    if (len > 0) {
        for (var i = 0; i < len; i++) {
            temArray.push(al[i])
        }
    }
    return temArray;
}
export const util = {

    mix(target, source, overlay) {
        //混合
        target = 'prototype' in target ? target.prototype : target;
        source = 'prototype' in source ? source.prototype : source;

        this.extend(target, source, overlay);

    },
    extend(target, source, overlay) {
        for (var key in source) {
            if (source.hasOwnProperty(key)
                && (overlay ? source[key] != null : target[key] == null)
            ) {
                target[key] = source[key];
            }
        }
        return target;
    },
}


 export const matrixToarray=function(a){
       let _points =[]; //将矩阵洗成 点位数组
       a.forEach(function(item){
         _points.push([item[0][0],item[1][0]])
       });

       return _points;
    }


  // 将 16进制 颜色 转成 rgb 用于渐变 https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
  
  export const hex2rgb = function(val){
      var regex = /$#?([a-f\d]{2}([a-f\d]{2}([a-f\d]{2})/i 
  }

  export const rgb2hex = function(){
   
  }