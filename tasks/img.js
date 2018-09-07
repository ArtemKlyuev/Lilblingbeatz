'use strict';

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const combiner = require('stream-combiner2').obj;

module.exports = function (options) {

	return function () {
		return combiner(
			gulp.src(['src/img/**/*.{png,jpg,jpeg,gif}', '!src/img/png_sprites', '!src/img/icons'], {
				since: gulp.lastRun('img')
			}),
			$.if(!isDev, $.tinypngCompress({
				key: '',
				summarise: true,
				sigFile: 'src/img/.tinypng-sigs',
				log: true
			})),
			$.newer('build/img/'),
			$.debug({
				title: 'img'
			}),
			gulp.dest('build/img/'),
			gulp.src(['src/img/**/*.{ico,svg}', '!src/img/png_sprites', '!src/img/icons'], {
				since: gulp.lastRun('img')
			}),
			$.newer('build/img/'),
			$.debug({
				title: 'img'
			}),
			gulp.dest('build/img/')
		).on('error', $.notify.onError(function (err) {
			return {
				title: 'IMG',
				message: err.message
			};
		}));
	};

};