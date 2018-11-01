var gulp = require('gulp');

// require other packages
var concat = require('gulp-concat');
var cssmin = require('gulp-clean-css');
var notifier = require('node-notifier');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

var msg = function( title, message ){
	notifier.notify({
		title: title,
		message: message
	});
};

// scripts task
gulp.task('scripts', function() {
	return gulp.src([
			'./src/js/modules/Gdz.Helpers.js',
			'./node_modules/jquery/dist/jquery.min.js',
			'./node_modules/mustache/mustache.min.js',
			'./node_modules/sortablejs/Sortable.min.js',
			// './node_modules/clipboard/dist/clipboard.min.js',
			'./src/js/modules/Gdz.Cookies.js',
			'./src/js/modules/Gdz.Panel.js',
			'./src/js/modules/Gdz.Tabs.js',
			'./src/js/modules/Gdz.Checkboxes.js',
			'./src/js/modules/Gdz.Global.js',
			'./src/js/modules/recentPaths.js',
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
});

// watch task
gulp.task('watch', function() {
	gulp.watch([
		'./src/js/*.js',
		'./src/js/**/*.js'
	], ['scripts'], msg( 'Javascript Build', 'Built app.js' ));
	gulp.watch([
		'./src/sass/*.scss',
		'./src/sass/**/*.scss'
	], ['styles'], msg( 'Sass Build', 'Built styles.css' ));
});

gulp.task('default', ['scripts', 'styles', 'watch']);
