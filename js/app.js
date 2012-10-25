define([
	'jquery',
	'backbone',
	'collections/fonts'
], function($, Backbone, Fonts){
	var App = function(){
		var self = {
				fonts	: new Fonts()
			};
		self.initialize = function(){

		};
		return self;
	};
	return App;
});
