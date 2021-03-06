

angular.module('ktApp.cart', [])


.config(['$routeProvider', function($routeProvider) {
    $routeProvider
	.when('/booking/tours', {
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
	})
	.when('/booking/confirmation', {
		templateUrl: 'cart/confirmation.html',
		controller: 'ConfirmationCtrl'
	});
}])


.controller('CartCtrl', ['$scope', 'CartService', function($scope, CartService) {

	$scope.cart = CartService.cart;
	
	//$scope.tours = tours.query();

}])


.controller('ConfirmationCtrl', ['$scope', 'CartService', function($scope, CartService) {

	//$scope.cart = CartService.cart;
	

}])


.controller('PaymentCtrl', ['$scope', 'CartService', 'tourResources', function($scope, CartService, tourResources) {

	$scope.cart = CartService.cart;
	
	$scope.passengers = [];
	var loadPassengers = function () {
		var items = localStorage != null ? localStorage['ktbooking_passengers'] : null;
		if (items && JSON != null) {
			try {
				var items = JSON.parse(items);
				$scope.passengers = items;
			}catch (err) {
				console.log('ERROR: ' + err);
			}
		}
	}
	loadPassengers();
	if ($scope.passengers.length <= 0) {
		$location.path('/booking/passengers');
	}
	
	//console.log($scope.cart.items);
	for (var i=0; i<$scope.cart.items.length; i++) {
		$scope.cart.items[i].quantity = $scope.passengers.length;
	}
	
	$scope.checkoutSuperSecure = function(){
		var bookingInfo = {
			"firstName":"rooo2",
			"lastName":"updates",
			"birthday": "2007-12-03", 
			"gender":"Male", 
			"nationality":"Anguilla", 
			"email":"qwe@qwe.com", 
			"contactNo":"0275553855", 
			"tourSchedule": { 
				"id":"3" 
			}, 
			"booking": { 
				"paymentMethod":"Cash" 
			} 
		};
		//tourResources.booking.save(bookingInfo);
		$scope.cart.checkout('SuperSecure', false);
	}
	
	$scope.checkoutPaypal = function(){
		var bookingInfo = {};
		for (var i=0; i<$scope.passengers.length; i++) {
			//$scope.passengers[i] = $scope.passengers.length;
			//console.log($scope.passengers[i]);
			bookingInfo = {
				"firstName": $scope.passengers[i].fname,
				"lastName": $scope.passengers[i].lname,
				"birthday": $scope.passengers[i].dob, 
				"gender": "Male", 
				"nationality": $scope.passengers[i].nationality, 
				"email": $scope.passengers[i].email, 
				"contactNo": $scope.passengers[i].phone, 
				"tourSchedule": {
					"id":"0" 
				},
				"booking": {
					"paymentMethod":"Cash" 
				}
			};
			for (var a=0; a<$scope.cart.items.length; a++) {
				//console.log($scope.cart.items[a].sku);
				bookingInfo.tourSchedule.id = $scope.cart.items[a].sku;
				
				//tourResources.booking.save(bookingInfo);
			}
			//console.log(bookingInfo);
		}
		
		$scope.cart.checkout('PayPal', false);
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
			savePassengers();
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
		//console.log($scope.passengers);
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

.directive("passwordVerify", function() {
   return {
      require: "ngModel",
      scope: {
        passwordVerify: '='
      },
      link: function(scope, element, attrs, ctrl) {
        scope.$watch(function() {
            var combined;

            if (scope.passwordVerify || ctrl.$viewValue) {
               combined = scope.passwordVerify + '_' + ctrl.$viewValue; 
            }                    
            return combined;
        }, function(value) {
            if (value) {
                ctrl.$parsers.unshift(function(viewValue) {
                    var origin = scope.passwordVerify;
                    if (origin !== viewValue) {
                        ctrl.$setValidity("passwordVerify", false);
                        return undefined;
                    } else {
                        ctrl.$setValidity("passwordVerify", true);
                        return viewValue;
                    }
                });
            }
        });
     }
   };
})

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
    myCart.addCheckoutParameters("PayPal", "rowanovenden-facilitator@gmail.com",
        {
            custom: "bookingReferenceIDhere",
            cancel_return: "http://localhost:8000/app/#/booking/payment",
			"return": "http://localhost:8000/app/#/booking/confirmation",
        }
	);
	
	//supersecure
	//https://supersecure.co.nz/supersecure.php
	//append template to use onto the url with ?template=example.html
	myCart.addCheckoutParameters("SuperSecure", "rowanovenden-facilitator@gmail.com",
        {
            custom: "bookingReferenceIDhere"
        }
	);

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
