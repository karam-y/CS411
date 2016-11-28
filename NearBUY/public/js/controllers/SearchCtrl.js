

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

        // var placesURL = "https://maps.googleapis.com/maps/api/place/textsearch/json?" +
        //     "&query=" + $scope.keywords + "&location=" + $scope.coordinates +
        //     "&radius=" + $scope.radius + "&key=";

        // console.log('Run submit URL: ' + placesURL);

        // $http.get(placesURL).
        // then(function(response)
        // {
        //     var dataOutput = response.data.results;
        //     $scope.searchResults = dataOutput;
        // }
        // );
    }

    // $scope.verify = function() {

    //     console.log('Run find coordinates');

    //     var coordinateURL = 'https://maps.googleapis.com/maps/api/geocode/json?' + 
    //     "&address=" + $scope.address + "&key=";

    //     console.log('Run coordinate URL: ' + coordinateURL);

    //     $http.get(coordinateURL).
    //     then(function(response)
    //     {
    //         var dataOutput = response.data.results[0].geometry.location;
    //         var lat = dataOutput.lat;
    //         var lng = dataOutput.lng;
    //         var coordinates = lat + "," + lng;
    //         console.log(response);
    //         console.log('This is coordinates in the findCoordinates: ' + coordinates);
    //         $scope.coordinates = coordinates;
    //         console.log('Finished coordinates')
    //     });

    //     $scope.notVerified = false;

    // }

});