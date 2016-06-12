/**
 * @Author: Li'Zhuo
 * @Date:   2016-04-08 14:11:25
 * @Email:  topgrd@outlook.com
 * @Project: ES6
 * @Last modified by:   Li'Zhuo
 * @Last modified time: 2016-06-13 00:21:19
 */

angular.module('app')
    .controller('HomeContentCtrl', ['DataService', '$scope', '$q', function(DataService, $scope, $q) {
        $scope.tabs = [{
            label: '正在上映',
            tpl: 'view/home/allItems.html'
        }, {
            label: '即将上映',
            tpl: 'view/home/next.html'
        }, {
            label: '北美票房榜',
            tpl: 'view/home/rank.html'
        }];

    }]);
