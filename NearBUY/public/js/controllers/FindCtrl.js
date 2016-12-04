angular.module('FindCtrl', []).controller('FindController', function($scope, $http, $q, $timeout) {
	$scope.city = "";
	$scope.state = "";
	$scope.zipcode = "";

	$scope.submitCityState = function() {
		$http({
		  url: '/api/find_results/' + $scope.city + "/" + $scope.state, 
		  method: "GET",
		}).then(function successCallback(response) {
		    // this callback will be called asynchronously
		    // when the response is available
		    $scope.searchResults = response.data;

		    var promises = [];

            $q.all(promises).then(function(){
                $scope.searchResults = response;

            })

		    $scope.requests = [];

		    for (var i = response.data.length - 1; i >= 0; i--) {
                (function(i) {
                    promises.push($http.get('/api/search_results/' + response.data[i].business_id)
                        .then(function(response2) {
                            // console.log(response);
                            var merged_results = angular.extend({}, response.data[i], response2.data);
                            // console.log(result.data[i]);
                            $scope.requests.push(merged_results);
                        }));
                })(i)
            }
            console.log($scope.requests);
            ;
		}, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		    console.log(response);
		    console.log("error in GET");
		});
	}

	$scope.submitZipcode = function () {
		$http({
		  url: '/api/find_results/' + $scope.zipcode, 
		  method: "GET",
		}).then(function successCallback(response) {
		    // this callback will be called asynchronously
		    // when the response is available
		    $scope.searchResults = response.data;

		    var promises = [];

            $q.all(promises).then(function(){
                $scope.searchResults = response;

            })

		    $scope.requests = [];

		    for (var i = response.data.length - 1; i >= 0; i--) {
                (function(i) {
                    promises.push($http.get('/api/search_results/' + response.data[i].business_id)
                        .then(function(response2) {
                            // console.log(response);
                            var merged_results = angular.extend({}, response.data[i], response2.data);
                            // console.log(result.data[i]);
                            $scope.requests.push(merged_results);
                        }));
                })(i)
            }
            console.log($scope.requests);
            ;
		}, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		    console.log(response);
		    console.log("error in GET");
		});
	}

	$scope.acceptRequest = function(id, seller_id) {
		console.log(id);
		console.log(seller_id);

		$http({
			url: '/api/accept',
			method: "POST",
			data: {request_id: id, seller_id: seller_id}
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
	}


});