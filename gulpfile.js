const gulp = require('gulp');  // инициализация, подключение модуля
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const del = require('del');
const browserSync = require('browser-sync').create();

const cssFiles = [
    "./node_modules/normalize.css/normalize.css",
    "./src/css/some.css",
    "./src/css/other.css"];
const jsFiles = [
    "./src/js/style.js",
    "./src/js/other.js"];

function hello() {
    return console.log('hello');
}

function styles() {
   return gulp.src(cssFiles)
       .pipe(concat('style.css'))
       .pipe(autoprefixer({
           browsers: ['last 2 versions'],
           cascade: false
       }))
       .pipe(cleanCSS({level: 2}))
       .pipe(gulp.dest('./build/css/'))
       .pipe(browserSync.stream());
}

function scripts() {
    return gulp.src(jsFiles)
        .pipe(concat('script.js'))
        .pipe(uglify({toplevel: true}))
        .pipe(gulp.dest('./build/js/'))
        .pipe(browserSync.stream());
}

function watch(){

    browserSync.init({
            proxy: "gulp-2018.base"
    });

    gulp.watch('./src/css/**/*.css', styles);
    gulp.watch('./src/js/**/*.js', scripts);
    gulp.watch('./*.php').on('change', browserSync.reload);
}

function clean(){
    return del(['build/*']);
}

gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('watch', watch);

gulp.task('build', gulp.series(clean, gulp.parallel(styles,scripts)) );
gulp.task('dev', gulp.series('build', 'watch') );

function defaultTask(cb) {
    cb();
    // console.log('hello');
}
exports.default = watch;