(function () {
    'use strict';

    angular
        .module('app.user')
        .factory('userFactory',userFactory);

    userFactory.$inject = ['$http' , '__env'];

    function userFactory($http , __env) {
        var service = {};

        service.updatePassword = function (passData , id) {
            var promise = $http.put(__env.dataServerUrl + '/changePassword/' + id, passData)
                .then(
                    function (response) {
                        console.log(response);
                        return response;
                    },
                    function (response) {
                        return response;
                    });
            return promise;
        };

        service.userAddress = function (userID) {
            var promise = $http.get(__env.dataServerUrl + '/flatByUser/'  + userID)
                .then(
                    function (response) {
                        console.log(response);
                        return response;
                    },
                    function (response) {
                        return response;
                    });
            return promise;
        };

        service.edit = function (userID, data) {
            console.log(userID)
            var promise = $http.put(__env.dataServerUrl + '/editUser/' + userID, data)
                .then(
                    function (response) {
                        return response;
                    },
                    function (response) {
                        return response;
                    });
            return promise;
        };

        return service;
    };
}());
