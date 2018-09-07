'use strict';

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const combiner = require('stream-combiner2').obj;

module.exports = function (options) {

	return function () {
		return combiner(
			gulp.src('src/img/icons/*.svg'),
			$.if(isDev, $.svgSprite({
				mode: {
					css: {
						dest: '../',
						bust: false,
						sprite: '../img/icons/sprite.svg',
						prefix: '@mixin sprite-%s',
						layout: 'vertical',
						dimensions: true,
						render: {
							scss: {
								template: 'template_svg_sprite.scss',
								dest: 'utilities/_svg-sprite.scss'
							}
						}
					}
				}
			}), $.svgSprite({
				mode: {
					css: {
						dest: '../',
						bust: false,
						sprite: '../img/icons/sprite.svg',
						prefix: '@mixin sprite-%s',
						layout: 'vertical',
						dimensions: true,
						render: {
							scss: {
								template: 'template_svg_sprite.scss',
								dest: '_svg-sprite.scss'
							}
						}
					}
				}
			})),
			$.if('*.scss', gulp.dest('src/sass/utilities/'), gulp.dest('build/img/svg/'))
		).on('error', $.notify.onError(function (err) {
			return {
				title: 'Svg sprites',
				message: err.message
			};
		}));
	};
};