- store
- animation
- painter
- handler
- bus [use signal js ? how ? why use it]



TODO 
- base shape
    - rect
    - arc
    - polygon
    - img
- drag
- event 
  - click 
  - touch
  - hover




##### animationFrame是暴露给用户还是自己内部调用？？？

##### 终于明白 eventBus 在这里的作用了。。。 
- 父级 调子集 可以直接调用 但是自己没法调用父集 那就可以。。。把父集穿进去  或者 把bus传进去


##### 动画延续性
animate之后 如何继续调animate？ 在目标模式下不会有什么 问题 直接按照目标来就行了，但是在自增模式下就会有问题所以动画渲染上 不能拿直接就push进数组 然后开始动画，应该有一个专门的动画
排队器，如果是
  - 同时调用 那就是平级动画
  - 链式调用那就是 顺序动画

### eventbus简直不要太好用 ！！！


- 拖拽层级
- 碰撞检测
- 物体多维动画
  - 简单多维
- 颜色渐变动画