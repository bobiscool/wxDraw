export const  Store = function (){
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

