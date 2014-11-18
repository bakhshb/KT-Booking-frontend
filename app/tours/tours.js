

angular.module('ktApp.tours', [])


.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/tours', {
		templateUrl: 'tours/tours.html',
		controller: 'ToursCtrl'
	});
}])


.controller('ToursCtrl', ['$scope', 'tourResources', function($scope, tourResources) {

	$scope.tours = [];
	$scope.tourimgs = [];
	
	tourResources.tour.query()
	.$promise.then(
		function( response ){
		
			$scope.tours = response;
			
			for (var i=0; i<response.length; i++) {
				tourResources.photo.query({tourId: response[i].id})
				.$promise.then(
					function( response2 ){
						
						var found = false;
						for (var i=0; i<response2.length; i++) {
							if(response2[i].activated == true){
								console.log('yay');
								found = true;
								$scope.tourimgs.push(response2[i]);
							}
						}
						if(!found){$scope.tourimgs.push(response2[0]);console.log('nope');}
					},
					function( error ){}
				)
			}
			
		},
		function( error ){
			//console.log('could not find any images');
		}
	)
	
	
	
	for (var i=0; i<$scope.tours.length; i++) {
		console.log('as');
		//$scope.tours[i].photo = tourResources.photo.query({tourId: $routeParams.tourId});
	}
	
	//$scope.photos = tourResources.photo.query();

}]);