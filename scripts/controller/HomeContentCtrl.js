angular.module('app')
.controller('HomeContentCtrl', ['$scope', '$q', '$interval', function($scope, $q, $interval) {
	var request = require('request');
	//var path = require('path');
	//var fs = require('fs');

	var self = this;
	self.activated = true;
	self.determinateValue = 30;
	// Iterate every 100ms, non-stop and increment
	// the Determinate loader.
	$interval(function() {
		self.determinateValue += 1;
		if (self.determinateValue > 100) {
			self.determinateValue = 30;
		}
	}, 100);

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
		self.activated = false;
		$scope.items = data;
		console.log($scope.items);
	});

}]);
