define( ['jquery', 'underscore', 'backbone', 'bootstrap', 'mustache', 'text!../../template/fareView.html'] ,
		function ($, _, backbone, bootstrap, mustache, fareViewTemplate) {
	
	var fareView = backbone.View.extend({
		tagName: 'div',
		template: fareViewTemplate,
		
		initialize: function () {
			this.listenTo( this.model, 'change:fare1', this.fare1);
			this.listenTo( this.model, 'change:fare2', this.fare2);
			this.render();
		},
		render: function () {
			this.$el.addClass('price');
			this.$el.html( mustache.to_html( $(this.template).html() ) );
			return this;
		},
		fare1: function () {
			$("#totalfare").text('0');
			clearInterval(this.intervalVariable);
			var amount = this.model.get("fare1") + this.model.get("fare2");
			if(this.model.get("fare2") == 0){
				$("#totalfare").text(amount);
			}else {
				var self = this;
				this.intervalVariable = setInterval( function() { self.cashRegisterFunction( {interval: 100, amount: amount} ) } , 0.1 );
			}
			
		},
		fare2: function () {
			$("#totalfare").text('0');
			clearInterval(this.intervalVariable);
			var amount = this.model.get("fare1") + this.model.get("fare2");
			var self = this;
			this.intervalVariable = setInterval( function() { self.cashRegisterFunction( {interval: 100, amount: amount} ) } , 0.1 );
		},
		
		cashRegisterFunction : function (options) {
			var tempAmount = parseInt( $("#totalfare").text() ) + options.interval;
			if(tempAmount <= options.amount){
				$("#totalfare").text(tempAmount);
			} else {
				$("#totalfare").text("Rs " + options.amount);
				clearInterval(this.intervalVariable);
			}
		},
		
		
	});
	
	return {
		getFareView : fareView
	};
	
});