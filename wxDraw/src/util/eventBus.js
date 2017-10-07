/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-09-29 15:33:40 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-10-07 10:15:31
 * 事件对象
 * 
 */



export const eventBus=function (){
  this.eventList =[];
 }
eventBus.prototype = {
    add:function(name,event){
        //添加事件 初始化事件
        this.eventList.forEach(function(ele) {
            if(ele.name===name){
                ele.thingsList.push(event);
            }else{
                this.eventList.push({
                    name:name,
                    thingsList:[event]
                })
            }
        }, this);
    },
    dispatch:function(name,scope){
       //执行事件
       
       var _temArgu = arguments;
       
       if(arguments.length<2){
         return false;
       }
    
       let _params = Array.prototype.slice.call(_temArgu,1);

       this.eventList.forEach(function(ele){
           if(ele.name===name){
               this.eventList.forEach(function(_ele){
                   _ele.call(scope,params)
                   //  TODO 添加 解构 
                   
               });
           }
       });
    },
    destroy:function(){
        // 取消事件
    }
}
