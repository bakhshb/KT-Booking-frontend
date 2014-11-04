
angular.module('services.tours', ['ngResource'])

.factory('tours', ['$resource', function($resource){
	return $resource('http://tomcat-oneninetwo.rhcloud.com:80/app/rest/tours/:tourId', {}, {
		getot: {method:'GET', isArray:true},
		query: {method:'GET', params:{tourId:'tours'}, isArray:true}
	});
}])

.factory('tourImages', ['$resource', function($resource){
	return $resource('http://tomcat-oneninetwo.rhcloud.com:80/app/rest/tourphotos', {}, {
		getot: {method:'GET', isArray:true},
		query: {method:'GET', params:{tourId:'tours'}, isArray:true}
	});
}])
