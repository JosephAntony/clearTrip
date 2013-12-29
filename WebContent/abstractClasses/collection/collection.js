define(['jquery', 'underscore', 'backbone'], function ($, _, backbone) {
	
	var abstractCollection = backbone.Collection.extend({
		parse: function (response) {
			return response;
		}
	});
	
	return {
		getCollection : abstractCollection
	};
	
});