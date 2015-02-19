var gulp = require("gulp");
var config = {
  distJs: "demo/js",
  distHtml: "demo/",
  distCss: "demo/css"

};

gulp.task('copy', function() {
  gulp.src("src/index.js")
    .pipe(gulp.dest(config.distJs));

  gulp.src("src/onenterframe.js")
    .pipe(gulp.dest(config.distJs));
});

gulp.task('default', ['copy']);

