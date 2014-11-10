

angular.module('ktApp.about', [])


.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/about', {
		templateUrl: 'about/about.html',
		controller: 'AboutCtrl'
	});
}])


.controller('AboutCtrl', ['$scope', function($scope) {

	//$scope.tours = tours.query();

}]);