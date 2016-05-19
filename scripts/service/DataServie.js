/**
 * @Author: Li'Zhuo
 * @Date:   2016-04-16 18:24:03
 * @Email:  topgrd@outlook.com
 * @Project: ES6
 * @Last modified by:   Li'Zhuo
 * @Last modified time: 2016-05-19 08:34:50
 */

var request = require('request');
angular.module('app')
    .service('DataService', ['$q', DataService]);

function DataService($q) {
    return {
        getHotMovies: getHotMovies
    };

    function getHotMovies(options, detailType) {
        var deferred = $q.defer();
        request(options, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                var data = JSON.parse(body);
                if (detailType === true) {
                    deferred.resolve(data);
                } else {
                    deferred.resolve(data.subjects);
                }
            }
        });

        return deferred.promise;

    }
}
