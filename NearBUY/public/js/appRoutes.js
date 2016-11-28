angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// search page
		.when('/search', {
			templateUrl: 'views/search.html',
			controller: 'SearchController'
		})

	$locationProvider.html5Mode(true);

}]);