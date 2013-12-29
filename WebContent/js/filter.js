define( ['jquery', 'underscore', 'backbone', 'bootstrap', 'mustache', 'text!../../template/filter.html'], 
		function ($, _, backbone, bootstrap, mustache, filterTemplate) {
	
	var filterView = backbone.View.extend({
		
		tagName: 'form',
		template: filterTemplate,
		events: {
			"click #applyFilter": "applyFilter",
			"change select.departure": "departure",
			"change select.return"   : "returnFlight",
			"click input"            : "checkbox",
		},
		initialize: function (options) {
			this.router = options.router;
			this.render();
		},
		render: function () {
			this.$el.append( mustache.to_html( $(this.template).html() )  );
			return this;
		},
		applyFilter: function () {
			this.router.navigate("applyFilter", true);
		},
		departure: function (event) {
			this.model.set("departure", $(event.currentTarget)[0].value);
		},
		returnFlight: function (event) {
			this.model.set("return", $(event.currentTarget)[0].value);
		},
		checkbox: function (event) {
			/*alert(event.currentTarget.checked);*/
			var tempArray  = this.model.get("flightName");
			if(event.currentTarget.checked){
				tempArray.push($(event.currentTarget)[0].value);
			}else{
				var index = tempArray.indexOf($(event.currentTarget)[0].value);
				/*tempArray.remove($(event.currentTarget)[0].value);*/
				tempArray.splice(index, 1);
			}
			
			
			this.model.set("flightName", tempArray);
		},
	});
	
	return {
		getFilterView: filterView
	};
	
});