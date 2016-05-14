/**
 * @Author: Li'Zhuo
 * @Date:   2016-04-08 09:13:39
 * @Email:  topgrd@outlook.com
 * @Project: ES6
 * @Last modified by:   Li'Zhuo
 * @Last modified time: 2016-05-06 15:06:21
 */

angular.module('app').controller('LeftCtrl', function($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function() {
        $mdSidenav('left').close()
            .then(function() {
                $log.debug('close LEFT is done');
            });
    };
});
