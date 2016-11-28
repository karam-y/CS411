angular.module('LoginService', []).factory('Login', ['$http', function($http) {

	//user credentials
    $scope.email = "";
    $scope.password ="";

    $scope.change = function () {
        $scope.notVerified = true;
    }
	

}]);