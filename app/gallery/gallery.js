

angular.module('ktApp.gallery', ['infinite-scroll'])


.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/gallery', {
		templateUrl: 'gallery/gallery.html',
		controller: 'GalleryCtrl'
	});
}])


.controller('GalleryCtrl', ['$scope', function($scope) {

	$scope.images = [
		{thumb: 'Small groups -bus.jpg', src: 'Small groups -bus.jpg'},
		{thumb: 'Snow Mt Ruapehu.jpg', src: 'Snow Mt Ruapehu.jpg'},
		{thumb: 'South Island West cost beach.jpg', src: 'South Island West cost beach.jpg'},
		{thumb: 'Tongariro Crossing.jpg', src: 'Tongariro Crossing.jpg'},
		{thumb: 'Wai O Tapu Rotorua Taupo.jpg', src: 'Wai O Tapu Rotorua Taupo.jpg'},
		{thumb: 'Wai O Tapu Rotorua.jpg', src: 'Wai O Tapu Rotorua.jpg'},
		{thumb: 'WaitoTapu Devils Bath.jpg', src: 'WaitoTapu Devils Bath.jpg'},
		{thumb: 'weta cave Wellington.jpg', src: 'weta cave Wellington.jpg'},
		{thumb: 'Wine tour.jpg', src: 'Wine tour.jpg'},
		{thumb: 'Wood Hill.jpg', src: 'Wood Hill.jpg'},
		{thumb: 'Zorb Rotorua.jpg', src: 'Zorb Rotorua.jpg'},
		{thumb: 'Small groups -bus.jpg', src: 'Small groups -bus.jpg'},
		{thumb: 'Snow Mt Ruapehu.jpg', src: 'Snow Mt Ruapehu.jpg'},
		{thumb: 'South Island West cost beach.jpg', src: 'South Island West cost beach.jpg'},
		{thumb: 'Tongariro Crossing.jpg', src: 'Tongariro Crossing.jpg'},
		{thumb: 'Wai O Tapu Rotorua Taupo.jpg', src: 'Wai O Tapu Rotorua Taupo.jpg'},
		{thumb: 'Wai O Tapu Rotorua.jpg', src: 'Wai O Tapu Rotorua.jpg'},
		{thumb: 'WaitoTapu Devils Bath.jpg', src: 'WaitoTapu Devils Bath.jpg'},
		{thumb: 'weta cave Wellington.jpg', src: 'weta cave Wellington.jpg'},
		{thumb: 'Wine tour.jpg', src: 'Wine tour.jpg'},
		{thumb: 'Wood Hill.jpg', src: 'Wood Hill.jpg'},
		{thumb: 'Zorb Rotorua.jpg', src: 'Zorb Rotorua.jpg'},
		{thumb: 'Small groups -bus.jpg', src: 'Small groups -bus.jpg'},
		{thumb: 'Snow Mt Ruapehu.jpg', src: 'Snow Mt Ruapehu.jpg'},
		{thumb: 'South Island West cost beach.jpg', src: 'South Island West cost beach.jpg'},
		{thumb: 'Tongariro Crossing.jpg', src: 'Tongariro Crossing.jpg'},
		{thumb: 'Wai O Tapu Rotorua Taupo.jpg', src: 'Wai O Tapu Rotorua Taupo.jpg'},
		{thumb: 'Wai O Tapu Rotorua.jpg', src: 'Wai O Tapu Rotorua.jpg'},
		{thumb: 'WaitoTapu Devils Bath.jpg', src: 'WaitoTapu Devils Bath.jpg'},
		{thumb: 'weta cave Wellington.jpg', src: 'weta cave Wellington.jpg'},
		{thumb: 'Wine tour.jpg', src: 'Wine tour.jpg'},
		{thumb: 'Wood Hill.jpg', src: 'Wood Hill.jpg'},
		{thumb: 'Zorb Rotorua.jpg', src: 'Zorb Rotorua.jpg'}
	];
	
	$scope.displayImages = [
		{thumb: 'Small groups -bus.jpg', src: 'Small groups -bus.jpg'},
		{thumb: 'Snow Mt Ruapehu.jpg', src: 'Snow Mt Ruapehu.jpg'},
		{thumb: 'South Island West cost beach.jpg', src: 'South Island West cost beach.jpg'},
		{thumb: 'Tongariro Crossing.jpg', src: 'Tongariro Crossing.jpg'}
	];
	
	$scope.loadMore = function() {
		if($scope.displayImages.length < $scope.images.length){
			for (var i=1; i<=4; i++) {
				//console.log($scope.images[$scope.displayImages.length]);
				var next = $scope.images[$scope.displayImages.length];
				$scope.displayImages.push(next);
			}
		}
	};

}])


.directive('gallery', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
			scope.$watch(attrs.test, function(value){
                //console.log(value);
            });
            $(element).magnificPopup({
				delegate: 'a', 
				//items: scope.$eval(attrs.test), //add test="{{testitems}}" to html
				gallery: {
					enabled: true,
					navigateByImgClick: true,
					preload: [0,1] // Will preload 0 - before current, and 1 after the current image
				},
				closeBtnInside: false,
				type: 'image',
				/*TODO
				tLoading: 'Loading image #%curr%...',
				image: {
					tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
					titleSrc: function(item) {
						return item.el.attr('title') + '<small>qweqwe</small>';
					}
				}
				*/
			});
        }
    };
})



.filter('pmkr.partition', [
  'pmkr.filterStabilize',
  function(stabilize) {

    function partition(arr, size) {

      var newArr = [];

      for (var i=0; i<arr.length; i+=size) {
        newArr.push(arr.slice(i, i+size));
      }

      return newArr;

    }

    return stabilize(partition);

  }
])

.factory('pmkr.filterStabilize', [
  'pmkr.memoize',
  function(memoize) {

    function service(fn) {

      function filter() {
        var args = [].slice.call(arguments);
        // always pass a copy of the args so that the original input can't be modified
        args = angular.copy(args);
        // return the `fn` return value or input reference (makes `fn` return optional)
        var filtered = fn.apply(this, args) || args[0];
        return filtered;
      }

      var memoized = memoize(filter);

      return memoized;

    }

    return service;

  }
])

.factory('pmkr.memoize', [
  function() {

    function service() {
      return memoizeFactory.apply(this, arguments);
    }

    function memoizeFactory(fn) {

      var cache = {};

      function memoized() {

        var args = [].slice.call(arguments);

        var key = JSON.stringify(args);

        if (cache.hasOwnProperty(key)) {
          return cache[key];
        }

        cache[key] = fn.apply(this, arguments);

        return cache[key];

      }

      return memoized;

    }

    return service;

  }
])

;