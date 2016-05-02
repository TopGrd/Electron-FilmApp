angular.module('app')
	.controller('AllItemsCtrl', ['DataService', '$scope', '$q', '$interval', '$mdIcon', function(DataService, $scope, $q, $interval, $mdIcon) {
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
			});

		$scope.renderRating = function(item) {
			if (item.render === undefined&&item.render !== true) {
				var renderTarget = event.currentTarget.children[0].children[0].children[0];
				var rate = Math.round((item.rating.average) / 2);
				var len = 0;
				var urls = [
					'img/icons/star.svg',
					'img/icons/half-star.svg',
					'img/icons/star_border.svg'
				];

				for (var i = 0; i < rate; i++) {
					$mdIcon(urls[0]).then(function(iconEle) {
						renderTarget.appendChild(iconEle);
					});
				}

				if (rate*2 < item.rating.average) {
					$mdIcon(urls[1]).then(function(iconEle) {
						renderTarget.appendChild(iconEle);
						len = 5 - rate-1;
						while (len > 0) {
							$mdIcon(urls[2]).then(function(iconEle) {
								renderTarget.appendChild(iconEle);
							});
							len--;
						}
					});
				}else {
					len = 5 - rate;
					while (len > 0) {
						$mdIcon(urls[2]).then(function(iconEle) {
							renderTarget.appendChild(iconEle);
						});
						len--;
					}
				}

				item.render = true;
			}
			else {
				return;
			}

		};

	}]);
