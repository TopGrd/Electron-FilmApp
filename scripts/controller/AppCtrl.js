/**
 * @Author: Li'Zhuo
 * @Date:   2016-04-08 09:12:48
 * @Email:  topgrd@outlook.com
 * @Project: ES6
 * @Last modified by:   Li'Zhuo
 * @Last modified time: 2016-06-05 16:37:14
 */

angular.module('app')
    .controller('AppCtrl', ['$rootScope', '$scope', '$interval', '$timeout', '$mdSidenav', '$log', function($rootScope, $scope, $interval, $timeout, $mdSidenav, $log) {
        var self = this;
        self.notify = false;
        $scope.remote = require('remote');
        // 引入App模块
        var App = $scope.remote.require('app');
        var Win = $scope.remote.require('browser-window');
        // 获取当前焦点窗体
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
        /**
         * 最小化按钮响应方法
         * @return null
         */
        $scope.smallWin = function() {
            broWin.minimize();
        };

        /**
         * 最大化按钮响应方法
         * @return null
         */
        $scope.fullWin = function() {
            // 如果程序没有最大化，则按钮生效，否则保持原状态
            if (!broWin.isMaximized()) {
                broWin.maximize();
            } else {
                broWin.restore();
            }

        };

        /**
         * 关闭按钮响应方法
         * @return null
         */

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
