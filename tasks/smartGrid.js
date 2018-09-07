'use strict';

const smartGrid = require('smart-grid');

module.exports = function (options) {

	return function (cb) {
		
		const settings = {
			outputStyle: 'scss',
			/* less || scss || sass || styl */
			columns: 10,
			/* number of grid columns */
			offset: "30px",
			/* gutter width px || % */
			mobileFirst: false,
			container: {
				maxWidth: '1700px',
				/* max-width оn very large screen */
				fields: '30px' /* side fields */
			},
			breakPoints: {
				lg: {
					'width': '1200px', //1100
					/* -> @media (max-width: 1100px) */
					'fields': '30px' /* side fields */
				},
				md: {
					'width': '992px', //960
					'fields': '15px'
				},
				sm: {
					'width': '768px', //780
					'fields': '15px'
				},
				xs: {
					'width': '480px',
					'fields': '15px'
				}
			}
		};

		smartGrid('src/sass/utilities', settings);

		cb();
	};
};
