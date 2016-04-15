var app = angular.module(
	'app', [
		'ngRoute',
		'ngMaterial',
		'ngAnimate'
	]
).config(
	[
		'$routeProvider',
		function($routeProvider) {
			$routeProvider.when(
				'/', {
					templateUrl: './view/home/content.html'
				}
			);
			$routeProvider.when(
				'/allItems', {
					templateUrl: './view/home/allItems.html',
					controller: 'AppCtrl'
				}
			)
			$routeProvider.otherwise({
				redirectTo: '/'
			});
		}
	]
);
