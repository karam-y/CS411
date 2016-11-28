angular.module('JoinCtrl', []).controller('JoinController', function($scope) {

	$scope.email = "";
	$scope.password = "";

	$scope.join = function () {
        console.log($scope.email);
        console.log($scope.password);
    }

});