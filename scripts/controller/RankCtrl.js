/**
 * @Author: Li'Zhuo
 * @Date:   2016-05-02 12:54:31
 * @Email:  topgrd@outlook.com
 * @Project: ES6
 * @Last modified by:   Li'Zhuo
 * @Last modified time: 2016-05-06 15:06:50
 */

angular.module('app')
    .controller('RankCtrl', ['DataService', '$scope', '$q', '$interval', '$mdIcon', function(DataService, $scope, $q, $interval, $mdIcon) {
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
            url: 'https://api.douban.com/v2/movie/us_box',
            headers: {
                'User-agent': 'request'
            }
        };

        DataService.getHotMovies(options)
            .then(function(data) {
                self.activated = false;
                $scope.allItems = data;
            });

        $scope.renderRating = function(item) {
            if (item.render === undefined && item.render !== true) {
                var renderTarget = event.currentTarget.children[0].children[0].children[0];
                var rate = Math.round((item.rating.average) / 2);
                var len = 0;
                var urls = [
                    'img/icons/star.svg',
                    'img/icons/half-star.svg',
                    'img/icons/star_border.svg'
                ];

                for (var i = 0; i < rate; i++) {
                    $mdIcon(urls[0]).then(function(iconEle) {
                        renderTarget.appendChild(iconEle);
                    });
                }

                if (rate * 2 < item.rating.average) {
                    $mdIcon(urls[1]).then(function(iconEle) {
                        renderTarget.appendChild(iconEle);
                        len = 5 - rate - 1;
                        while (len > 0) {
                            $mdIcon(urls[2]).then(function(iconEle) {
                                renderTarget.appendChild(iconEle);
                            });
                            len--;
                        }
                    });
                } else {
                    len = 5 - rate;
                    while (len > 0) {
                        $mdIcon(urls[2]).then(function(iconEle) {
                            renderTarget.appendChild(iconEle);
                        });
                        len--;
                    }
                }

                item.render = true;
            } else {
                return;
            }

        };

    }]);
