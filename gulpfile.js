// Stop if there are some problems
"use strict";

var gulp = require("gulp"),
		browserSync = require('browser-sync'),
		autoprefixer = require('gulp-autoprefixer'),
		sass = require('gulp-sass');


gulp.task('server', ['sass'], function() {
	browserSync.init({
		server: "./app"
	});
	gulp.watch("scss/*.scss", ['sass']);
	gulp.watch([
		'html/*.html',
		'app/css/**/*.css',
		'app/js/*.js'
	]).on('change', browserSync.reload);
});


gulp.task('sass', function () {
	gulp.src('scss/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(gulp.dest('app/css'));
});

gulp.task('default', ['server', 'sass']);