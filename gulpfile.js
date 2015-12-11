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
		'app/*.html',
		'app/js/*.js'
		]).on('change', browserSync.reload);
});


gulp.task('sass', function () {
	gulp.src('scss/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.stream());
});

gulp.task('default', ['server', 'sass'], browserSync.reload);