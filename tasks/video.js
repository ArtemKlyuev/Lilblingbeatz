'use strict';

const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const combiner = require('stream-combiner2').obj;

module.exports = function (options) {

    return function () {
        return combiner(
            gulp.src('src/video/bling_background.mp4'),
            gulp.dest('build/video/')
        )
    };

};