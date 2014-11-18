
angular.module('services.tours', ['ngResource'])

.factory('tourResources', ['$resource', function($resource){
	
	return {
		tour: $resource('http://tomcat-oneninetwo.rhcloud.com:80/app/rest/tours/:tourId', {}, {
			
		}),
		schedule: $resource('http://tomcat-oneninetwo.rhcloud.com:80/app/rest/tourschedules/tour/:tourId', {}, {
			
		}),
		photo: $resource('http://tomcat-oneninetwo.rhcloud.com:80/app/rest/tourphotos/:tourId', {}, {
			
		}),
		booking: $resource('http://tomcat-oneninetwo.rhcloud.com:80/app/rest/bookings', {}, {
			add: {
				method: 'POST',
				isArray: false,
				headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'} 
			}
		})
	};
	
}]);