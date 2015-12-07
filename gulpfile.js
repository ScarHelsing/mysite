var gulp = require("gulp"),
	browserSync = require('browser-sync'),
	sass = require('gulp-sass');

gulp.task('server', function () {
	browserSync({
		port: 9000,
		server: {
			baseDir: 'app'
		}
	});
});

gulp.task('sass', function () {
	gulp.src('scss/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('app/css'));
});

gulp.task('watch', function () {
	gulp.watch([
		'app/*.html',
		'app/js/**/*.js',
		'scss/**/*.scss', ['sass']
	]).on('change', browserSync.reload);
});

gulp.task('default', ['server', 'sass', 'watch']);