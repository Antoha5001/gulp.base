const { src, dest, parallel, watch } = require('gulp');  // инициализация, подключение модуля
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

function css() {
   return src(cssFiles)
       .pipe(concat('style.css'))
       .pipe(autoprefixer({
           browsers: ['last 2 versions'],
           cascade: false
       }))
       .pipe(cleanCSS({level: 2}))
       .pipe(dest('./build/css/'))
       .pipe(browserSync.stream());
}

function scripts() {
    return src(jsFiles)
        .pipe(concat('script.js'))
        .pipe(uglify({toplevel: true}))
        .pipe(dest('./build/js/'))
        .pipe(browserSync.stream());
}

function watchAll(){

    browserSync.init({
            proxy: "gulp.base"
    });

    watch('./src/css/**/*.css', css);
    watch('./src/js/**/*.js', scripts);
    // gulp.watch('./*.php').on('change', browserSync.reload);
    watch('./*.html').on('change', browserSync.reload);
}

function clean(){
    return del(['build/*']);
}

// gulp.task('styles', css);
// gulp.task('scripts', scripts);
exports.css = css;
exports.scripts = scripts;
exports.watch = watchAll;

// gulp.task('watch', watchAll);

// gulp.task('build', gulp.series(clean, parallel(styles,scripts)) );
// gulp.task('dev', gulp.series('build', 'watch') );

function defaultTask(cb) {
    cb();
    // console.log('hello');
}
exports.default = watchAll;