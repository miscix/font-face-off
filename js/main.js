require.config({
	paths: {
		// Core Libraries
		'jquery'	: 'libs/jquery',
		'underscore': 'libs/lodash',
		'backbone'	: 'libs/backbone',
		// Plugins
		'bootstrap'	: 'plugins/bootstrap',
		'qq'		: 'plugins/qq',
		// Directory routing
		'templates'	: '../tpl'
	},
	shim: {
		// Twitter bootstrap js files
		'bootstrap': ['jquery'],
		// Valums uploader plugin
		'qq': {
			'deps': ['underscore', 'jquery'],
			'exports': 'qq'
		},

		'backbone': {
				'deps': ['underscore', 'jquery'],
				'exports': 'Backbone' 
		}
	}
});

require([
	'app',
	'bootstrap'
], function(App) {
	window.app = App();
});