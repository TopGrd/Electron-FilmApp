/**
 * @Author: Li'Zhuo
 * @Date:   2016-04-16 18:24:03
 * @Email:  topgrd@outlook.com
 * @Project: ES6
 * @Last modified by:   Li'Zhuo
 * @Last modified time: 2016-05-06 11:10:08
 */

var request = require('request');
angular.module('app')
    .service('DataService', ['$q', DataService]);

function DataService($q) {
    return {
        getHotMovies: getHotMovies
    };

    function getHotMovies(options) {
        var deferred = $q.defer();
        request(options, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                var data = JSON.parse(body);
                deferred.resolve(data.subjects);
            }
        });

        return deferred.promise;

    }
}
