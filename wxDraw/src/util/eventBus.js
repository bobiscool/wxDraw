/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-09-29 15:33:40 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-09-29 15:48:32
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
            if(ele.name==="name"){
                ele.thingsList.push(event);
            }else{
                this.eventList.push({
                    name:name,
                    thingsList:[event]
                })
            }
        }, this);
    },
    dispatch:function(){
       //执行事件
    },
    destroy:function(){
        // 取消事件
    }
}
