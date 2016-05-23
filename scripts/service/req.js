/**
 * @Author: Li'Zhuo
 * @Date:   2016-05-23 08:50:58
 * @Email:  topgrd@outlook.com
 * @Project: ES6
 * @Last modified by:   Li'Zhuo
 * @Last modified time: 2016-05-23 09:07:42
 */

var request = require('request');
var cheerio = require('cheerio');
var options = {
    url: 'https://movie.douban.com/subject/25820460',
    headers: {
        'User-agent': 'request'
    }
};
request(options, function(error, response, body) {

    if (!error && response.statusCode == 200) {
        var ch = cheerio.load(body);
        var url = ch('.related-pic-video').attr('href');
        var arr = url.split('/');
        var sourceUrl = 'https://movie.douban.com/trailer/video_url';
        var trueUrl = sourceUrl + '?tid=' + arr[4];
        console.log(trueUrl);
    }
});
