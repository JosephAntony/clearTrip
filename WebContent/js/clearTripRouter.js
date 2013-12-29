define(['jquery', 'underscore', 'backbone', 'bootstrap', 'mustache', 'abstractModel', 'abstractCollection', 'filter', 'fareView', 'fareModel', 'tripListView','tripList1', 'text!../../template/tripList1.html'], 
		function ($, _, backbone, bootstrap, mustache, abstractModel, abstractCollection, filter, fareView, fareModel, tripListView, tripList1, tripList1Template) {
	
	
	var clearTripRouter = backbone.Router.extend({
		routes:{
			"" : "home",
			"filter": "filter",
			"applyFilter": "applyFilter",
		},
		initialize: function () {
			this.filter =  null;
		},
		home: function(){
			var fareCalculatorModel = new fareModel.getFareModel();
			$("div.cart").append( new fareView.getFareView({model: fareCalculatorModel}).el );
			$("div.cart").append('<div class="buy"><button>Book</button></div>');
			this.trip1List = new tripListView.getTripListView({url: '../json/MNflights.json', viewId: 'trip1-list', model: fareCalculatorModel});
			$(".trip").append(this.trip1List.el);
			this.trip2List = new tripListView.getTripListView({url: '../json/NMflights.json', viewId: 'trip2-list', model: fareCalculatorModel});
			$(".trip").append(this.trip2List.el);
			
		},
		
		filter: function (event) {
			var flightNameArray  = new Array();
			var filterModel = new abstractModel.getModel();
			filterModel.set("departure", 0);
			filterModel.set("return", 0);
			filterModel.set("flightName", flightNameArray);
			if(this.filter ==  null ) {
				this.filter = new filter.getFilterView( {router: this, model: filterModel} );
			}else{
				this.filter.remove();
				this.filter = new filter.getFilterView( {router: this, model: filterModel} );
			}
			$("#filter").append( this.filter.el );
			$("#filter").attr("style", "display");
			$("div.trip").attr("style", "display:none");
		},
		applyFilter: function () {
			var self = this;
			$("#filter").attr("style", "display:none");
			$("div.trip").attr("style", "display");
			console.log(this.filter.model.toJSON());
			this.trip1List.renderFilterCollection( {filterModel: this.filter.model, filter: 'DepartureTime'} );
			this.trip2List.renderFilterCollection( {filterModel: this.filter.model, filter: 'returnTime'} );
			
		},
		
	});
	
	return {
		getRouter: clearTripRouter
	};
	
});