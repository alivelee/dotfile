var gulp = require("gulp");
var babel = require("gulp-babel");
var browserify = require('gulp-browserify');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;
gulp.task("es6", function () {
  return gulp.src("src/*.js")
    .pipe(babel())
    .pipe(browserify({
          insertGlobals : true,
        }))
    .pipe(gulp.dest("dist"));
});

gulp.task("js-watch", ["es6"], browserSync.reload);


gulp.task("serve",["es6"],function(){
	browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch("src/*.js", ['js-watch']);
});
gulp.task("watch",function(){
	gulp.watch(["src/app.js"],["es6"],["serve"]);
});

gulp.task("default",["serve","watch"]);