'use strict';

var gulp = require('gulp'),
sass = require('gulp-sass'),
gutil = require('gulp-util'),
ftp = require( 'vinyl-ftp' ),
sourcemaps = require('gulp-sourcemaps'),
livereload = require('gulp-livereload');



gulp.task( 'ftp', function () {

	var conn = ftp.create( {
		host:     'hostname.com',
		user:     'username',
		password: '*********',
		//parallel: 10,
		log:      gutil.log
	} );

	var globs = [
	//'src/**',
	'css/**/*'
	//'js/**',
	//'fonts/**',
	//'index.html'
	];

    // using base = '.' will transfer everything to /public_html correctly 
    // turn off buffering in gulp.src for best performance 
    return gulp.src( globs, { base: '.', buffer: false } )    
    .pipe( conn.dest( '/remote_path/public/' ) )
    .pipe(gutil.noop());
});


gulp.task('sass', function () {
	gulp.src('./sass/**/*.scss')
	.pipe(sourcemaps.init())
	.pipe(sass().on('error', sass.logError))
	.pipe(sourcemaps.write('./maps'))
	.pipe(gulp.dest('./css'))
	.pipe(livereload());
	
});


gulp.task('watch', function () {
	console.log('Watch запустился');
	livereload.listen();
	//plugins.livereload.listen();

	gulp.watch('./sass/*.scss', ['sass']).on('change', livereload.changed);
	gulp.watch('./css/*.css', ['ftp']);

});



gulp.task('default', ['watch']);