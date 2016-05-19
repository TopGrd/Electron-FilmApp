/**
 * @Author: Li'Zhuo
 * @Date:   2016-05-19 08:20:08
 * @Email:  topgrd@outlook.com
 * @Project: ES6
* @Last modified by:   Li'Zhuo
* @Last modified time: 2016-05-19 15:02:54
 */

angular.module('app')
    .controller('DetailCtrl', ['DataService', '$scope', '$q', '$interval', '$mdIcon', '$routeParams', function(DataService, $scope, $q, $interval, $mdIcon, $routeParams) {
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
        var id = $routeParams.itemId;
        var options = {
            url: 'https://api.douban.com/v2/movie/subject/' + id,
            headers: {
                'User-agent': 'request'
            }
        };

        DataService.getHotMovies(options, true)
            .then(function(data) {
                self.activated = false;
                $scope.detail = data;
                console.log($scope.detail);
            });

    }]);
