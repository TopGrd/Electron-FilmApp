/**
 * @Author: Li'Zhuo
 * @Date:   2016-04-08 09:12:48
 * @Email:  topgrd@outlook.com
 * @Project: ES6
 * @Last modified by:   Li'Zhuo
 * @Last modified time: 2016-05-24 20:22:31
 */

angular.module('app')
    .controller('AppCtrl', ['$rootScope', '$scope', '$interval', '$timeout', '$mdSidenav', '$log', function($rootScope, $scope, $interval, $timeout, $mdSidenav, $log) {
        var self = this;
        self.notify = false;
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

        $scope.smallWin = function() {
            broWin.minimize();
        };
        $scope.fullWin = function() {
            if (!broWin.isMaximized()) {
                broWin.maximize();
            } else {
                broWin.restore();
            }

        };
        $scope.closeWin = function() {
            App.quit();
        };

        $scope.toggleIt = function() {
            self.notify = !self.notify;
        }
        $scope.logout = function() {
            $mdSidenav('left').toggle();
        }

    }]);
