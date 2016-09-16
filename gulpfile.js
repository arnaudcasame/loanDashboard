var gulp 		= require('gulp'),
	gutil		= require('gulp-util'),
	browserify	= require('gulp-browserify'),
	compass		= require('gulp-compass'),
	concat		= require('gulp-concat');

	gulp.task('log', function(){
		gutil.log('Am I there guys?');
	});

var jsSources = [
	'process/scripts/dsm.js',
	'process/scripts/Chart.bundle.min.js',
	'process/scripts/annuite.js',
	'process/scripts/calendar.js',
	'process/scripts/currency_format.js',
	'process/scripts/ajax.js',
	'process/scripts/renderTab.js',
	'process/scripts/uiInteract.js'
];

var sassSources = ['process/sass/style.scss'];

gulp.task('js', function(){
	gulp.src(jsSources)
		.pipe(concat('scripts.js'))
		.pipe(browserify())
		.pipe(gulp.dest('builds/development/js'));
});

gulp.task('compass', function(){
	gulp.src(sassSources)
		.pipe(compass({
			sass: 'process/sass',
			images: 'builds/development/img',
			style: 'expanded'
		})
			.on('error', gutil.log))
		.pipe(gulp.dest('builds/development/css'));
});

gulp.task('default', ['js', 'compass']);