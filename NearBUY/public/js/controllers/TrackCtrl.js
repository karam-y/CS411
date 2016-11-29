//define the controller
angular.module('TrackCtrl', []).controller('TrackController', function($scope, $http, $q, $timeout) {

    //used in search criteria
    $scope.email = "";


    $scope.findOrders = function() {
        $http.get('/api/tracking/' + $scope.email).then( function(result) {
            var promises = [];

            $q.all(promises).then(function(){
                $scope.searchResults = result;

            })

            $scope.searchResults = result.data; //contains array of request
            // console.log(result.data);
            // console.log("search: " + $scope.searchResults); //arra

            $scope.businesses = [];

            for (var i = result.data.length - 1; i >= 0; i--) {
                (function(i) {
                    promises.push($http.get('/api/search_results/' + result.data[i].business_id)
                        .then(function(response) {
                            // console.log(response);
                            var merged_results = angular.extend({}, result.data[i], response.data);
                            // console.log(result.data[i]);
                            $scope.businesses.push(merged_results);
                        }));
                })(i)
            }
            console.log($scope.businesses);
            ;

        })
    }

        // "working attempt"
        // //nested http calls 
        // $http.get('/api/tracking/' + $scope.email)
        // .then(function (result) {

        //     $scope.orderResults = result.data;
        //     console.log($scope.orderResults);

        //     // for (var i=0; i < $scope.orderResults.length; i++ ) {
        //     //     $http.get('/api/search_results/' + $scope.orderResults[i].business_id).
        //     //     then(function (result) {

        //     //     });
        //     // }
        //     //call to yelp
        //     return $http.get('/api/search_results/' + $scope.orderResults[0].business_id);
        //     }).then(function (result) {
        //         console.log(result.data);
        //         $scope.businessInfo = result.data
        // });

    //not using this
    // $scope.findBusiness = function(id) {
    //     return $http.get('/api/search_results/' + $scope.orderResults[0].business_id);
    //         }).then(function (result) {
    //             console.log(result.data);
    //             $scope.businessInfo = result.data
    //     });
    // }


});