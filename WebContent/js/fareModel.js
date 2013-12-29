define( ['jquery', 'underscore', 'backbone'], function ($, _, backbone) {
	
	var fareModel = backbone.Model.extend({
		defaults:{
			fare1: 0,
			fare2: 0
		},
		
		initialize: function () {
			
		},
		
	});
	
	return {
		getFareModel: fareModel
	};
	
});