/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-09-23 20:05:04 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-09-24 10:45:54
 * \事件感应 函数
 */

function getLocation(x, y,conOption) {
    // 获取手势的位置
    return {
        x: (x - conOption.left) > 0 ? conOption.left: 0,
        y: (y - conOption.top) > 0 ? conOption.top: 0,
    }
}
 
 function detect(items){
        items.forEach(function(element) {
            element.detect(getLocation())
        }, this);
 }