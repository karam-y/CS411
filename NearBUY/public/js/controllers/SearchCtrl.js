

//define the controller
angular.module('SearchCtrl', []).controller('SearchController', function($scope, $http, $q, $timeout) {

    //used in search criteria
    $scope.keywords = "";
    $scope.address = "";
    $scope.radius = "";
    $scope.coordinates = "";

    $scope.submit = function() {

        console.log($scope.keywords);
        console.log($scope.address);

        $http({
          url: '/api/search_results/' + $scope.address +  "/" + $scope.keywords + "/",
          method: "GET"
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available

            var dataOutput = response.data.businesses;

            $scope.searchResults = dataOutput;

            console.log($scope.searchResults);

            console.log("successful response");
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            
            console.log("error in response");
        });

        window.scrollTo(0, 1000);

    }


});