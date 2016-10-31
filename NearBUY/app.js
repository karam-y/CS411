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
    $scope.notVerified = true;

    $scope.change = function () {
        $scope.notVerified = true;
    }

    $scope.submit = function() {

        var placesURL = "https://maps.googleapis.com/maps/api/place/textsearch/json?" +
            "&query=" + $scope.keywords + "&location=" + $scope.coordinates +
            "&radius=" + $scope.radius + "&key=xxx";

        console.log('Run submit URL: ' + placesURL);

        $http.get(placesURL).
        then(function(response)
        {
            var dataOutput = response.data.results;
            $scope.searchResults = dataOutput;
        }
        );
    }

    $scope.verify = function() {

        console.log('Run find coordinates');

        var coordinateURL = 'https://maps.googleapis.com/maps/api/geocode/json?' + 
        "&address=" + $scope.address + "&key=xxx";

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

        $scope.notVerified = false;

    }

});
