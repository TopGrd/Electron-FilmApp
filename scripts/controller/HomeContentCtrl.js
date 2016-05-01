angular.module('app')
	.controller('HomeContentCtrl', ['DataService', '$scope', '$q', '$interval', '$mdIcon', function(DataService, $scope, $q, $interval, $mdIcon) {
		$scope.tabs = [
			{label: '正在上映', tpl: 'view/home/allItems.html'},
			{label: '即将上映', tpl: 'view/home/next.html'},
			{label: '排行榜', tpl: 'view/home/rank.html'}
		];

	}]);
