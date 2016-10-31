//to be used for google maps api
var map;
var service;
var infowindow;

// define the module
var app = angular.module('nearBuy', []);

//define the controller
app.controller('searchCtrl', function($scope, $http, $q, $timeout) {
	//used in search criteria
    $scope.keywords = "";
    $scope.address = "";
    $scope.radius = "";
    $scope.coordinates = "";
    this.verify = false;

    $scope.submit = function(callback) {

        //callback && callback();

        // console.log('Run submit');


        var placesURL = "https://maps.googleapis.com/maps/api/place/textsearch/json?" +
            "&query=" + $scope.keywords + "&location=" + $scope.coordinates +
            "&radius=" + $scope.radius + "&key=AIzaSyBsTAjge0lRGrWRkJvgDbH7s6-OFy7hnRo";

        console.log('Run submit URL: ' + placesURL);
        // $timeout(10000);

        $http.get(placesURL).
        then(function(response)
        {
            var dataOutput = response.data.results;
            // console.log(dataOutput);
            // console.log(dataOutput[0]);
            $scope.searchResults = dataOutput;
        }
        );

        // console.log('Finished submit')
        // $timeout(10000);
    }

    $scope.verify = function() {

        console.log('Run find coordinates');

        var coordinateURL = 'https://maps.googleapis.com/maps/api/geocode/json?' + 
        "&address=" + $scope.address + "&key=AIzaSyBsTAjge0lRGrWRkJvgDbH7s6-OFy7hnRo";

        console.log('Run coordinate URL: ' + coordinateURL);

        $http.get(coordinateURL).
        then(function(response)
        {
            var dataOutput = response.data.results[0].geometry.location;
            var lat = dataOutput.lat;
            var lng = dataOutput.lng;
            var coordinates = lat + "," + lng;
            console.log(response);
            console.log('This is coordinates in the findCoordinates: ' + coordinates);
            $scope.coordinates = coordinates;
            console.log('Finished coordinates')
        });

    }

});


// $http({method: $scope.method, url: $scope.url, cache: $templateCache}).
//         then(function(response) {
//           $scope.status = response.status;
//           $scope.data = response.data;
//         }, function(response) {
//           $scope.data = response.data || 'Request failed';
//           $scope.status = response.status;
//       });
