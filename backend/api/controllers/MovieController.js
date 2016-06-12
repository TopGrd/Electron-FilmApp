/**
 * MovieController
 *
 * @description :: Server-side logic for managing movies
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
"use strict";
var request = require('request');
var cheerio = require('cheerio');
require('echarts');
module.exports = {
    create: function(req, res) {
        var options = {
            url: 'https://movie.douban.com/nowplaying/chengdu/',
            headers: {
                'User-Agent': 'request'
            }
        };
        request(options, function(error, response, body) {

            if (!error && response.statusCode == 200) {

                $ = cheerio.load(body);
                //抓取豆瓣网页中电影信息
                var lists = $('#upcoming .list-item');
                for (let i = 0; i < lists.length; i++) {
                    var id = lists[i].attribs.id;
                    var options = {
                        url: 'https://api.douban.com/v2/movie/subject/' + id,
                        headers: {
                            'User-Agent': 'request'
                        }
                    };
                    Movie.findOne({
                        id: id
                    }, function(err, user) {
                        if (err) console.log(err);
                        if (!user) {
                            console.log("创建！");
                            var detail = {};
                            request(options, function(error, response, data) {
                                if (!error && response.statusCode == 200) {
                                    detail = JSON.parse(data);


                                    Movie.create(detail, function onSuccess(err, newUser) {
                                        if (err) {
                                            return res.negotiate(err);
                                        }
                                    });
                                }
                            });
                        } else {
                            console.log(user);
                        }

                    })
                }

            }
        });
    },
    renderCharts: function(req, res) {

        var boxOption = {
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

        res.json({
            boxOption: boxOption
        })
    }
};
