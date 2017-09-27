/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-09-27 23:31:49 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-09-27 23:48:21
 * 单个小物件自己的计时器
 */
function Watch(){
    this.startTime = 0; //启动时间
    this.running = false;//是否还在运行
    this.goesBytime = 0;
    this.goesBy = undefined;
    this.DEFAULT_ELASTIC = 2;
}
export const AnimationTimer = function(duration,timeWrap){
    if(duration !== undefined) this.duration = duration;
    if(timeWrap !== undefined) this.timeWrap = timeWrap;
}

AnimationTimer.prototype = {
  

    
}

