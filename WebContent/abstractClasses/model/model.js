define(['jquery', 'underscore', 'backbone'], function ($, _, backbone){
	
	var abstractModel = backbone.Model.extend({
		
		parse: function (response) {
			return response;
		}
	});
	
	return{
		getModel: abstractModel
	};
	
});