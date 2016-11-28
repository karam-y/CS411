
//define the controller
angular.module('OrderCtrl', []).controller('OrderController', function($scope, $http, $q, $timeout) {

	//variables to hold the skills
	$scope.list = [];
	$scope.price = '';
	$scope.total = 0;

	$scope.addItem = function() {
		console.log($scope.newItem);
		$scope.list.push({ 'name' : $scope.newItem, 'done': false});
		$scope.newItem = '';
	}

	$scope.deleteItem = function(index) {
		$scope.list.splice(index, 1);
	}

	$scope.updateTotal = function() {
		$scope.total = $scope.price;
		console.log($scope.total)
	}

});