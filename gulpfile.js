var gulp         = require('gulp');
var concat       = require('gulp-concat');
var browserSync  = require('browser-sync').create();
var sass         = require('gulp-sass');
var uglify       = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');
var csscomb      = require('gulp-csscomb');

// Compile sass into CSS & auto-inject into browsers
gulp.task('css-compile', function() {
    return gulp.src("./scss/*.scss")
        .pipe(sass().on('error', sass.logError))
        .pipe(csscomb())
        .pipe(gulp.dest("build/css"))
        .pipe(browserSync.stream());
});
// process JS files and return the stream.
gulp.task('js-compile', function () {
    return gulp.src('js/*.js')
        .pipe(uglify())
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());
});

// Static Server + watching scss/html files
gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch("*.html").on("change", browserSync.reload);

});
//Autoprefixer Task
gulp.task('prefixer',function(){
    return gulp.src('build/css/main.css')
    .pipe(autoprefixer({
            browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1'],
            cascade: false
        }))
    .pipe(gulp.dest('dist'));
    });
//Watch Task
gulp.task('watch',function(){
    gulp.watch(['./scss/*.scss'],['css-compile']);
    gulp.watch(['build/css/main.css'],['prefixer']);
    });
gulp.task('default', ['serve','watch']);
