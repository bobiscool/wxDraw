/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-09-22 09:34:43 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-09-22 14:28:30
 * 
 * 工具库
 */



// import * as _ from "lodash"

function getLocation(x, y) {
    return {
        x: (x - canvas.getBoundingClientRect().left) > 0 ? (x - canvas.getBoundingClientRect().left) : 0,
        y: (y - canvas.getBoundingClientRect().top) > 0 ? (y - canvas.getBoundingClientRect().top) : 0,
    }
}

function guid(){
    var id = 0x9420dc;
    return function(){
        return id++;
    };
}




function arrLikeToArray(al) {
    let len = al.length;
    let temArray = [];
    if (len > 0) {
        for (var i = 0; i < len; i++) {
            temArray.push(al[i])
        }
    }
    return temArray;
}
var util = {

    mix(target, source, overlay) {
        //混合
        target = 'prototype' in target ? target.prototype : target;
        source = 'prototype' in source ? source.prototype : source;

        this.extend(target, source, overlay);

    },
    extend(target, source, overlay) {
        for (var key in source) {
            if (source.hasOwnProperty(key)
                && (overlay ? source[key] != null : target[key] == null)
            ) {
                target[key] = source[key];
            }
        }
        return target;
    },
}

module.exports= {
   _getLocation:getLocation,
   _guid:guid,
   util:util
}