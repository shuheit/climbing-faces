var app = app || {};

app.Face = Backbone.Model.extend({
	defaults: {
		image: 'img/face.png',
		left: 0,
		name: 'undefined'
	}
});