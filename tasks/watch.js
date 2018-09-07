'use strict';

const gulp = require('gulp');

module.exports = function(options) {
	
	return function() {
		gulp.watch('src/sass/**/*.{sass,scss}', gulp.series('sass')); 		// Наблюдение за sass файлами
		gulp.watch('src/pug/**/*.pug', gulp.series('pug'));
		gulp.watch('src/js/**/*.js', gulp.series('scripts'));
//		gulp.watch('src/js/**/*.js', gulp.series('scripts') .on('unlink', function(filepath) {
//			remember.forget('scripts', path.resolve(filepath));
//			delete cached.caches.scripts[path.resolve(filepath)];
//		}));
		
		gulp.watch('src/img/**/*.svg', gulp.series('svg:sprites'));
	};

};