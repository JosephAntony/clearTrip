requirejs.config({
	baseUrl: '../js/lib',
	paths: {
		'jquery'    : 'jquery-2.0.2',
		'underscore': 'underscore',
		'backbone'  : 'backbone',
		'bootstrap' : 'bootstrap.min',
		'mustache'  : 'mustache',
		'text'      : 'text',
		'router'    : '../clearTripRouter',
		'abstractModel': '../../abstractClasses/model/model',
		'abstractCollection': '../../abstractClasses/collection/collection',
		'tripList1' : '../tripList1',
		'tripListView' : '../tripListView',
		'fareModel': '../fareModel',
		'fareView' : '../fareView',
		'filter'   : '../filter',
	},
	
   shim:{
		
		'jquery':{
			exports: 'jQuery'
		},
	    'underscore': {
	    	exports: '_'
	    },
	    'backbone':{
	    	deps: ['jquery', 'underscore'],
	    	exports: 'Backbone'
	    },
	    'bootstrap':{
	    	deps:['jquery']
	    }
	}
	
	
});


require( ['jquery', 'underscore', 'backbone', 'bootstrap', 'mustache', 'abstractModel', 'abstractCollection', 'filter', 'fareModel', 'fareView', 'tripListView', 'tripList1', 'router'], 
		function($, _, backbone, bootstrap, mustache, abstractModel, abstractCollection, filter, fareModel, tripListView, fareView, tripList1, clearTripRouter){
	
	var tripRouter = new clearTripRouter.getRouter();
	backbone.history.start();
});