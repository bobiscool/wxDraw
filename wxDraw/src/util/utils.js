/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-09-22 09:34:43 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-10-19 18:37:38
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
    /**
     * 
     * 
     * @param {any} target 覆盖者
     * @param {any} source 被覆盖者
     * @param {any} overlay 是否全部抹掉
     * @returns 
     */
    extend(target, source) {
        for (var key in target) {
            if (source.hasOwnProperty(key))//如果是覆盖的话 只要源source 有那就覆盖掉。。。 不是那就沿用现在的这叫extend太绕了
             {
                source[key] = target[key]; 
            }
        }
        return source;
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
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(val);
      //console.log('hex2rgb',result);
      return result?{
          r:parseInt(result[1],16),
          g:parseInt(result[2],16),
          b:parseInt(result[3],16)
      }:null;
      
  }

  export const rgb2hex = function(r,g,b){
      //console.log(r,g,b);
      //console.log('1666666',((1<<24)+(r<<16)+(g<<8)+b).toString(16));
     return  ((1<<24)+(r<<16)+(g<<8)+b).toString(16).substr(1);// << 是javascript左移运算符 
     /**
      * 1<<24 是为了防止 在r 为0的时候 左移被忽略 所以添加一个1 来保底
      * 然后 r 占在最高位 所以 左移16位（这个 16位其实是 2进制里面左移） 以此类推
      */
  }


  export const objToArray = function(obj){ //对象的值转数组
    let _Arrays=[];
        // console.log(obj);
        // console.log( Object.keys(obj));
        Object.keys(obj).forEach(function(item){
          _Arrays.push(obj[item]);
        });

        return _Arrays;
  }