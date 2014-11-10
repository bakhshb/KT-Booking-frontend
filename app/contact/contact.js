

angular.module('ktApp.contact', [])


.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/contact', {
		templateUrl: 'contact/contact.html',
		controller: 'ContactCtrl'
	});
}])


.controller('ContactCtrl', ['$scope', function($scope) {

	//$scope.tours = tours.query();

}]);