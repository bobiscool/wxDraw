 clone = function (obj) {
        let _obj = {};
        function _stringify(obj) {
            let _obj = {};
            for (var key in obj) {
                if (obj.hasOwnProperty(key) && typeof obj[key] !== 'object') {
                    _obj[key] == obj[key];
                } else {
                    
                    _obj[key] = _stringify(obj[key])
                }
            }

            return (_obj);
        }

        return _stringify(obj)
    }


 var a = {
     a:{sss:{sss:{sss:2}}}
 }   


 let b = clone(a);

 console.log(b==a);