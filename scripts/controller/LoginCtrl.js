/**
 * @Author: Li'Zhuo
 * @Date:   2016-05-24 19:50:41
 * @Email:  topgrd@outlook.com
 * @Project: ES6
 * @Last modified by:   Li'Zhuo
 * @Last modified time: 2016-06-12 00:14:03
 */
angular.module('app').controller('LoginCtrl', ['$scope', '$http', '$mdDialog', function($scope, $http, $mdDialog) {
    var self = this;
    $scope.user = {};
    var alert;
    alert = $mdDialog.alert()
        .title('错误')
        .content('用户名或密码错误，请重新尝试!')
        .ok('确定');
    $scope.login = function() {
        $http({
                method: 'POST',
                url: 'http://localhost:1337/login',
                params: {
                    'name': $scope.user.name,
                    'password': $scope.user.password
                }
            })
            .success(function(data) {
                console.log(data);
                $scope.$emit('loginData', data);
                if (data.login) {
                    location.assign('#/');
                } else {
                    $mdDialog.show(alert);
                }

            })
    };
}]);
