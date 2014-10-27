

angular.module('ktApp.gallery', [])


.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/gallery', {
		templateUrl: 'gallery/gallery.html',
		controller: 'GalleryCtrl'
	});
}])


.controller('GalleryCtrl', ['$scope', function($scope) {

	

}]);