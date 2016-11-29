window.onload = function () {
    var url = document.location.href,
        params = url.split('?')[1].split('&'),
        data = {}, tmp;
    for (var i = 0, l = params.length; i < l; i++) {
         tmp = params[i].split('=');
         data[tmp[0]] = tmp[1];
    }
    console.log(url);
    console.log(params);
    console.log(data);
    //document.getElementById('here').innerHTML = data.business_id;

    var http = new XMLHttpRequest();

    http.onreadystatechange = function() {
    	if (this.readyState == 4 && this.status == 200) {
    		var data = JSON.parse(http.responseText);
    		document.getElementById('here').innerHTML = data.name; //this is the response text

    		console.log(data)
    	}
    }
    var url = "/api/search_results/" + data.business_id;
    http.open("GET", url, true);
    http.send();
}


angular.module('OrderCtrl', []).controller('OrderController', function($scope, $http, $q, $timeout) {

	//variables to hold the skills
	$scope.list = [];
	$scope.notes = '';
	$scope.price = '';
	$scope.total = 0;
	$scope.address_1 = '';
	$scope.address_2 = '';
	$scope.city = '';
	$scope.state = '';
	$scope.zip = '';

	$scope.addItem = function() {
		console.log($scope.newItem);
		$scope.list.push({ 'name' : $scope.newItem, 'done': false});
		$scope.newItem = '';
	}

	$scope.deleteItem = function(index) {
		$scope.list.splice(index, 1);
	}

	$scope.updateTotal = function() {
		$scope.total = $scope.price;
		total = $scope.price
		console.log($scope.total)
	}

	$scope.addRequest = function() {
		var id = Math.floor((Math.random()*100000)+1); //transaction id CHANGE THIS LATER
		var buyer_id = 1; //user id for buyer CHANGE THIS LATER
		var address = $scope.address_1 + " " + $scope.address_2;

		console.log("adding request to database");
		$http({
		  url: '/api/request', 
		  method: "POST",
		  data: {list: $scope.list, notes: $scope.notes, price: $scope.total, id: id, buyer_id: buyer_id, delivery_address: address, delivery_city: $scope.city, delivery_state: $scope.state, delivery_zip: $scope.zip}
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