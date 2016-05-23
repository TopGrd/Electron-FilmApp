/**
 * @Author: Li'Zhuo
 * @Date:   2016-04-16 18:24:03
 * @Email:  topgrd@outlook.com
 * @Project: ES6
 * @Last modified by:   Li'Zhuo
 * @Last modified time: 2016-05-23 09:07:21
 */

var request = require('request');
var cheerio = require('cheerio');
angular.module('app')
    .service('VideoService', ['$q', VideoService]);

function VideoService($q) {
    return {
        getVideo: getVideo
    };

    function getVideo(options) {
        var deferred = $q.defer();
        request(options, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                var ch = cheerio.load(body);
                var url = ch('.related-pic-video').attr('href');
                var arr = url.split('/');
                var sourceUrl = 'https://movie.douban.com/trailer/video_url';
                var trueUrl = sourceUrl + '?tid=' + arr[4];
                deferred.resolve(trueUrl);
            }
        });

        return deferred.promise;

    }
}
