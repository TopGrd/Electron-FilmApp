/**
 * MovieController
 *
 * @description :: Server-side logic for managing movies
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
"use strict";
var request = require('request');
var cheerio = require('cheerio');
module.exports = {
    create: function (req, res) {
        var options = {
            url: 'https://movie.douban.com/nowplaying/chengdu/',
            headers: {
                'User-Agent': 'request'
            }
        };
        request(options, function (error, response, body) {

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
                    }, function (err, user) {
                        if (err) console.log(err);
                        if (!user) {
                            console.log("创建！");
                            var detail = {};
                            request(options, function (error, response, data) {
                                if (!error && response.statusCode == 200) {
                                    detail = JSON.parse(data);


                                    Movie.create(detail, function onSuccess(err, newUser) {
                                        if (err) {
                                            return res.negotiate(err);
                                        }
                                    });
                                }
                            });
                        }
                        else {
                            console.log(user);
                        }

                    })
                }

            }
        });
    }
};
