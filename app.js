/**
 * @Author: Li'Zhuo
 * @Date:   2016-04-07 13:05:02
 * @Email:  topgrd@outlook.com
 * @Project: ES6
 * @Last modified by:   Li'Zhuo
 * @Last modified time: 2016-05-24 20:04:56
 */

var app = angular.module(
    'app', [
        'ngRoute',
        'ngMaterial',
        'ngAnimate',
        'ngRateIt'
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
                '/login', {
                    templateUrl: './view/home/login.html',
                    controller: 'LoginCtrl'
                }
            );
            $routeProvider.when(
                '/allItems', {
                    templateUrl: './view/home/allItems.html',
                    controller: 'AllItemsCtrl'
                }
            );
            $routeProvider.when(
                '/items/:itemId', {
                    templateUrl: './view/home/detail.html',
                    controller: 'DetailCtrl'
                }
            );
            $routeProvider.otherwise({
                redirectTo: '/'
            });
        }
    ]
);
