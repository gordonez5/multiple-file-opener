'use strict';

var gulp = require('gulp');

// require other packages
var concat = require('gulp-concat');
var cssmin = require('gulp-minify-css');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');


// scripts task
gulp.task('scripts', function() {
	return gulp.src([
		'./src/js/vendor/libraries/*.js',
		'./src/js/modules/Gdz.Helpers.js',
		'./src/js/modules/Gdz.Cookies.js',
		'./src/js/modules/Gdz.Panel.js',
		'./src/js/modules/Gdz.Global.js',
		// './src/js/vendor/plugins/responsive-nav.js',
		// './src/js/vendor/plugins/fastclick.js',
		// './src/js/vendor/plugins/scroll.js',
		// './src/js/vendor/plugins/fixed-responsive-nav.js',
		// './src/js/vendor/plugins/spamless.js',
		// './src/js/vendor/plugins/chart.js',
		// './src/js/modules/*.js',
		'./src/js/main.js'
		])
		.pipe(concat('app.js'))
		.pipe(gulp.dest('./dist/js/'))
		.pipe(uglify().on('error', function(e) { console.log('\x07',e.message); return this.end(); }))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('./dist/js/'));
});

// styles task
gulp.task('styles', function() {
	return gulp.src('./src/sass/*.scss')
		.pipe(sass({
			includePaths: ['./src/sass'],
			outputStyle: 'expanded'
		}))
		.pipe(gulp.dest('./dist/css/'))
		.pipe(sourcemaps.init())
		.pipe(cssmin({compatibility: 'ie8'}))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest('./dist/css/'));
});

// critical styles task
gulp.task('critical', function() {
	return gulp.src('./src/sass/base/critical.scss')
		.pipe(sass({includePaths: ['./src/sass/base'], outputStyle: 'expanded'}))
		.pipe(gulp.dest('./dist/css/'));
		// .pipe(sourcemaps.init())
		// .pipe(cssmin({compatibility: 'ie8'}))
		// .pipe(rename({
			// suffix: '.min'
		// }))
		// .pipe(sourcemaps.write('../maps'))
		// .pipe(gulp.dest('./dist/css/'));
});

// watch task
gulp.task('watch', function() {
	gulp.watch([
		'./src/js/*.js',
		'./src/js/**/*.js'
	], ['scripts']);
	gulp.watch([
		'./src/sass/*.scss',
		'./src/sass/**/*.scss'
	], ['styles']);
});

gulp.task('default', ['scripts', 'styles', 'watch']);