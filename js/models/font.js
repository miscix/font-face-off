define([
	'jquery',
	'underscore',
	'backbone',
	'views/font'
], function($, _, Backbone, FontView) {
	var Model = Backbone.Model.extend({
			initialize: function(){
				this.view = new FontView(this);
			}
		});
	return Model;
});