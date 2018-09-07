'use strict';

const bs = require('browser-sync').create();

module.exports = function(options) {
	
	return function () {
		bs.init({
			server: {
				baseDir: './build'
			}
		});
		return bs.watch('build/**/*.*').on('change', bs.reload);
	};
};