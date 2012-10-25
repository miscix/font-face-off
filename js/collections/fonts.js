define([
	'jquery',
	'backbone',
	'models/font',
	'views/panel'
], function($, Backbone, Font, PanelView) {
	var Collection = Backbone.Collection.extend({
			url: '/api/fonts',
			model: Font,
			initialize: function(){
				this.panel = new PanelView(this);
				this.fetch();
			},
			setPreview: function(text){
				text = $.trim(text);
				if (text === this.text){
					return false;
				}
				this.text = text;
				this.trigger('change preview', text);
			}
		});
	return Collection;
});