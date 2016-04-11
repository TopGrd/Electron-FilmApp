angular.module('app')
	.controller('AppCtrl', ['$rootScope', '$scope', '$interval', '$timeout', '$mdSidenav', '$log', function($rootScope, $scope, $interval, $timeout, $mdSidenav, $log) {
		$scope.remote = require('remote');
		var App = $scope.remote.require('app');
		var Win = $scope.remote.require('browser-window');

		var broWin = Win.getFocusedWindow();
		this.searchValue = '';

		$scope.toggleRight = buildToggler('left');
		$scope.isOpenRight = function() {
			return $mdSidenav('left').isOpen();
		};

		function buildToggler(navID) {
			return function() {
				$mdSidenav(navID)
					.toggle()
					.then(function() {
						$log.debug('toggle ' + navID + ' is done');
						$log.debug($mdSidenav('left').isOpen());
					});
			};
		}

		$scope.smallWin = function () {
			broWin.minimize();
		}
		$scope.fullWin = function () {
			if (!broWin.isMaximized()) {
				broWin.maximize();
			}
			else {
				broWin.restore();
			}

		}
		$scope.closeWin = function () {
			App.quit();
		}

	}]);
