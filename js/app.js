var app = app || {};

$(function() {
	Backbone.pubSub = _.extend({}, Backbone.Events);

	new app.FacesView();
	new app.LinesView();
});