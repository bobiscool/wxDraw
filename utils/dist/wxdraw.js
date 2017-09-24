/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-09-21 13:47:34 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-09-22 10:18:17
 * 主要 引入对象
 * 
 * 
 */

var  uitl = __webpack_require__(2);
var  Store = __webpack_require__(3).Store;



function WxDraw(canvas){
    this._canvas = canvas;
    this._wcid = util._guid()
    this.store = new Store();
}

WxDraw.prototype = {
    add:function(item){
         this.store.add(item);
    },
    draw:function(){
        this.store.store.forEach(function(item) {
            item.paint();
        }, this);
    }    
}

module.exports = {
    WxDraw:WxDraw
}

/***/ }),
/* 2 */
/***/ (function(module, exports) {

/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-09-22 09:34:43 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-09-22 10:15:38
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
// var UTIL = {

//     mix(target, source, overlay) {
//         //混合
//         target = 'prototype' in target ? target.prototype : target;
//         source = 'prototype' in source ? source.prototype : source;

//         this.extend(target, source, overlay);

//     },
//     extend(target, source, overlay) {
//         for (var key in source) {
//             if (source.hasOwnProperty(key)
//                 && (overlay ? source[key] != null : target[key] == null)
//             ) {
//                 target[key] = source[key];
//             }
//         }
//         return target;
//     },
//     cloMix(target, source) {
//         let _tem = _.cloneDeep(target);
//         return _.extend(_tem,source);
//     }
// }

module.exports= {
   _getLocation:getLocation,
   _guid:guid
}

/***/ }),
/* 3 */
/***/ (function(module, exports) {

function Store(){
   this.store = [];
}

Store.prototype = {
    add:function(shape){
        // 添加 图形
      this.store.push(shape);
    },
    update:function(){

    },
    delete:function(){

    },

}

module.exports = {
    Store:Store
}

/***/ })
/******/ ]);