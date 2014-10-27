var app = app || {};

app.LinesView = Backbone.View.extend({
	el: '#main',

	initialize: function(){
		this.render();
	},

	events: {
	},

	render: function() {
		var line = new app.Line();
		line.set( { left: 0, name: 'myface' } );
		var num = Math.floor($(main).width()/50);
		for(var i=0; i<num; i++) {
			line.set( { left: 30+i*50 + 'px' } )
			var lineView = new app.LineView({ model: line });
			this.$el.append( lineView.render().el );
		}
	}

});