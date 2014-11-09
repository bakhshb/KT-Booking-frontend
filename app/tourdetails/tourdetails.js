

angular.module('ktApp.tourdetails', ['ui.bootstrap'])


.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/tours/:tourId', {
		templateUrl: 'tourdetails/tourdetails.html',
		controller: 'ToursDetailsCtrl'
	});
}])


.controller('ToursDetailsCtrl', ['$scope', '$routeParams', '$location', 'tourResources', 'CartService', function($scope, $routeParams, $location, tourResources, CartService) {
	/*
	doSuccess = function(){
		console.log('seuc');
	}
	doError = function(){
		console.log('err');
	}
	*/
	tourResources.tour.get({tourId: $routeParams.tourId})
	.$promise.then(
		function( value ){
			console.log('tourResources.tour.get success');
			$scope.tour = value;
		},
		function( error ){
			console.log('could not find tour id');
			//$location.url('/404');
		}
	)
	
	tourResources.schedule.query({tourId: $routeParams.tourId})
	.$promise.then(
		function( value ){
			console.log('tourResources.schedule.query success');
			$scope.dates = value;
		},
		function( error ){
			console.log('could not find any schedule dates');
			//$location.url('/404');
		}
	)
	
	tourResources.photo.query({tourId: $routeParams.tourId})
	.$promise.then(
		function( response ){
			//todo double check response
			//if(value.successCode == 200 && resposne.length > 0)
			console.log('tourResources.photo.query success');
			$scope.images = response;
			$scope.primaryImage = $scope.images[0].photo;
			for (var i=0; i<response.length; i++) {
				if(response[i].activated) $scope.primaryImage = $scope.images[i].photo;
			}
			$scope.mainImageUrl = $scope.primaryImage;
		},
		function( error ){
			console.log('could not find any images');
		}
	)
	
	/*
	.$promise.then(
		function( value ){
			console.log(value);
		},
		function( error ){
			console.log(error);
			//$location.url('/404');
		}
	)
	$scope.tour = tourResources.tour.get({tourId: $routeParams.tourId}, function(tour) {
      //$scope.mainImageUrl = tour.images[0];
    });*/

    $scope.setImage = function(image) {
      $scope.mainImageUrl = image.photo;
    };
	
	
	
	$scope.cart = CartService.cart;
	
	$scope.submitForm = function() {
		//if ($scope.bookDateForm.$valid) {
		if ($scope.bookdate) {
			if($scope.primaryImage) var dpImage = 'http://tomcat-oneninetwo.rhcloud.com/uploads/'+$scope.primaryImage;
			else var dpImage = 'assets/img/bus.jpg';
			$scope.bookdate.image = dpImage;
			CartService.cart.addItem($scope.bookdate.id, $scope.bookdate.tour.name, $scope.bookdate.price, 1, $scope.bookdate);
			$location.path('/booking/tours');
		}
		$scope.showErrors = true;
	};

	
	//var qwe = new Date();
	//var qwe.setDate(qwe.getDate() - 8);
	var today = new Date();
	$scope.dt = today;

	$scope.disabled = function(date, mode) {
		var d = date.getDate();
		var m = date.getMonth()+1; //jan is 0
		var y = date.getFullYear();
		var check = y + '-' + m + '-' + d;
		for (var i = 0; i < $scope.dates.length; i++) {
			if ($scope.dates[i].departureDate == check) return false;
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

	$scope.formats = ['dd-MMMM-yyyy', 'yyyy-MM-dd', 'd/MM/yyyy', 'dd.MM.yyyy', 'shortDate'];
	$scope.format = $scope.formats[1];//doesnt matter unless displaying the input field
	
	
	var updateSelect = function () {
		if($scope.dates != null)
		{
			for (var i = 0; i < $scope.dates.length; i++) {
				var d = $scope.dt.getDate();
				var m = $scope.dt.getMonth()+1; //jan is 0
				var y = $scope.dt.getFullYear();
				var check = y + '-' + m + '-' + d;
				if(check == $scope.dates[i].departureDate){
					$scope.bookdate = $scope.dates[i];
				}
			}
		}
	}
	$scope.$watch('dt', updateSelect, true);
	
}]);
