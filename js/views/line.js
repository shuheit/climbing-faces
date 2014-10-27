var app = app || {};

app.LineView = Backbone.View.extend({
	tagName: 'div',
	className: 'line',
	template: $('#lineTemplate').html(),

	initialize: function(){
		Backbone.pubSub.on('animate', this.animate, this);
		Backbone.pubSub.on('animationEnd', this.checkPos, this);
	},

	render: function(){
		var tmpl = _.template( this.template );
		this.$el.css( 'left', this.model.get('left') );
		var random = 0+this.getNum();
		this.$el.css( 'top', this.getNum() );
		this.$el.html( tmpl( this.model.toJSON() ) );
		return this;
	},

	events: {
	},

	setHeight: function() {
		var random = 0+this.getNum();
		this.$el.animate({
			top: "-=" + random +"px",
			bottom: "+=" + random +"px"
		}, {
			duration: 100,
			complete: function(){
				Backbone.pubSub.trigger( 'animationEnd' );
			}
		});
    },

    checkPos: function() {
		if( this.$el.position().top < 0) {
			this.$el.css( 'top', 50+this.getNum() );
			this.$el.css( 'bottom', 0 );
		}
	},

	getNum: function() {
		return Math.floor(Math.random () * 100);
	},

	animate: function() {
		this.setHeight();
	}

});