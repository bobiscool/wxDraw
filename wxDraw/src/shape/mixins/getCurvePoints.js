/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-10-24 17:06:52 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-10-24 17:47:18
 * 此处 使用的是
 * https://stackoverflow.com/questions/7054272/how-to-draw-smooth-curve-through-n-points-using-javascript-html5-canvas
 * 里面的算法
 * 意在 计算出 光滑的曲线
 * 里面是怎么算的 以我现在的数学水平 看不明白
 * 就鼓掌吧👏
 */


export const getCurvePoints = function (pts, tension, isClosed, numOfSegments) {

    tension = (typeof tension != 'undefined') ? tension : 0.5;
    isClosed = isClosed ? isClosed : false;
    numOfSegments = numOfSegments ? numOfSegments : 16;

    var _pts = [], res = [],
        x, y,
        t1x, t2x, t1y, t2y,
        c1, c2, c3, c4,
        st, t, i;
    _pts = pts.slice(0);

    if (isClosed) {
        _pts.unshift(pts[pts.length - 1]);
        _pts.unshift(pts[pts.length - 1]);
        _pts.push(pts[0]);
    }
    else {
        _pts.unshift(pts[1]);
        _pts.push(pts[pts.length - 1]);
    }

    for (i = 1; i < (_pts.length - 2); i += 1) {
        for (t = 0; t <= numOfSegments; t++) {

            // calc tension vectors
            t1x = (_pts[i + 1][0] - _pts[i - 1][0]) * tension;
            t2x = (_pts[i + 2][0] - _pts[i][0]) * tension;

            t1y = (_pts[i + 1][1] - _pts[i - 1][1]) * tension;
            t2y = (_pts[i + 2][1] - _pts[i][1]) * tension;

            st = t / numOfSegments;

            c1 = 2 * Math.pow(st, 3) - 3 * Math.pow(st, 2) + 1;
            c2 = -(2 * Math.pow(st, 3)) + 3 * Math.pow(st, 2);
            c3 = Math.pow(st, 3) - 2 * Math.pow(st, 2) + st;
            c4 = Math.pow(st, 3) - Math.pow(st, 2);

            x = c1 * _pts[i][0] + c2 * _pts[i + 1][0] + c3 * t1x + c4 * t2x;
            y = c1 * _pts[i][1] + c2 * _pts[i + 1][1] + c3 * t1y + c4 * t2y;

            res.push([x, y]);

        }
    }

    return res;
}