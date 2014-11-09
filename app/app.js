

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
	.when('/404', {
        templateUrl: '404.html',
        controller: 'Four04Ctrl'
    })
	.otherwise({redirectTo:'/404'});
	
}])


.run( function run () {
	
})


.controller('MainCtrl', ['$scope', '$location', function($scope, $location) {

	$scope.isActive = function(route) {
        return route === $location.path();
    };
	
	
	//$location.path('/admin/projects');
}])


.controller('Four04Ctrl', ['$scope', function($scope) {

	
	
}])



.directive('anchorSmoothScroll', function($location) {
    'use strict';

    return {
        restrict: 'A',
        replace: false,
        scope: {
            'anchorSmoothScroll': '@'
        },

        link: function($scope, $element, $attrs) {

            initialize();
    
            /* initialize -
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
            function initialize() {
                createEventListeners();
            }

            /* createEventListeners -
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
            function createEventListeners() {
                // listen for a click
                $element.on('click', function() {
                    // set the hash like a normal anchor scroll
                    $location.hash($scope.anchorSmoothScroll);

                    // smooth scroll to the passed in element
                    scrollTo($scope.anchorSmoothScroll);
                });
            }

            /* scrollTo -
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
            function scrollTo(eID) {

                // This scrolling function 
                // is from http://www.itnewb.com/tutorial/Creating-the-Smooth-Scroll-Effect-with-JavaScript
                
                var i;
                var startY = currentYPosition();
                var stopY = elmYPosition(eID);
                var distance = stopY > startY ? stopY - startY : startY - stopY;
                if (distance < 100) {
                    scrollTo(0, stopY); return;
                }
                var speed = Math.round(distance / 100);
                if (speed >= 20) speed = 20;
                var step = Math.round(distance / 25);
                var leapY = stopY > startY ? startY + step : startY - step;
                var timer = 0;
                if (stopY > startY) {
                    for (i = startY; i < stopY; i += step) {
                        setTimeout('window.scrollTo(0, '+leapY+')', timer * speed);
                        leapY += step; if (leapY > stopY) leapY = stopY; timer++;
                    } return;
                }
                for (i = startY; i > stopY; i -= step) {
                    setTimeout('window.scrollTo(0, '+leapY+')', timer * speed);
                    leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
                }
            }
            
            /* currentYPosition -
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
            function currentYPosition() {
                // Firefox, Chrome, Opera, Safari
                if (window.pageYOffset) {
                    return window.pageYOffset;
                }
                // Internet Explorer 6 - standards mode
                if (document.documentElement && document.documentElement.scrollTop) {
                    return document.documentElement.scrollTop;
                }
                // Internet Explorer 6, 7 and 8
                if (document.body.scrollTop) {
                    return document.body.scrollTop;
                }
                return 0;
            }

            /* scrollTo -
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
            function elmYPosition(eID) {
                var elm = document.getElementById(eID);
                var y = elm.offsetTop;
                var node = elm;
                while (node.offsetParent && node.offsetParent != document.body) {
                    node = node.offsetParent;
                    y += node.offsetTop;
                } return y;
            }
        }
    };
})


.directive('clickChildren', function($parse){
  return {
    restrict: 'A',
    link: function(scope, element, attrs){       
      var selector = attrs.selector;
      var fun = $parse(attrs.clickChildren);   
      element.on('click', selector, function(e){   
		console.log(e);
        
		//get attr and pass it to scope function as a param
		//var idx = e.target.getAttribute('data-namehere');        
        //scopeParamNameHere(scope)(idx);        
      });
    }
  };
});