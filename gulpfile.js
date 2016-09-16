var gulp 		= require('gulp'),
	gutil		= require('gulp-util'),
	browserify	= require('gulp-browserify'),
	connect		= require('gulp-connect'),
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
var htmlSources = ['builds/development/*.html'];

gulp.task('js', function(){
	gulp.src(jsSources)
		.pipe(concat('scripts.js'))
		.pipe(browserify())
		.pipe(gulp.dest('builds/development/js'))
		.pipe(connect.reload());
});

gulp.task('compass', function(){
	gulp.src(sassSources)
		.pipe(compass({
			sass: 'process/sass',
			images: 'builds/development/img',
			style: 'expanded'
		})
			.on('error', gutil.log))
		.pipe(gulp.dest('builds/development/css'))
		.pipe(connect.reload());
});

gulp.task('watch', function(){
	gulp.watch(jsSources, ['js']);
	gulp.watch('process/sass/*.scss', ['compass']);
	gulp.watch(htmlSources, ['html']);
});

gulp.task('html', function(){
	gulp.src(htmlSources)
	.pipe(connect.reload());
});

gulp.task('connect', function(){
	connect.server({
		root: 'builds/development/',
		livereload: true
	});
});

gulp.task('default', ['js', 'compass', 'html', 'connect', 'watch']);