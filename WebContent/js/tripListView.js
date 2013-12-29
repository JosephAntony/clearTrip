define(['jquery', 'underscore', 'backbone', 'bootstrap', 'mustache', 'abstractModel', 'abstractCollection', 'tripList1', 'text!../../template/tripListView.html', 'text!../../template/tripList1.html'], 
		function ($, _, backbone, bootstrap, mustache, abstractModel, abstractCollection, tripList1, tripListViewTemplate, tripList1Template) {
	
	var tripListView =  backbone.View.extend({
		
		tagName: 'div',
		template: tripListViewTemplate,
		sortOrderDeparts: 0,
		sortOrderArrives: 0,
		sortOrderPrice: 0,
		
		events: {
			
			"click a.sort-trip2.middle" : "sorttrip3",
			"click a.sort-trip2.last.selected" : "sorttrip4",
			"click a.sort-trip2.noClass" : "sorttrip2"
		},
		
		sorttrip2: function () {
			if(this.sortOrderDeparts ==0){
				this.sortOrderDeparts = 1;
			}else {
				this.sortOrderDeparts = 0;
			}
			this.sort({ sortOrder: this.sortOrderDeparts, sortType: 'departs' });
			event.preventDefault();
		},
		
		sorttrip3: function(event) {
			if(this.sortOrderArrives == 0){
				this.sortOrderArrives = 1;
			}else {
				this.sortOrderArrives = 0;
			}
			
			this.sort({ sortOrder: this.sortOrderArrives, sortType: 'arrives' });
			event.preventDefault();
		},
		
		sorttrip4: function (event) {
			if(this.sortOrderPrice == 0){
				this.sortOrderPrice = 1;
			}else {
				this.sortOrderPrice = 0;
			}
			
			this.sort({ sortOrder: this.sortOrderPrice, sortType: 'price' });
			event.preventDefault();
		},
		
		initialize: function (options){
			var self = this;
			this.viewid = options.viewId;
			
				this.tripList1Collection = new  abstractCollection.getCollection();
				this.tripList1Collection.url = options.url;
				this.tripList1Collection.fetch({
					success: function (collection, response, options){
						console.log(collection);
						console.log(response);
						console.log(options);
						self.render();
					},
					error: function(collection, response, options) {
						console.log('ERROR');
						console.log(collection);
						console.log(response);
						console.log(options);
					}
				});
			
			
			
			
		},
		render: function (){
			this.sortCollection =  this.tripList1Collection;
			var self = this;
			var viewId = {
					"viewid": this.viewid
			};
			var initialCssClass = "selected";
			this.$el.append( mustache.to_html( $(this.template).html(), viewId ) );
			_.each(this.tripList1Collection.models, function (model) {
				var tempView = new tripList1.getTripListView({model: model, cssClass: initialCssClass, fareCalculatorModel: self.model});
				$("#"+self.viewid).append( tempView.render().el );
				
				if(initialCssClass != null){
					
					if(self.viewid == "trip1-list"){
						self.model.set("fare1", model.get("fare") );
					}else {
						self.model.set("fare2", model.get("fare") );
					}
					
				}
				
				initialCssClass = null;
			});
			
			this.$el.addClass("trips");
			return this;
		},
		
		
		sort: function  (options){
			var initialCssClass = "selected";
			var self = this;
			$("#" + this.viewid).empty();
			if (options.sortType == 'price') {
				if(options.sortOrder == 0){
					this.sortCollection.comparator = function (model) {
						return model.get("fare");
					}
					
				}else {
					this.sortCollection.comparator = function (model) {
						return -model.get("fare");
					}
				}
				this.sortCollection.sort();
			} else if (options.sortType == 'arrives'){
				
				if(options.sortOrder == 0){
					this.sortCollection.comparator = function (model) {
						return model.get("arrives");
					}
					
				}else {
					this.sortCollection.comparator = function (model) {
						return -model.get("arrives");
					}
				}
				this.sortCollection.sort();
			} else if ( options.sortType == 'departs' ) {
				
				if(options.sortOrder == 0){
					this.sortCollection.comparator = function (model) {
						return model.get("departs");
					}
					
				}else {
					this.sortCollection.comparator = function (model) {
						return -model.get("departs");
					}
				}
				this.sortCollection.sort();
				
			}
			
			
			
			_.each( this.sortCollection.models, function (model) {
				var tempView = new tripList1.getTripListView({model: model, cssClass: initialCssClass, fareCalculatorModel: self.model});
				var tempViewPointer = tempView.render();
				$("#"+self.viewid).append( tempViewPointer.el );
				
				if(initialCssClass != null){
					
					if(self.viewid == "trip1-list"){
						self.model.set("fare1", model.get("fare") );
					}else {
						self.model.set("fare2", model.get("fare") );
					}
					
				}
				
				initialCssClass = null;
			} );
			
		},
		
		
		
		renderFilterCollection: function (options) {
			var self = this;
			var initialCssClass = "selected";
			var filter = options.filter;
			$("#"+this.viewid).empty();
			
			if(filter == "DepartureTime"){
				var collectionEmpty = true;
				var tempCollection = this.getFilterCollection(options)
				this.sortCollection = tempCollection;
				_.each(tempCollection.models , function (model) {
					collectionEmpty = false;
					var tempView = new tripList1.getTripListView({model: model, cssClass: initialCssClass, fareCalculatorModel: self.model});
					$("#"+self.viewid).append( tempView.render().el );
					if(initialCssClass != null){
						
						
						self.model.set("fare1", model.get("fare"));
						
					}
					
					initialCssClass = null;
				});
				if(collectionEmpty == true){
					this.model.set("fare1", 0);
				}
			}else if(filter == "returnTime"){
				var collectionEmpty = true
				var tempCollection = this.getFilterCollection(options)
				this.sortCollection = tempCollection;
				_.each(tempCollection.models, function (model) {
					collectionEmpty = false;
					var tempView = new tripList1.getTripListView({model: model, cssClass: initialCssClass, fareCalculatorModel: self.model});
					$("#"+self.viewid).append( tempView.render().el );
					if(initialCssClass != null){
						
						self.model.set("fare2", model.get("fare") );
						
					}
					
					initialCssClass = null;
				});
				
				if(collectionEmpty == true) {
					this.model.set("fare2", 0);
				}
			}
			
			
			
			console.log(options.filterModel);
			
		},
		
		getFilterCollection: function (options) {
			console.log("this is a options");
			console.log(options);
			if( options.filter == "DepartureTime"){
				var tempCollection = new  abstractCollection.getCollection();
				if( options.filterModel.get("flightName").length>0 && options.filterModel.get("departure") !=0 ){
					for(var iloop = 0 ; iloop< options.filterModel.get("flightName").length; iloop++){
						tempCollection.add( this.tripList1Collection.where({ "DepartureTime": parseInt( options.filterModel.get("departure") ), "flightCode": options.filterModel.get("flightName")[iloop] }));
					}
					return tempCollection;
				}else if(options.filterModel.get("departure") !=0 &&  options.filterModel.get("flightName").length == 0) {
					tempCollection.add( this.tripList1Collection.where( { "DepartureTime": parseInt( options.filterModel.get("departure") ) } ) );
					return tempCollection;
				}else if (options.filterModel.get("flightName").length>0 && options.filterModel.get("departure") ==0 ) {
					for(var iloop = 0 ; iloop< options.filterModel.get("flightName").length; iloop++){
						tempCollection.add( this.tripList1Collection.where({"flightCode": options.filterModel.get("flightName")[iloop] }));
					}
					return tempCollection;
				}else {
					return this.tripList1Collection;
					
				}
			}else if( options.filter == "returnTime"){
				var tempCollection = new  abstractCollection.getCollection();
				if(options.filterModel.get("flightName").length>0 && options.filterModel.get("return") !=0 ){
					for(var iloop = 0 ; iloop< options.filterModel.get("flightName").length; iloop++){
						tempCollection.add( this.tripList1Collection.where({ "returnTime": parseInt( options.filterModel.get("return") ), "flightCode": options.filterModel.get("flightName")[iloop] }));
					}
					return tempCollection;
				}else if( options.filterModel.get("return") !=0 &&  options.filterModel.get("flightName").length == 0 ) {
					tempCollection.add( this.tripList1Collection.where( { "returnTime": parseInt( options.filterModel.get("return") ) } ) );
					return tempCollection;
				}else if(options.filterModel.get("flightName").length>0 && options.filterModel.get("return") == 0 ) {
					for(var iloop = 0 ; iloop< options.filterModel.get("flightName").length; iloop++){
						tempCollection.add( this.tripList1Collection.where({"flightCode": options.filterModel.get("flightName")[iloop] }));
					}
					return tempCollection;
				}else{
					return this.tripList1Collection;
				}
			}
			
		},
		
		
	});
	
	return {
		getTripListView:tripListView
	};
	
});