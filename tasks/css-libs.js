'use strict';

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const combiner = require('stream-combiner2').obj;

module.exports = function () {
	return function () {
		return combiner(
			gulp.src('src/sass/libs.scss'),

			$.if(isDev, $.sourcemaps.init()),
			$.sass(),
			//$.if(!isDev, $.purifycss(['build/index.html', 'build/js/**/*.js'])),
			$.if(!isDev, $.cssnano()),
			$.if(isDev, $.sourcemaps.write()),
			$.if(!isDev, $.rev()),
			//.pipe(gp.$.cached('css-libs:dev'))
			//$.remember())
			gulp.dest('build/css'),
			$.if(!isDev, $.rev.manifest('manifest/css.json', {
				base: 'manifest',
				merge: true,

			})),
			$.if(!isDev, gulp.dest('manifest'))
		).on('error', $.notify.onError(function (err) {
			return {
				title: 'CSSlibs',
				message: err.message
			};
		}));
	};
};
