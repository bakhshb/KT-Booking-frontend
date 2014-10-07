

angular.module('ktApp.tours').controller('ToursCtrl', ['$scope', 'tours', function($scope, tours) {

	$scope.tours = tours.query();

}]);