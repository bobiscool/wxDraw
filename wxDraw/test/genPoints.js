let points =[];
var fs = require('fs');

function genPoints(x,y,n){
    for(var i=0;i<n;i++){
        points.push([Math.random()*x,Math.random()*y])
    }

    fs.writeFile('./points',JSON.stringify(points),function(err){
        console.log('ok!');
    })
}

genPoints(300,500,60);