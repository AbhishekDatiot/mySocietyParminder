(function () {
    'use strict';

    angular
        .module('app.notice')
        .factory('noticeFactory',noticeFactory);

    noticeFactory.$inject = ['$http' , '__env'];

    function noticeFactory($http , __env) {
        var service = {};

        service.getNotices = function (user) {
            var promise = $http.get(__env.dataServerUrl +'/notice')
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

        service.addReadRecipient = function(noticeId , user){
            var promise = $http.put(__env.dataServerUrl + '/addReadRecipient/'+ noticeId , user)
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
