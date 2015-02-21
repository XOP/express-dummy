var gulp = require('gulp');

var del = require('del');
var sass = require('gulp-sass');

var paths = require('./config.json').paths;

var normPath = function(path){
    return '.' + path;
};

//
// sass
gulp.task('sass', function(){
    return gulp.src(normPath(paths.css.in))
        .pipe(sass())
        .pipe(gulp.dest(normPath(paths.css.out)));
});

//
// cleanup
gulp.task('clean', function(){
    del([normPath(paths.css.out)]);
});

//
// default
gulp.task('default', ['clean', 'sass'], function(){
    gulp.watch(normPath(paths.css.in), ['sass']);
});
