/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-09-23 20:05:04 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-09-24 14:18:30
 * \事件感应 函数
 */

function getLocation(x, y,conOption) {
    // 获取手势的位置
    return {
        x: (x - conOption.left) > 0 ? conOption.left: 0,
        y: (y - conOption.top) > 0 ? conOption.top: 0,
    }
}
 
 function detect(e){
// 获取事件对象
        var _temLoc = getLocation(x,y,conOption);
        
 }