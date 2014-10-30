

angular.module('ktApp.gallery', [])


.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/gallery', {
		templateUrl: 'gallery/gallery.html',
		controller: 'GalleryCtrl'
	});
}])


.controller('GalleryCtrl', ['$scope', function($scope) {

	$scope.testitems = [{
        src: 'assets/img/logo.jpg'
      },
	  {
        src: 'assets/img/banner.jpg'
      }];

}])


.directive('gallery', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
			scope.$watch(attrs.test, function(value){
                console.log(value);
            });
            $(element).magnificPopup({
				//delegate: 'a', //todo: currently adding on scope, or do by html tag?
				items: scope.$eval(attrs.test),
				gallery: {
					enabled: true,
					navigateByImgClick: true,
					preload: [0,1] // Will preload 0 - before current, and 1 after the current image
				},
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
});