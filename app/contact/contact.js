

angular.module('ktApp.contact', [])


.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/contact', {
		templateUrl: 'contact/contact.html',
		controller: 'ContactCtrl'
	});
}])


.controller('ContactCtrl', ['$scope', 'tours', function($scope, tours) {

	$scope.tours = tours.query();

}]);