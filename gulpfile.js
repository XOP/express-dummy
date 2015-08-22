var gulp = require('gulp');

// auto-load gulp-* plugins
var $ = require('gulp-load-plugins')();

//
// all others
var del = require('del');
var autoprefixer = require('autoprefixer-stylus');

var browserSync = require('browser-sync');
var reload = browserSync.reload;
var merge = require('merge2');
var runSequence = require('run-sequence');

var config = require('./config.json');
var paths = config.paths;
var production = $.util.env.p || $.util.env.prod;

// autoprefixer settings
var Browsers = ['last 2 versions'];

var templateData = require('./data.json');

var stylusOptions = {
    use: [autoprefixer({browsers: Browsers})],
    paths: [paths.css.src],
    import: ['_vars']
};


//
// styles

gulp.task('styles', function () {
    return merge(

        // normalize
        gulp.src('node_modules/normalize.css/normalize.css'),

        // vendor css
        gulp.src('node_modules/skeleton.css/skeleton.css'),

        // custom css
        gulp.src([
                '!' + paths.css.src + '/**/_*.*',
                paths.css.src + '/**/*.styl'
            ])
            .pipe($.plumber())
            .pipe($.stylus(stylusOptions))
            .pipe($.concatCss('all.css'))
        )
        .pipe($.plumber())
        .pipe($.concatCss('main.css'))
        .pipe(production ? $.minifyCss() : $.util.noop())
        .pipe(gulp.dest(paths.css.dest));
});


//
// scripts

// vendor | no-minification
gulp.task('scripts-vendor', function(){
    return gulp.src([
            paths.js.src + '/vendor/**/*.js',
            'node_modules/zepto/zepto.min.js'
        ])
        .pipe(gulp.dest('public/js/vendor/'));
});

// custom
gulp.task('scripts-custom', function(){
    return gulp.src(paths.js.src + '/*.js')
        .pipe($.plumber())
        .pipe($.concat('main.js'))
        .pipe(production ? $.uglify() : $.util.noop())
        .pipe(gulp.dest(paths.js.dest));
});

// main js only
gulp.task('scripts-main', function(){
    return gulp.src(paths.js.src + '/*.js')
        .pipe($.plumber())
        .pipe($.concat('main.js'))
        .pipe(production ? $.uglify() : $.util.noop())
        .pipe(gulp.dest(paths.js.dest));
});

gulp.task('scripts', ['scripts-vendor', 'scripts-custom'], function(){
    reload();
});

//
// html
//gulp.task('html', function(){
//    return gulp.src('src/index.html')
//        .pipe(gulp.dest('public/'));
//});

// compile EJS templates
//gulp.task('html', function(){
//    return gulp.src('views/*.ejs')
//        .pipe($.ejs(templateData))
//        .pipe(gulp.dest('public/'));
//});

//
// data
//gulp.task('data', function(){
//    return gulp.src('src/*.json')
//        .pipe(gulp.dest('public/'));
//});


//
// images
gulp.task('images', function(){
    return gulp.src(paths.img.src + '/**')
        .pipe(gulp.dest(paths.img.dest));
});

gulp.task('favicon', function(){
    return gulp.src('favicon.ico')
        .pipe(gulp.dest('public/'));
});


//
// browser sync
gulp.task('sync', ['nodemon'], function(){
    browserSync.init(null, {
        proxy: "http://localhost:" + config.port,
        files: ["public/**/*.*"],
        port: config.port + 1000
//        , logLevel: "debug"
    });
});

//
// nodemon
gulp.task('nodemon', function (cb) {
    var called = false;
    return $.nodemon({script: 'app.js'}).on('start', function () {
        if (!called) {
            called = true;
            cb();
        }
    });
});

gulp.task('bs-reload', function(){
    reload();
});


//
// browser sync
// static version - you won't need nodemon
//gulp.task('sync', function(){
//    browserSync.init({
//        server: {
//            baseDir: "./public"
//        },
//        files: ["public/**/*.*"],
//        port: config.port
////        , logLevel: "debug"
//    });
//});


//
// cleanup
gulp.task('clean', function(cb){
    return del([
//        'public/*.html',
//        'public/*.json'
        paths.css.dest,
        paths.js.dest,
        paths.img.dest,
        'public/*.ico'
    ], cb);
});


//
// build
gulp.task('build', ['clean'], function(){
    return runSequence(
//        'html',
//        'data',
        'images',
        'favicon',
        'styles',
        'scripts'
    );
});


//
// publish
gulp.task('publish', function(){
    gulp.src([
//            '!./public/exclude.me',
            './public/**'
        ])
        .pipe($.zip('project.zip'))
        .pipe(gulp.dest('./'));
});


//
// default
gulp.task('default', ['build'], function(){
    runSequence(
        'sync',
        function(){
//            gulp.watch('./src/*.html', ['html']);
            gulp.watch('./data.json', ['bs-reload']);
//            gulp.watch('./templates/**/*.*', ['templates']);
            gulp.watch('./' + paths.js.src + '/**/*.js', ['scripts-all']);
            gulp.watch('./views/**/*.ejs', ['bs-reload']);
            gulp.watch('./' + paths.css.src + '/**/*.styl', ['styles']);
        });
});
