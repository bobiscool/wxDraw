/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-10-24 17:06:52 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-10-24 17:43:54
 * 此处 使用的是
 * https://stackoverflow.com/questions/7054272/how-to-draw-smooth-curve-through-n-points-using-javascript-html5-canvas
 * 里面的算法
 * 意在 计算出 光滑的曲线
 * 里面是怎么算的 以我现在的数学水平 看不明白
 * 就鼓掌吧👏
 */


 function getCurvePoints(pts, tension, isClosed, numOfSegments) {

    tension = (typeof tension != 'undefined') ? tension : 0.5;
    isClosed = isClosed ? isClosed : false;
    numOfSegments = numOfSegments ? numOfSegments : 16;

    var _pts = [], res = [],    // clone array
        x, y,           // our x,y coords
        t1x, t2x, t1y, t2y, // tension vectors
        c1, c2, c3, c4,     // cardinal points
        st, t, i;       // steps based on num. of segments

    // clone array so we don't change the original
    //
    _pts = pts.slice(0);

    // The algorithm require a previous and next point to the actual point array.
    // Check if we will draw closed or open curve.
    // If closed, copy end points to beginning and first points to end
    // If open, duplicate first points to befinning, end points to end
    if (isClosed) {
        _pts.unshift(pts[pts.length - 1]);
        _pts.unshift(pts[pts.length - 1]);
        _pts.push(pts[0]);
    }
    else {
        _pts.unshift(pts[1]);   //copy 1. point and insert at beginning
        _pts.push(pts[pts.length - 1]);
    }

    // ok, lets start..

    // 1. loop goes through point array
    // 2. loop goes through each segment between the 2 pts + 1e point before and after
    for (i=1; i < (_pts.length - 2); i+=1) {
        for (t=0; t <= numOfSegments; t++) {

            // calc tension vectors
            t1x = (_pts[i+1][0] - _pts[i-1][0]) * tension;
            t2x = (_pts[i+2][0] - _pts[i][0]) * tension;

            t1y = (_pts[i+1][1] - _pts[i-1][1]) * tension;
            t2y = (_pts[i+2][1] - _pts[i][1]) * tension;

            // calc step
            st = t / numOfSegments;

            // calc cardinals
            c1 =   2 * Math.pow(st, 3)  - 3 * Math.pow(st, 2) + 1; 
            c2 = -(2 * Math.pow(st, 3)) + 3 * Math.pow(st, 2); 
            c3 =       Math.pow(st, 3)  - 2 * Math.pow(st, 2) + st; 
            c4 =       Math.pow(st, 3)  -     Math.pow(st, 2);

            // calc x and y cords with common control vectors
            x = c1 * _pts[i][0]    + c2 * _pts[i+1][0] + c3 * t1x + c4 * t2x;
            y = c1 * _pts[i][1]  + c2 * _pts[i+1][1] + c3 * t1y + c4 * t2y;

            //store points in array
            res.push([x,y]);

        }
    }

    return res;
}