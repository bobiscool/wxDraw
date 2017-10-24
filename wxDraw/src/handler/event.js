/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-09-23 20:05:04 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-10-24 11:20:57
 * 添加事件
 */


 export const eventFul = {
     on:function(type,method){
        /**
         * 事件有点击事件
         *         touchstart
         *         touchmove 
         *         touchend
         *        拖拽事件
         *      tap事件
         *      longpress事件
         */ 
         this._eventStore[type].push(method)
     }
 }

