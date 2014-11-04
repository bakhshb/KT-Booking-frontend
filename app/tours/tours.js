

angular.module('ktApp.tours', [])


.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/tours', {
		templateUrl: 'tours/tours.html',
		controller: 'ToursCtrl'
	});
}])


.controller('ToursCtrl', ['$scope', 'tours', function($scope, tours) {

	$scope.tours = tours.getot();

}]);