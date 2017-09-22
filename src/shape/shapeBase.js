/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-09-22 09:29:58 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-09-22 09:33:10
 * 图形的基本性质
 */

function ShapeBase(context, options) {
    this._dragable = options.dragable ? options.dragable : false;
    this._config = UTIL.cloMix(SHACON[options.type], options.opts);
    this._context = context;
    UTIL.extend(this, SHAPES[optPro.type], false);
    this._shapeid = optPro._shapeid
}