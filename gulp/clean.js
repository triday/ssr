const gulp = require('gulp');
const clean = require('gulp-clean');

gulp.task('clean-deploy', function () {
    return cleanByPattern('deploy');
});
gulp.task('clean-dist', function () {
    return cleanByPattern('dist');
});

gulp.task('clean-all', ['clean-deploy', 'clean-dist'], function () {

})
function cleanByPattern(pattern) {
    return gulp.src([pattern], { read: false })
        .pipe(clean());
}