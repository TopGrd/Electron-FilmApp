var request = require('request');
angular.module('app')
	.service('DataService', ['$q', DataService]);

function DataService($q) {
	return {
		getHotMovies: getHotMovies
	};

	function getHotMovies(options) {
		var deferred = $q.defer();
		request(options, function(error, response, body) {
			if (!error && response.statusCode == 200) {
				var data = JSON.parse(body);
				deferred.resolve(data.subjects);
			}
		});

		return deferred.promise;

	}
}
