'use strict';

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const combiner = require('stream-combiner2').obj;

module.exports = function (options) {

	return function () {
		const spriteData = gulp.src('src/img/png_sprites/3/*.png').pipe($.spritesmith({
			imgName: 'sprite2.png',
			cssName: '_png-sprite2.scss',
			imgPath: '../img/general/sprite2.png'
		}));


		const imgStream = spriteData.img.pipe($.if(!isDev, $.tinypngCompress({
			key: '',
			summarise: true,
			sigFile: 'src/img/.tinypng-sigs',
			log: true
		})).pipe(gulp.dest('build/img/general')));
		const cssStream = spriteData.css.pipe(gulp.dest('src/sass/utilities'));
		return combiner(imgStream, cssStream).on('error', $.notify.onError(function (err) {
			return {
				title: 'PNG sprites',
				message: err.message
			};
		}));
	};
