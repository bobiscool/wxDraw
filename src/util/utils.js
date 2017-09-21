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


module.exports= {
   _getLocation:getLocation,
   _guid:guid
}