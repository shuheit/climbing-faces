var app = app || {};

app.FaceView = Backbone.View.extend({
	tagName: 'div',
	className: 'face',
	template: $('#faceTemplate').html(),

	initialize: function(){
		Backbone.pubSub.on('animate', this.animate, this);
		Backbone.pubSub.on('animationEnd', this.checkPos, this);
	},

	render: function(){
		var tmpl = _.template( this.template );
		this.$el.css( 'left', this.model.get('left') );
		this.$el.html( tmpl( this.model.toJSON() ) );
		return this;
	},

	events: {
	},

	trembling: function( num ) {
		for(var i=0; i<num; i++){
			this.$el.animate({
				left: "+=5px"
			}, {
				duration: 10
			}).animate({
				left: "-=5px"
			}, {
				duration: 10
			});
		}
    },

    jumping: function() {
		var random = 0+this.getNum();
		this.$el.animate({
			bottom: "+=" + random +"px"
		}, {
			duration: 300,
			complete: function(){
				Backbone.pubSub.trigger( 'animationEnd' );
			}
		});
    },

	checkPos: function() {
		if( this.$el.position().top < 0) {
			this.$el.css( 'bottom', Math.floor(Math.random () * 100) );
		}
	},

	getNum: function() {
		return Math.floor(Math.random () * 400) + 1;
	},

	animate: function() {
		this.jumping();
	}

});