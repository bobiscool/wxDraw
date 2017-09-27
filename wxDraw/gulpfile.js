var gulp = require('gulp');
var concat = require('gulp-concat');
gulp.task('default',function(){
    gulp.src('./src/index.js').
         pipe(concat('wxdraw.js')).
         pipe(gulp.dest('./src/dist/'))
});