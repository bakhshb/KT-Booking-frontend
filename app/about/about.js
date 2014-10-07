

angular.module('ktApp.about', [])


.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/about', {
		templateUrl: 'about/about.html',
		controller: 'AboutCtrl'
	});
}])


.controller('AboutCtrl', ['$scope', 'tours', function($scope, tours) {

	$scope.tours = tours.query();

}]);