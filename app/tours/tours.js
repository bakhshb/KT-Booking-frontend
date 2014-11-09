

angular.module('ktApp.tours', [])


.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/tours', {
		templateUrl: 'tours/tours.html',
		controller: 'ToursCtrl'
	});
}])


.controller('ToursCtrl', ['$scope', 'tourResources', function($scope, tourResources) {

	$scope.tours = tourResources.tour.query();

}]);