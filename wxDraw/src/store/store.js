export const  Store = function (){
   this.store = [];
}

Store.prototype = {
    add:function(shape){
        // 添加 图形
        console.log('------',shape.Shape.Option);
      this.store.push(shape);
    },
    update:function(){

    },
    delete:function(){

    },
    getLength:function(){
        return this.store.length;
    },
    find:function(a,b){
       let _tem = null;
       if(arguments.length==1){
            _tem=this.store[a];
       }

       if(arguments.length == 2){
          this.store.forEach(function(element) {
              if(element[a]==b){
                _tem = element;
              }
          }, this);
       }


       return _tem;
    }

}

