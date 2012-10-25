define([
	'jquery',
	'backbone',
	'config',
	'text!templates/font/font.html'
], function($, Backbone, config, tpl){
	var View = Backbone.View.extend({
			className: 'font',
			tagName: 'article',
			tpl: _.template(tpl),
			initialize: function(model){
				this.model = model;
				this.staticUrl = config.staticUrl || window.location.protocol + '//' + window.location.host + '/static';
				this.render();
				this.delegate();
			},
			delegate: function(){
				var name = this.model.get('data').fontid, 
					$text = this.$('.preview-text');
				this.model.collection.on('change preview', function(text){
					$text.text(text || name);
				});
			},
			weightType: function(weight){
				return ({
						'200': 'Light',
						'300': 'Book',
						'400': 'Normal',
						'600': 'Semi-Bold',
						'700': 'Bold',
						'800': 'Ultra-Bold'
					})[weight] || 'Normal';
			},
			loadCSS: function(src){
				$('<link/>')
					.attr({
						'type': 'text/css',
						'rel': 'stylesheet',
						'href': src
					})
					.appendTo('head');
			},
			render: function(){
				var data = this.model.get('data');

				data.weightType = this.weightType(data.weight);
				data.text = this.model.collection.text || data.fontid;
				
				data.src = ([this.staticUrl, data.dirname, data.filename]).join('/') + '.css';

				this.loadCSS(data.src);

				var markup = this.tpl(data);
				this.$el
					.html(markup)
					.prependTo('#fonts');
			}
		});
	return View;
});