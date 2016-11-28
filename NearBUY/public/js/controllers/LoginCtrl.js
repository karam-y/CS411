var app = angular.module('LoginCtrl', []);

app.controller('LoginController', function($scope,$http, $window) {

	$scope.email = "";
	$scope.password = "";

	$scope.login = function () {
        console.log($scope.email);
        console.log($scope.password);

		$http({
		  url: '/api/users/583b7d6e47adb1192fa89744', //change this later unique user id
		  method: "GET",
		}).then(function successCallback(response) {
		    // this callback will be called asynchronously
		    // when the response is available
		    console.log(response);
		    console.log("successful retrieval");
		    $window.location.href = '/../../views/search.html'
		}, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		    console.log(response);
		    console.log("error in retrieval");
		});

        // $http.post('/users',data,config).
        // success(function(data) {
        //     console.log("posted successfully");
        // }).error(function(data) {
        //     console.error("error in posting");
        // })
    }
});