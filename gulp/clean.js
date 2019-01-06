const gulp = require('gulp');
const clean = require('gulp-clean');


gulp.task('clean-lib', function () {
    return cleanByPattern('lib');
});

gulp.task('clean-all', ['clean-lib'], function () {

})
function cleanByPattern(pattern) {
    return gulp.src([pattern], { read: false })
        .pipe(clean());
}