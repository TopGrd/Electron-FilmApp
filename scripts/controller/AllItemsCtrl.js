angular.module('app')
	.controller('AllItemsCtrl', ['DataService', '$scope', '$q', '$interval', '$mdIcon',function(DataService, $scope, $q, $interval, $mdIcon) {
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
				console.log($mdIcon);
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

		$scope.renderRating = function (item) {
			if (item.render === undefined) {
				var renderTarget = event.currentTarget.children[0].children[0].children[0];
				var rate = (item.rating.average)/2;
				var urls = [
					'img/icons/star.svg',
					'img/icons/half-star.svg',
					'img/icons/star_border.svg'
				];
				for (var i = 1; i < rate; i++) {
					//var target = iconElement.cloneNode(true);
					//renderTarget.appendChild(target);
					$mdIcon(urls[0]).then(function(iconEle) {
						renderTarget.appendChild(iconEle);
					});
				}

				item.render = true;
			}
			else {
				return;
			}

		};
	}]);
