angular.module('app')
	.controller('AllItemsCtrl', ['DataService', '$scope', '$q', '$interval', function(DataService, $scope, $q, $interval) {
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

        var options = {
			url: 'https://api.douban.com/v2/movie/in_theaters?count=50',
			headers: {
				'User-agent': 'request'
			}
		};

		DataService.getHotMovies(options)
			.then(function(data) {
				self.activated = false;
				$scope.allItems = data;
				console.log($scope.allItems);
			})
			.then(function() {
				onCompletion();
			});

		function onCompletion() {
			// Update here your DOM

			setTimeout(function() {
				myScroll.refresh();
			}, 200);
		}
	}]);
