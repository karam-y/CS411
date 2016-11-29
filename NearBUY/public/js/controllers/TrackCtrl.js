//define the controller
angular.module('TrackCtrl', []).controller('TrackController', function($scope, $http, $q, $timeout) {

    //used in search criteria
    $scope.email = "";

    $scope.findOrders = function() {
        console.log($scope.email);

        //nested http calls 
        $http.get('/api/tracking/' + $scope.email)
        .then(function (result) {

            $scope.searchResults = result.data;
            console.log($scope.searchResults);
            //call to yelp
            return $http.get('/api/search_results/' + $scope.searchResults[0].business_id);
            }).then(function (result) {
                console.log(result);
        });
    }


    // $scope.findBusiness = function(id) {

    //     $http({
    //         url: '/search_results/' + id,
    //         method: "GET"
    //     }).then(function successCallback(response) {
    //         console.log(response);
    //         console.log("successful yelp GET");
    //     }, function errorCallback(response) {
    //         console.log(response);
    //         console.log("error yelp GET");
    //     });

    //     return id
    // }


});