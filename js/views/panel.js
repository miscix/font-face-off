define([
	'jquery',
	'backbone',
	'qq'
], function($, Backbone, qq){
	var View = Backbone.View.extend({
			events: {
				'keyup input#text': function(e){
					var text = this.$text.val();
					this.model.setPreview(text);
				},
				'submit form': function(e){
					e.preventDefault();
					return false;
				}
			},
			initialize: function(model){
				this.model = model;
				this.$el = $('#panel');
				this.$text = this.$('#text');
				model.setPreview(this.$text.val());
				this.uploadify();
			},
			uploadify: function(){
				var el = this.$('#upload').get(0);
				new qq.FileUploader({
						element: el,
						action: '/api/upload/',
						allowedExtensions: ['ttf', 'woff', 'svg'],
						onComplete: function(a, b, data){
							app.fonts.add({ data: data });
						}
					});
			}
		});
	return View;
});