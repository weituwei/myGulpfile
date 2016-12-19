//var elixir = require('laravel-elixir');
/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Less
 | file for our application, as well as publishing vendor resources.
 |
 */

// elixir(function(mix) {
//     mix.less('app.less');
// });

//引入gulp和gulp插件
var gulp = require('gulp'),
    runSequence = require('run-sequence'),//使task同步执行（gulp的task都是并行(异步)执行）
    rev = require('gulp-rev'),//把静态文件名改成hash的形式
    revCollector = require('gulp-rev-collector');//替换 HTML 中的路径,到线上环境前，配合gulp-rev使用



//CSS生成文件hash编码并生成 rev-manifest.json文件名对照映射
gulp.task('revCss', function(){
    return gulp.src('resources/assets/css/*.css')
        .pipe(rev())
        .pipe(gulp.dest('public/css'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('public/css'));
});

//js生成文件hash编码并生成 rev-manifest.json文件名对照映射
gulp.task('revJs', function(){
    return gulp.src('resources/assets/js/*.js')
        .pipe(rev())
        .pipe(gulp.dest('public/js'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('public/js'));
});

//Html替换css、js文件版本
gulp.task('revHtml', function () {
    return gulp.src(["public/**/*.json","resources/views/*.php"])
        .pipe(revCollector())
        .pipe(gulp.dest('resources/views'));
});

//开发构建
gulp.task('dev', function (done) {
    condition = false;
    runSequence(
        ['revCss'],
        ['revJs'],
        ['revHtml'],
        done);
});


gulp.task('default', ['dev']);