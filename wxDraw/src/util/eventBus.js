/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-09-29 15:33:40 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-10-07 14:19:25
 * 事件对象
 * 
 */



export const eventBus = function () {
    this.eventList = [];
}
eventBus.prototype = {
    add: function (name, event) {
        //添加事件 初始化事件

        if (!this.eventList.length) {
            this.eventList.push({
                name: name,
                thingsList: [event]
            })
        }

        this.eventList.forEach(function (ele) {
            if (ele.name === name) {
                ele.thingsList.push(event);
            } else {
                this.eventList.push({
                    name: name,
                    thingsList: [event]
                })
            }
        }, this);
    },
    dispatch: function (name, scope) {
        //执行事件 这里有两种状况  执行最外层或者是事件添加层 的scope 或者是 当地的scope


        var _temArgu = arguments;



        if (arguments.length < 2) {
            return false;
        }

        let _params = Array.prototype.slice.call(_temArgu, 1);

        this.eventList.forEach(function (ele) {
            if (ele.name === name) {
                this.eventList.forEach(function (_ele) {
                    if (scope !== "no") {
                        _ele.call(scope, params)
                    } else {
                        _ele(params);
                    }

                    //  TODO 添加 解构 

                });
            }
        });
    },
    destroy: function () {
        // 取消事件
    }
}
