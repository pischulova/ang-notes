var model = 'aaa';

angular.module('application', [])
	.controller('HelloController', function($scope) {
		console.log('hello');
		$scope.message = model;

		$scope.clickHandler = function() {
			$scope.message = $scope.text;
		}
	})