var gulp 		= require('gulp'),
	gutil		= require('gulp-util'),
	browserify	= require('gulp-browserify'),
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
	//'process/scripts/jquery-2.1.4.min.js',
	'process/scripts/renderTab.js',
	'process/scripts/uiInteract.js'
];

gulp.task('js', function(){
	gulp.src(jsSources)
		.pipe(concat('scripts.js'))
		.pipe(browserify())
		.pipe(gulp.dest('builds/development/js'));
});