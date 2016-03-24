var gulp = require('gulp');

// #################### 這邊是變數宣告 ####################

// ----- 開 web server 用 ------
var webserver = require('gulp-webserver');

// ----- 打包 scss 用 ------
var sass = require('gulp-sass'); // Requires the gulp-sass plugin
var sourcemaps = require('gulp-sourcemaps');
var gulpPlumber = require('gulp-plumber'); // 載入 gulp-plumber
// var autoprefixer = require('gulp-autoprefixer'); // 載入 gulp-autoprefixer
var $ = require('gulp-load-plugins')();

// #################### 變數宣告結束 ####################
var sassPaths = [
    './source/foundation-sites/scss',
    './source/motion-ui/src'
];

gulp.task('sass', function() {
    return gulp.src('./scss/*.scss')
        .pipe(gulpPlumber())
        .pipe(sourcemaps.init())
        .pipe($.sass({
                includePaths: sassPaths,
                outputStyle: 'compressed'
            })
            .on('error', $.sass.logError))
        .pipe($.autoprefixer({
            browsers: ['last 2 versions', 'ie >= 9']
        }))
        .pipe(sourcemaps.write('.')) //'./dist/public/css', {addComment: false}
        .pipe(gulp.dest('./dist/public/css'));
});

gulp.task('sass:watch', function() {
    gulp.watch('./source/scss/**/*.scss', ['sass']);
});

// 開啟一個 web service
gulp.task('webserver', function() {
    gulp.src('./')
        .pipe(webserver({
            port: 2016,
            livereload: true,
            directoryListing: false,
            open: true,
            fallback: 'index.html'
        }));
});


// gulp.task('default', ['sass']);
gulp.task('default', ['sass', 'sass:watch', 'webserver']);
