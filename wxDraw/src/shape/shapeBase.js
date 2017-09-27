/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-09-22 09:29:58 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-09-22 13:31:58
 * 图形的基本性质 用于绑定 事件 以及拖拽 高亮用的
 */

function ShapeBase(context, options) {
    this._dragable = options.dragable ? options.dragable : false;
    this._context = context;
}
ShapeBase.prototype = function(){
   
}



module.exports = {
    ShapeBase:ShapeBase
}