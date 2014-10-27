

angular.module( 'ktApp', [
	'ngRoute',
	'animations',
	'services.tours',
	'ktApp.home',
	'ktApp.about',
	'ktApp.tours',
	'ktApp.tourdetails',
	'ktApp.gallery',
	'ktApp.contact',
	'ktApp.cart'
])


.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
	
	//$locationProvider.hashPrefix('!');
    $locationProvider.html5Mode(false); //set true take out # from html links
	
	$routeProvider.when('/error', {
        templateUrl: 'partials/error.html',
        controller: 'ErrorCtrl'
    })
	.otherwise({redirectTo:'/home'});
	
}])


.run( function run () {
	
})


.controller('MainCtrl', ['$scope', '$location', 'tours', function($scope, $location, tours) {

	$scope.isActive = function(route) {
        return route === $location.path();
    };

	//$scope.tours = tours.query();
//$location.path('/admin/projects');
}])

;