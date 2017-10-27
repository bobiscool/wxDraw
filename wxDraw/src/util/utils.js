/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-09-22 09:34:43 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-10-27 10:14:49
 * 
 * 工具库
 */



// import * as _ from "lodash"

export const getLocation = function (x, y) {
    return {
        x: (x - canvas.getBoundingClientRect().left) > 0 ? (x - canvas.getBoundingClientRect().left) : 0,
        y: (y - canvas.getBoundingClientRect().top) > 0 ? (y - canvas.getBoundingClientRect().top) : 0,
    }
}


export const guid = function () {
    var guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
    return guid;
}




export const arrLikeToArray = function (al) {
    let len = al.length;
    let temArray = [];
    if (len > 0) {
        for (var i = 0; i < len; i++) {
            temArray.push(al[i])
        }
    }
    return temArray;
}
export const util = {

    mix(target, source, overlay) {
        //混合
        target = 'prototype' in target ? target.prototype : target;
        source = 'prototype' in source ? source.prototype : source;

        this.extend(target, source, overlay);

    },
    /**
     * 
     * 
     * @param {any} target 覆盖者
     * @param {any} source 被覆盖者
     * @param {any} overlay 是否增加新的
     * @returns 
     */
    extend(target, source, overlay) {
        var _temS = util.clone(source);
        if (!overlay) {
            for (var key in target) {
                if (source.hasOwnProperty(key))//如果是覆盖的话 只要源source 有那就覆盖掉。。。 不是那就沿用现在的这叫extend太绕了
                {
                    if (typeof source[key] == "object" && !(source[key] instanceof Array)) {
                        console.log(key);
                        _temS[key]=util.extend(target[key], _temS[key])//递归
                    } else {
                        _temS[key] = target[key];

                    }
                }
            }
        } else {
            for (var key in target) {
                if (target.hasOwnProperty(key)) {
                    if (typeof source[key] == "object" && !(source[key] instanceof Array)) {
                        _temS[key]=util.extend(target[key], _temS[key], true)//递归
                    } else {
                        _temS[key] = target[key];
                    }
                }
            }
        }

        // console.log(_temS);
        return _temS;
    },
    clone: function (obj) {
        let _obj = {};
        function deepClone(obj) {
            let _obj = {};
            for (var key in obj) {
                // console.log(obj.hasOwnProperty(key)&&typeof obj[key]);
                if (obj.hasOwnProperty(key) && typeof obj[key] !== 'object') {
                    _obj[key] = obj[key];
                }
                if (obj.hasOwnProperty(key) && typeof obj[key] === 'object') {
                    _obj[key] = deepClone(obj[key]) //这里完全不用Stringify
                }
            }

            // console.log(_obj);
            return _obj;
        }

        return deepClone(obj)
    },
    // clone(obj) { //
    //     if (obj === null || typeof (obj) !== 'object' || 'isActiveClone' in obj)
    //         return obj;

    //     if (obj instanceof Date)
    //         var temp = new obj.constructor(); 
    //     else
    //         var temp = obj.constructor();

    //     for (var key in obj) {
    //         if (Object.prototype.hasOwnProperty.call(obj, key)) {
    //             obj['isActiveClone'] = null;
    //             temp[key] = util.clone(obj[key]);
    //             delete obj['isActiveClone'];
    //         }
    //     }

    //     return temp;
    // }

}


export const matrixToarray = function (a) {
    let _points = []; //将矩阵洗成 点位数组
    a.forEach(function (item) {
        _points.push([item[0][0], item[1][0]])
    });

    return _points;
}


// 将 16进制 颜色 转成 rgb 用于渐变 https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb

export const hex2rgb = function (val) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(val);
    //console.log('hex2rgb',result);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;

}

export const rgb2hex = function (r, g, b) {
    //console.log(r,g,b);
    //console.log('1666666',((1<<24)+(r<<16)+(g<<8)+b).toString(16));
    return ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).substr(1);// << 是javascript左移运算符 
    /**
     * 1<<24 是为了防止 在r 为0的时候 左移被忽略 所以添加一个1 来保底
     * 然后 r 占在最高位 所以 左移16位（这个 16位其实是 2进制里面左移） 以此类推
     */
}


export const objToArray = function (obj) { //对象的值转数组
    let _Arrays = [];
    // console.log(obj);
    // console.log( Object.keys(obj));
    Object.keys(obj).forEach(function (item) {
        _Arrays.push(obj[item]);
    });

    return _Arrays;
}


export const checkFormat = function (beChecked, template) {
    //校验格式的函数 专门校验 数据
}

export const getDetectPointOut = function (p1, p2, p3, lineWidth, center) {
    //获取斜率 根据函数线 求到平移 之后的点位 这里该写一篇文章
    // 外侧点
    let k1 = (p1[0] - p2[0]) / (p1[1] - p2[1]);
    let k2 = (p3[0] - p2[0]) / (p3[1] - p2[1]);
    let an1 = Math.atan(k1);
    let an2 = Math.atan(k2);

    let $x1, $x2, $y1, $y2;
    if (k1 > 0) {
        $x1 = p2[0] - Math.cos(an1) * lineWidth / 2;
        $x2 = p2[0] - Math.cos(an2) * lineWidth / 2;
        $y1 = p2[1] - Math.sin(an1) * lineWidth / 2;
        $y2 = p2[1] - Math.sin(an2) * lineWidth / 2;
    }

    if (k2 < 0) {
        $x1 = p2[0] - Math.cos(an1) * lineWidth / 2;
        $x2 = p2[0] - Math.cos(an2) * lineWidth / 2;
        $y1 = p2[1] + Math.sin(an1) * lineWidth / 2;
        $y2 = p2[1] + Math.sin(an2) * lineWidth / 2;
    }

    // console.log($x1, $x2, $y1, $y2);
    let b1 = $y1 - $x1 * k1;//算到b 
    let b2 = $y2 - $x2 * k2;

    let x = (b2 - b1) / (k1 - k2);//平移之后的相交点
    let y = k1 * x + b1;

    return [x, y];//

}

export const getDetectPointIn = function (p1, p2, p3, lineWidth, center) {
    //获取斜率 根据函数线 求到平移 之后的点位 这里该写一篇文章
    //内侧点
    let k1 = (p1[0] - p2[0]) / (p1[1] - p2[1]);
    let k2 = (p3[0] - p2[0]) / (p3[1] - p2[1]);
    let an1 = Math.atan(k1);
    let an2 = Math.atan(k2);

    let $x1, $x2, $y1, $y2;
    if (center[0] >= p2[0] && center[1] >= p2[1]) {
        $x1 = p2[0] + Math.cos(an1) * lineWidth / 2;
        $x2 = p2[0] + Math.cos(an2) * lineWidth / 2;
        $y1 = p2[1] + Math.sin(an1) * lineWidth / 2;
        $y2 = p2[1] + Math.sin(an2) * lineWidth / 2;
    }

    if (center[0] >= p2[0] && center[1] < p2[1]) {
        $x1 = p2[0] + Math.cos(an1) * lineWidth / 2;
        $x2 = p2[0] + Math.cos(an2) * lineWidth / 2;
        $y1 = p2[1] - Math.sin(an1) * lineWidth / 2;
        $y2 = p2[1] - Math.sin(an2) * lineWidth / 2;
    }

    if (center[0] < p2[0] && center[1] >= p2[1]) {
        $x1 = p2[0] - Math.cos(an1) * lineWidth / 2;
        $x2 = p2[0] - Math.cos(an2) * lineWidth / 2;
        $y1 = p2[1] + Math.sin(an1) * lineWidth / 2;
        $y2 = p2[1] + Math.sin(an2) * lineWidth / 2;
    }

    if (center[0] < p2[0] && center[1] < p2[1]) {
        $x1 = p2[0] - Math.cos(an1) * lineWidth / 2;
        $x2 = p2[0] - Math.cos(an2) * lineWidth / 2;
        $y1 = p2[1] - Math.sin(an1) * lineWidth / 2;
        $y2 = p2[1] - Math.sin(an2) * lineWidth / 2;
    }


    let b1 = $y1 - $x1 * k1;//算到b 
    let b2 = $y2 - $x2 * k2;

    let x = (b2 - b1) / (k1 - k2);//平移之后的相交点
    let y = k1 * x + b1;
    // let x = (-a*b + Math.sqrt(-Math.pow(b,2) + Math.pow(l,2) + Math.pow(a,2)*Math.pow(l,2)))/(1 + Math.pow(a,2))
    /**
     * (-a b + Sqrt[-b^2 + l^2 + a^2 l^2])/(1 + a^2)
     */
    return [x, y];
}


export const getDetectPointEdge = function (p1, p2, lineWidth, center) {
    //这里 是算两个 边界点的
    // 中心点只是用于 判断内侧 还是外侧用的 并不用于 具体点的计算
    /**
     * 但问题又来了 内侧 外侧怎么判定
     */

    let k1 = (p1[0] - p2[0]) / (p1[1] - p2[1]);
    let an1 = Math.atan(k1);

    let X1, Y1, X2, Y2, Xo, Yo, Xi, Yi;
    if (k1 > 0) {//斜率还要考虑 为无穷的时候
        X1 = p2[0] + Math.cos(an1) * lineWidth / 2;
        Y1 = p2[1] - Math.sin(an1) * lineWidth / 2;
        X2 = p2[0] - Math.cos(an1) * lineWidth / 2;
        Y2 = p2[1] + Math.sin(an1) * lineWidth / 2;
    } else {
        X1 = p2[0] - Math.cos(an1) * lineWidth / 2;
        Y1 = p2[1] + Math.sin(an1) * lineWidth / 2;
        X2 = p2[0] + Math.cos(an1) * lineWidth / 2;
        Y2 = p2[1] - Math.sin(an1) * lineWidth / 2;
    }

    let io = (Math.pow(X1 - center[0], 2) + Math.pow(Y1 - center[1], 2)
    ) >= (Math.pow(X2 - center[0], 2) + Math.pow(Y2 - center[1], 2));
    if (io) {
        Xo = X1;
        Yo = Y1;
        Xi = X2;
        Yi = Y2;
    } else {
        Xi = X1;
        Yi = Y1;
        Xo = X2;
        Yo = Y2;
    }

    return [
        [Xo, Yo],
        [Xi, Yi]
    ]

}