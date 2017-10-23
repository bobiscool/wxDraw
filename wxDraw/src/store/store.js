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
    },
    changeIndex:function(obj,oldIndex,index){
        // let _tem,_temIndex;
        //   this.store.forEach(function(element,index) {
        //       if(element[type]==val){
        //         _tem = element;
        //         _temIndex = index;
        //       }
        //   }, this);
         
          this.store.splice(oldIndex,1);
          this.store.splice(index,0,obj);
    }

}

