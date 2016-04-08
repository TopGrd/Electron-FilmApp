var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');

gulp.task('js', function() {
	return gulp.src(['scripts/**/*.js'])
		.pipe(concat('controller.js'))
		.pipe(gulp.dest('dist'));
});

gulp.task('watch:js', ['js'], function() {
	gulp.watch('ng/**/*.js', ['js']);
});

gulp.task('default', ['js']);
