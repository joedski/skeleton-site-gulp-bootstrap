'use strict';

let path = require( 'path' );

let gulp = require( 'gulp' );
let less = require( 'gulp-less' );
let sourcemaps = require( 'gulp-sourcemaps' );

var LessAutoprefix = require( 'less-plugin-autoprefix' );
var autoprefix = new LessAutoprefix({ browsers: [ 'last 2 versions' ] });



//////// General

gulp.task( 'default', [ 'site' ]);
gulp.task( 'watch', [ 'watch-site' ]);

gulp.task( 'site', [
	'site:assets',
	'site:styles',
]);

gulp.task( 'watch-site', () => {
	gulp.watch([ 'source/assets/**/*' ], [
		'site:assets:site',
	]);

	gulp.watch([ 'source/styles/**/*' ], [
		'site:styles',
	]);
});



//////// Assets

gulp.task( 'site:assets', [
	'site:assets:site',
	'site:assets:jquery',
	'site:assets:bootstrap:scripts',
	'site:assets:bootstrap:fonts',
]);

gulp.task( 'site:assets:site', () => {
	return gulp.src([ 'source/assets/**/*' ])
		.pipe( gulp.dest( 'public' ) )
		;
});

gulp.task( 'site:assets:jquery', () => {
	return gulp.src([
		'node_modules/jquery/dist/jquery.min.js',
	], { base: 'node_modules/jquery/dist' })
		.pipe( gulp.dest( 'public/scripts' ) )
		;
})

gulp.task( 'site:assets:bootstrap:scripts', () => {
	return gulp.src([
		'node_modules/bootstrap/dist/js/bootstrap.min.js',
	], { base: 'node_modules/bootstrap/dist/js' })
		.pipe( gulp.dest( 'public/scripts' ) )
		;
});

gulp.task( 'site:assets:bootstrap:fonts', () => {
	return gulp.src([ 'node_modules/bootstrap/dist/fonts/**/*' ])
		.pipe( gulp.dest( 'public/fonts' ) )
		;
});



//////// Styles

gulp.task( 'site:styles', () => {
	return gulp.src([ 'source/styles/bootstrap.less' ], { base: 'source/styles' })
		.pipe( sourcemaps.init() )
		.pipe( less({
			paths: [
				path.join( __dirname, 'node_modules', 'bootstrap', 'less' )
			],
			plugins: [ autoprefix ]
		}))
		.pipe( sourcemaps.write( './' ) )
		.pipe( gulp.dest( 'public/styles' ) )
		;
});
