//引入gulp模块
const gulp = require('gulp');
const fs = require('fs');
//引入 gulp-jshint
const jshint = require('gulp-jshint');
//引入 gulp-babel
const babel = require('gulp-babel');
//导入 browserify 和 rename 插件
const browserify = require('gulp-browserify');
const rename = require('gulp-rename');
//导入JS文件压缩插件
const uglify = require('gulp-uglify');
//导入 less 相关处理插件
const less = require('gulp-less');
const LessAutoprefix = require('less-plugin-autoprefix');
const autoprefix = new LessAutoprefix({browsers: ['last 10 versions']});//browsers 浏览器 last 2 versions最后两个版本
//导入  css 文件合并插件
const concat = require('gulp-concat');
//导入 css 文件压缩插件
const cssmin = require('gulp-cssmin');
//导入 html 压缩插件
const htmlmin = require('gulp-htmlmin');
//导入自动化插件
const livereload = require('gulp-livereload');
const connect = require('gulp-connect');
const opn = require('opn');

	//调用方法创建人物
gulp.task('hello', async () => {
    //自定义的代码
    console.log('hello gulp');
});

//配置任务检查代码
gulp.task('jshint', function () {
    // 将你的任务的任务代码放在这   * 是一个通配符, 匹配所有 .*
    return gulp.src('./src/js/*.js')
        .pipe(jshint({
            esversion: 6,
            undef: true,
            devel: true,
            eqeqeq: true,
            unused: true,
			globals: {
            	age: true,
			}

        }))
        .pipe(jshint.reporter('default')).pipe(livereload());//reporter 报告器
});

//配置代码转换任务
gulp.task('babel', () => {
    return gulp.src('./src/js/*.js')
        .pipe(babel({ //进行语法转换
            presets: ['@babel/env']
        })).pipe(gulp.dest('build/js')).pipe(livereload());//输出到指定目录  dest目的地
});

//配置文件合并的任务
gulp.task('browserify', function () {
    return gulp.src('./build/js/app.js')
        .pipe(browserify())
        .pipe(rename('built.js'))
        .pipe(gulp.dest('build/js'))
});

//任务合并 default 默认的意思
gulp.task('default', gulp.series('jshint', 'babel', 'browserify'));

//JS压缩合并
gulp.task('uglify', function () {
    return gulp.src('build/js/built.js')
        .pipe(uglify())  //压缩js
        .pipe(rename('dist.min.js'))
        .pipe(gulp.dest('dist/js')).pipe(livereload());
});

//less文件解析
gulp.task('less', function () {
    return gulp.src('./src/css/*.less')
        .pipe(less({
            plugins: [autoprefix]
        }))
        .pipe(gulp.dest('./build/css')).pipe(livereload());
});

//css文件的合并
gulp.task('concat', function () {
    return gulp.src('./build/css/*.css')
        .pipe(concat('built.css'))
        .pipe(gulp.dest('./build/css/concat')).pipe(livereload());
});

//CSS 文件压缩
gulp.task('cssmin', function () {
    return gulp.src('build/css/concat/built.css')
        .pipe(cssmin())
        .pipe(rename('dist.min.css'))
        .pipe(gulp.dest('dist/css')).pipe(livereload());
});

//HTML 文件压缩
gulp.task('htmlmin', () => {
    return gulp.src('src/index.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest('dist')).pipe(livereload());
});

gulp.task('watch', function () {
    livereload.listen();
    connect.server({
        root: 'dist',
        port: 3000,
        livereload: true
    });
    opn('http://localhost:3000/index.html');
    gulp.watch('src/css/*.less', gulp.series(['less', 'concat', 'cssmin']));
    gulp.watch('./src/js/*.js', gulp.series(['jshint', 'babel', 'browserify', 'uglify']));
    gulp.watch('./src/index.html', gulp.series('htmlmin'));
});