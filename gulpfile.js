// Stop if there are some problems
"use strict";

var gulp = require('gulp'),
	minifyCss = require('gulp-minify-css'),
	notify = require('gulp-notify'),
	autoprefixer = require('gulp-autoprefixer'),
	connect = require('gulp-connect'),
	livereload = require('gulp-livereload'),
	sass = require('gulp-sass'),
	minifyHTML= require('gulp-minify-html'),
	concat = require('gulp-concat'),
	concatCss = require('gulp-concat-css'),
	uglify = require('gulp-uglify'),
	spritesmith = require('gulp.spritesmith');

// sprite
	gulp.task('sprite', function () {
		var spriteData = gulp.src('images/png/*.png').pipe(spritesmith({
			imgName: 'sprite.png',
			cssName: 'sprite.css',
			padding: 5
		}));
		return spriteData.pipe(gulp.dest('img/'));
	});

// server connect
gulp.task('connect', function() {
	connect.server({
		root: 'app',
		livereload: true
	});
});

// html
gulp.task('html', function() {
	return gulp.src('*.html')
	.pipe(gulp.dest('app'))
	.pipe(connect.reload())
});

// scss
gulp.task('scss', function () {
	return gulp.src('scss/*.scss')
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(gulp.dest('scss/css'))
});

// concat and minify css
gulp.task('css', function () {
	return gulp.src('scss/css/*.css')
		.pipe(concatCss('style.min.css'))
		.pipe(minifyCss('style.min.css'))
		.pipe(gulp.dest('app/css'))
		.pipe(connect.reload())
});

// js
gulp.task('js', function() {
	return gulp.src('js/*.js')
		.pipe(concat('all.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('app/js/'))
		.pipe(connect.reload())
});

// watch
gulp.task('watch', function (){
	gulp.watch('scss/*.scss', ['scss', 'css'])
	gulp.watch('*.html', ['html'])
	gulp.watch('js/*js', ['js'])
});

// default
gulp.task('default', ['connect', 'html', 'scss', 'css', 'js', 'watch']);