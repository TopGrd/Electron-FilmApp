/**
 * @Author: Li'Zhuo
 * @Date:   2016-04-07 13:05:02
 * @Email:  topgrd@outlook.com
 * @Project: ES6
 * @Last modified by:   Li'Zhuo
 * @Last modified time: 2016-05-06 10:54:40
 */

var app = angular.module(
    'app', [
        'ngRoute',
        'ngMaterial',
        'ngAnimate'
    ]
).config(
    [
        '$routeProvider',
        function($routeProvider) {
            $routeProvider.when(
                '/', {
                    templateUrl: './view/home/content.html'
                }
            );
            $routeProvider.when(
                '/allItems', {
                    templateUrl: './view/home/allItems.html',
                    controller: 'AllItemsCtrl'
                }
            )
            $routeProvider.otherwise({
                redirectTo: '/'
            });
        }
    ]
);
