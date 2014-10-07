

angular.module('ktApp.cart', [])


.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/cart', {
		templateUrl: 'cart/cart.html',
		controller: 'CartCtrl'
	});
}])


.controller('CartCtrl', ['$scope', 'tours', 'DataService', function($scope, tours, DataService) {

	$scope.cart = DataService.cart;
	
	//$scope.tours = tours.query();

}])


.factory("DataService", function () {

    //var myStore = new store();

    var myCart = new shoppingCart("AngularStore");

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

    // enable Stripe checkout
    // note: the second parameter identifies your publishable key; in order to use the 
    // https://manage.stripe.com/register
    myCart.addCheckoutParameters("Stripe", "pk_test_xxxx",
        {
            chargeurl: "https://localhost:1234/processStripe.aspx"
        }
    );

    // return data object with store and cart
    return {
        //store: myStore,
        cart: myCart
    };
});