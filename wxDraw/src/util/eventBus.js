/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-09-29 15:33:40 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-10-09 18:47:46
 * 事件对象
 * 
 */



export const eventBus = function () {
    this.eventList = [];
}
eventBus.prototype = {
    add: function (name, scope, event) {
        //添加事件 初始化事件
        console.log('添加' + name);
        if (this.eventList.length) {
            this.eventList.forEach(function (ele) {
                if (ele.name == name) {
                    ele.thingsList.push(event);//如果已经有了这个事件 那就 存list 并且退出程序
                    return false;
                }
            }, this);
           // 如果没有 那就再造一个
            this.eventList.push({
                name: name,
                scope: scope,
                thingsList: [event]
            });

        } else {
            this.eventList.push({
                name: name,
                scope: scope,
                thingsList: [event]
            });
        }




        console.log(this.eventList);
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
                console.log('触发' + name);
                ele.thingsList.forEach(function (_ele) {
                    if (scope !== "no") {
                        _ele.call(scope, ..._params)
                    } else {
                        _ele.call(ele.scope, ..._params);
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
