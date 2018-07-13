/*
 * @Author: Thunderball.Wu 
 * @Date: 2018-07-13 23:45:02 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2018-07-13 23:53:47
 */
import { commonAttr, commonUnAttr } from './commonAttr.js'; //共有属性
 export const defaultConfig = {
     'circle': {
        option:{
            x: 10,
            y: 10,
            r: 10,
            sA: 0,
            eA: Math.PI * 2,
            ...commonAttr()
        },
        uoption: {
            ...commonUnAttr(),
            counterclockwise: false, //这个还没用,
            closePath: false
        }
      }
 }