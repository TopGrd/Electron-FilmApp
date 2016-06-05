/**
 * @Author: Li'Zhuo
 * @Date:   2016-05-19 08:20:08
 * @Email:  topgrd@outlook.com
 * @Project: ES6
 * @Last modified by:   Li'Zhuo
 * @Last modified time: 2016-06-05 18:34:04
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
                renderChart();
                console.log($scope.detail);
            });

        function renderChart() {
            var myChart = echarts.init(document.getElementById('main'), 'shine');
            var myChart2 = echarts.init(document.getElementById('main2'), 'shine');

            // 指定图表的配置项和数据
            var option = {
                title: {
                    text: "最近票房"
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['第一周', '第二周', '第三周']
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [{
                    type: 'category',
                    boundaryGap: false,
                    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                }],
                yAxis: [{
                    type: 'value'
                }],
                color: [
                    '#86D1DB',
                    '#53BDB5',
                    '#5CB2CF'
                ],
                series: [{
                    name: '第一周',
                    type: 'line',
                    smooth: true,
                    areaStyle: {
                        normal: {
                            opacity: 0.6
                        }
                    },
                    data: [150, 232, 201, 154, 190, 330, 410]
                }, {
                    name: '第二周',
                    type: 'line',
                    smooth: true,
                    areaStyle: {
                        normal: {
                            opacity: 0.6
                        }
                    },
                    data: [160, 332, 301, 334, 150, 330, 320]
                }, {
                    name: '第三周',
                    type: 'line',
                    smooth: true,
                    label: {
                        normal: {}
                    },
                    areaStyle: {
                        normal: {
                            opacity: 0.6
                        }
                    },
                    data: [360, 450, 150, 224, 290, 330, 420]
                }]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
            myChart2.setOption(option);
        }

    }]);
