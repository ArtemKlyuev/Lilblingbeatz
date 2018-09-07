'use strict';

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const combiner = require('stream-combiner2').obj;

module.exports = function (options) {
	return function () {
		return combiner(
			gulp.src(['src/js/**/scrolloverflow.min.js', 'src/js/**/jquery.fullpage.min.js']),
			$.concat('libs.js'),
			$.if(!isDev, $.uglify()),
			$.if(!isDev, $.rev()),
			gulp.dest('build/js'),
			$.if(!isDev, $.rev.manifest('manifest/js.json', {
				base: 'manifest',
				merge: true
			})),
			$.if(!isDev, gulp.dest('manifest'))
		).on('error', $.notify.onError(function (err) {
			return {
				title: 'Scripts-libs',
				message: err.message
			};
		}));
	};
};