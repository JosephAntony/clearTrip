define(['jquery', 'underscore', 'backbone', 'bootstrap', 'mustache', 'abstractModel', 'abstractCollection', 'text!../../template/tripList1.html'], 
		function ($, _, backbone, bootstrap, mustache, abstractModel, abstractCollection, tripList1Template) {
	
	var tripListView =  backbone.View.extend({
		
		tagName: 'li',
		template: tripList1Template,
		events: {
			"click ": "liClick"
		},
		
		liClick: function () {
			console.log('sssssssssssssssssss');
			console.log(this.model);
			this.$el.parent().find("li.selected").removeClass("selected");
			this.$el.toggleClass("selected");
			if(this.$el.parent().attr("id") == "trip1-list"){
				this.fareCalculatorModel.set("fare1", this.fare);
			}else{
				this.fareCalculatorModel.set("fare2", this.fare);
			}
			var self = this;
			
		},
		
		initialize: function (options){
			this.initialCssClass = options.cssClass;
			this.fare = this.model.get("fare");
			this.fareCalculatorModel = options.fareCalculatorModel;
		},
		render: function (){
			
			this.$el.html( mustache.to_html( $(this.template).html(), this.model.toJSON()) );
			if(this.initialCssClass != null) {
				this.$el.addClass(this.initialCssClass);
			}
			
			return this;
			
		},
		
	});
	
	return {
		getTripListView:tripListView
	};
	
});