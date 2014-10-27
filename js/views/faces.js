var app = app || {};

app.FacesView = Backbone.View.extend({
	el: '#main',

	initialize: function(){
		app.canvas = new fabric.Canvas('canvas');
		$(window).on( 'resize', this.resizeCanvas );
		this.setCanvasSize();

		this.render();
	},

	events: {
		'mouseover .face': 'mouseover'
	},

	setCanvasSize: function() {
		app.canvas.setWidth($(main).width());
		app.canvas.setHeight($(main).height());
	},

	resizeCanvas: function() {
		if (app.resizeTimer !== false) {
			clearTimeout(app.resizeTimer);
		}
		app.resizeTimer = setTimeout(function() {
			app.canvas.setWidth($(main).width());
			app.canvas.setHeight($(main).height());
		}, 200);
	},

	render: function() {
		var face = new app.Face();
		face.set( { image: 'img/face.svg', left: 0, name: 'myface' } );
		var num = Math.floor($(main).width()/50);
		for(var i=0; i<num; i++) {
			face.set( { left: i*50 + 'px' } )
			var faceView = new app.FaceView({ model: face });
			faceView.animate();
			this.$el.append( faceView.render().el );
		}
	},

	mouseover: function() {
		Backbone.pubSub.trigger( 'animate' );
	}

});