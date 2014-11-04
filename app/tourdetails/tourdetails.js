

angular.module('ktApp.tourdetails', ['ui.bootstrap'])


.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/tours/:tourId', {
		templateUrl: 'tourdetails/tourdetails.html',
		controller: 'ToursDetailsCtrl'
	});
}])


.controller('ToursDetailsCtrl', ['$scope', '$routeParams', '$location', 'tours', 'CartService', function($scope, $routeParams, $location, tours, CartService) {

	$scope.tour = tours.get({tourId: 'tour'+$routeParams.tourId}, function(tour) {
      $scope.mainImageUrl = tour.images[0];
    });

    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    };
	
	
	
	$scope.cart = CartService.cart;
	
	$scope.submitForm = function() {
		//if ($scope.bookDateForm.$valid) {
		if ($scope.bookdate) {
			var detail = {
				tour: $scope.tour,
				date: $scope.bookdate
			};
			CartService.cart.addItem($scope.bookdate, $scope.tour.name, $scope.tour.price, 1, detail);
			$location.path('/booking/tours');
		}
		$scope.showErrors = true;
	};
	
$scope.options = [{
   name: 'Wednesday, 8 Oct 2014',
   value: '8/10/2014'
}, {
   name: 'Wednesday, 17 Oct 2014',
   value: '11/10/2014'
}];
	
	$scope.dt = new Date();

	$scope.test = ['8/10/2014','11/10/2014'];//get these from tour schedule . is it in the same details request?
	/*
	angular.forEach(values, function(value, key) {
	  this.push(key + ': ' + value);
	}, log);
	*/

	$scope.disabled = function(date, mode) {
		var d = date.getDate();
		var m = date.getMonth()+1; //jan is 0
		var yyyy = date.getFullYear();
		var check = d + '/' + m + '/' + yyyy;
		for (var i = 0; i < $scope.test.length; i++) {
			if ($scope.test[i] == check) return false;
		}
		return true;
	};

	$scope.openCal = function($event) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope.opened = true;
	};

	$scope.dateOptions = {
		formatYear: 'yyyy',
		formatMonth: 'MMMM',
		formatDay: 'd',
		startingDay: 1,
		showWeeks: false
	};

	var clear = function () {
		$scope.dt = null;
	};

	$scope.formats = ['dd-MMMM-yyyy', 'd/MM/yyyy', 'dd.MM.yyyy', 'shortDate'];
	$scope.format = $scope.formats[1];
	
	
	var updateSelect = function () {
		for (var i = 0; i < $scope.test.length; i++) {
			var d = $scope.dt.getDate();
			var m = $scope.dt.getMonth()+1; //jan is 0
			var yyyy = $scope.dt.getFullYear();
			var check = d + '/' + m + '/' + yyyy;
			if(check == $scope.test[i]){
				$scope.bookdate = $scope.test[i];
			}
		}
	}
	$scope.$watch('dt', updateSelect);
	
}]);
