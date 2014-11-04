

angular.module('ktApp.cart', [])


.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/booking/tours', {
		templateUrl: 'cart/cart.html',
		controller: 'CartCtrl'
	})
	.when('/booking/passengers', {
		templateUrl: 'cart/passengers.html',
		controller: 'PassengerCtrl'
	})
	.when('/booking/payment', {
		templateUrl: 'cart/payment.html',
		controller: 'PaymentCtrl'
	});
}])


.controller('CartCtrl', ['$scope', 'tours', 'CartService', function($scope, tours, CartService) {

	$scope.cart = CartService.cart;
	
	//$scope.tours = tours.query();

}])


.controller('PaymentCtrl', ['$scope', 'tours', 'CartService', function($scope, tours, CartService) {

	$scope.cart = CartService.cart;
	$scope.test = 's';
	//$scope.tours = tours.query();
	
	$scope.passengers = [];
	var loadPassengers = function () {
		var items = localStorage != null ? localStorage['ktbooking_passengers'] : null;
		if (items && JSON != null) {
			try {
				var items = JSON.parse(items);
				$scope.passengers = items;
				console.log('PARSED: ' + items);
			}catch (err) {
				console.log('ERROR: ' + err);
			}
		}
	}
	loadPassengers();
	if ($scope.passengers.length <= 0) {
		$location.path('/booking/passengers');
	}

}])


.controller('PassengerCtrl', ['$scope', '$timeout', '$location', 'CartService', function($scope, $timeout, $location, CartService) {

	var cart = CartService.cart;
	
	if (cart.items.length < 1) {
		$location.path('/booking/tours');
	}
	
	$scope.submitForm = function() {
		if ($scope.passengerForm.$valid) {
		//if (valid) {
			$location.path('/booking/payment');
		}
		$scope.showFormErrors = true;
	};
	
	$scope.passengers = [];
	$scope.passengers.push(new passenger($scope.passengers.length+1));
	
	var loadPassengers = function () {
		
		var items = localStorage != null ? localStorage['ktbooking_passengers'] : null;
		if (items && JSON != null) {
			try {
				var items = JSON.parse(items);
				$scope.passengers = items;
				console.log('PARSED: ' + items);
			}
			catch (err) {
				console.log('ERROR: ' + err);
			}
		}
	}
	loadPassengers();
	
	var savePassengers = function () {
		console.log($scope.passengers);
		if (localStorage != null && JSON != null) {
			localStorage['ktbooking_passengers'] = JSON.stringify($scope.passengers);
			console.log('SAVED: ' + JSON.stringify($scope.passengers));
		}
	}
	
	var timeout = null;
	var waitSeconds = 2;
	var throttleSavePassengers = function () {
		if (timeout) {
			$timeout.cancel(timeout)
		}
		timeout = $timeout(savePassengers, waitSeconds * 1000);  // 1000 = 1 second
	}
	
	$scope.add = function () {
		$scope.passengers.push(
			new passenger($scope.passengers.length)
		);
	};
	$scope.remove = function (pId) {
		for(var i=$scope.passengers.length-1; i>=0; i--) {
			if($scope.passengers[i].id === pId) {
				$scope.passengers.splice(i, 1);
				console.log($scope.passengers[i].fname);
			}
		}
	};
	
	$scope.$watch('passengers', throttleSavePassengers, true);
	
	
	/*
	 * calendar related
	 */
	$scope.open = function($event, opened) {
		//console.log('opened = ' + opened);
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
		//console.log('sc = ' + $scope.asd1);
	};

	$scope.dateOptions = {
		formatYear: 'yy',
		startingDay: 1
	};
	
	//var datefilter = $filter('date'),
    //formattedDate = datefilter($scope.dt, 'yyyy/MM/dd');
	
}])

.directive('formatsqldate', function ($filter) {
    return {
		restrict: 'A',
		require: 'ngModel',
        link: function (scope, element, attrs, ctrl) {
            ctrl.$parsers.unshift(function (viewValue) {
                return $filter('date')(viewValue,'yyyy-MM-dd');
            });            
        }
    };
})


.factory("CartService", function () {

    //var myStore = new store();

    var myCart = new shoppingCart("ktbooking_bookingdates");

    // enable PayPal checkout
    // https://www.paypal.com/webapps/mpp/merchant
    myCart.addCheckoutParameters("PayPal", "rowanovenden@gmail.com");

    // enable Google Wallet checkout
    // https://developers.google.com/commerce/wallet/digital/training/getting-started/merchant-setup
    myCart.addCheckoutParameters("Google", "xxxxxxx",
        {
            ship_method_name_1: "UPS Next Day Air",
            ship_method_price_1: "20.00",
            ship_method_currency_1: "USD",
            ship_method_name_2: "UPS Ground",
            ship_method_price_2: "15.00",
            ship_method_currency_2: "USD"
        }
    );

    return {
        cart: myCart
    };
});


function passenger(id) {
    this.id = id;
    this.fname = '';
	this.lname = '';
	this.nickname = '';
	this.gender = '';
	this.phone = '';
	this.mobile = '';
	this.email = '';
	this.dob = '';
	this.address = '';
	this.nationality = '';
	this.country = '';
}
