angular.module('JoinService', []).factory('Join', ['$http', '$window', function($http, $window) {

	$scope.email = "";
	$scope.password = "";

	$scope.join = function () {
        console.log($scope.email);
        console.log($scope.password);

		$http({
		  url: '/api/users', 
		  method: "POST",
		  data: {email: $scope.email, password: $scope.password}
		}).then(function successCallback(response) {
		    // this callback will be called asynchronously
		    // when the response is available
		    console.log(response);
		    console.log("successful post");
		}, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		    console.log(response);
		    console.log("error in post");
		});

        // $http.post('/users',data,config).
        // success(function(data) {
        //     console.log("posted successfully");
        // }).error(function(data) {
        //     console.error("error in posting");
        // })
    }
}]);