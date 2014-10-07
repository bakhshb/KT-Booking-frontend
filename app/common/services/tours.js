
angular.module('services.tours', ['ngResource'])

.factory('tours', ['$resource', function($resource){
	return $resource('assets/rest/:tourId.json', {}, {
		query: {method:'GET', params:{tourId:'tours'}, isArray:true}
	});
}]);
