angular.module('app')
.controller('HomeContentCtrl', ['$scope', '$q', function($scope, $q) {
	var request = require('request');
	//var path = require('path');
	//var fs = require('fs');

	var deferred = $q.defer();
	var options = {
		url: 'https://api.douban.com/v2/movie/in_theaters?count=40',
		headers: {
			'User-agent': 'request'
		}
	};
	function getData(options) {
		request(options, function(error, response, body) {
			if (!error && response.statusCode == 200) {
				var data = JSON.parse(body);
				deferred.resolve(data.subjects);
			}
		});

		return deferred.promise;
	}

	getData(options).then(function (data) {
		$scope.items = data;
		console.log($scope.items);
	});

}]);
