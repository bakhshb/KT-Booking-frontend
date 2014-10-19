

angular.module('ktApp.cart', [])


.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/booking/tours', { 
		templateUrl: 'cart/cart.html',
		controller: 'CartCtrl'
	})
	.when('/booking/passengers', { 
		templateUrl: 'cart/passengers.html',
		controller: 'PassengerCtrl'
	});
}])


.controller('CartCtrl', ['$scope', 'tours', 'DataService', function($scope, tours, DataService) {

	$scope.cart = DataService.cart;
	
	$scope.canContinue = function () {
		if ($scope.cart.items.length > 0) return true;
		return false;
	};
	
	//$scope.tours = tours.query();

}])


.controller('PassengerCtrl', ['$scope', '$timeout', '$location', 'DataService', function($scope, $timeout, $location, DataService) {

	var cart = DataService.cart;
	
	if (cart.items.length < 1) {
		$location.path('/booking/tours');
	}
	
	$scope.passengers = [];
	$scope.passengers.push(new passenger($scope.passengers.length));
	
	var loadPassengers = function () {
		var items = localStorage != null ? localStorage['ktbooking_passengers'] : null;
		if (items != null && JSON != null) {
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
	//localStorage['ktbooking_passengers'] = null;
	
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
	
	$scope.$watch('passengers', throttleSavePassengers, true);
	
}])


.factory("DataService", function () {

    //var myStore = new store();

    var myCart = new shoppingCart("ktbooking_bookingdates");

    // enable PayPal checkout
    // https://www.paypal.com/webapps/mpp/merchant
    myCart.addCheckoutParameters("PayPal", "paypaluser@youremail.com");

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
}
