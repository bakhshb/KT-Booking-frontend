

angular.module('ktApp.tourdetails', ['ui.bootstrap'])


.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/tours/:tourId', {
		templateUrl: 'tourdetails/tourdetails.html',
		controller: 'ToursDetailsCtrl'
	});
}])


.controller('ToursDetailsCtrl', ['$scope', '$routeParams', '$location', 'tours', 'DataService', function($scope, $routeParams, $location, tours, DataService) {

	$scope.tour = tours.get({tourId: 'tour'+$routeParams.tourId}, function(tour) {
      $scope.mainImageUrl = tour.images[0];
    });

    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    };
	
	
	
	$scope.cart = DataService.cart;

	$scope.addBooking = function() {//tourID should be the tourBookingDateID likewise for price
		DataService.cart.addItem($scope.tour.id, $scope.tour.name, $scope.tour.price, 1);
		$location.path('/booking/tours');
	};
	
	
	

	$scope.dt = 0;

	var test = ['8/10/2014','11/10/2014','17/10/2014'];//get these from tour schedule . is it in the same details request?
	
	$scope.disabled = function(date, mode) {
		var d = date.getDate();
		var m = date.getMonth()+1; //jan is 0
		var yyyy = date.getFullYear();
		var check = d + '/' + m + '/' + yyyy;
		return ( !(test.indexOf( check ) > -1) );
	};

	$scope.open = function($event) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope.opened = true;
	};

	$scope.dateOptions = {
		formatYear: 'yyyy',
		formatMonth: 'MMMM',
		formatDay: 'd',
		startingDay: 1
	};

	$scope.formats = ['dd-MMMM-yyyy', 'd/MM/yyyy', 'dd.MM.yyyy', 'shortDate'];
	$scope.format = $scope.formats[1];
	
	
}]);
