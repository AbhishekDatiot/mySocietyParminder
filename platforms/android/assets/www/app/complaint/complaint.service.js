(function () {
    'use strict';

    angular
        .module('app.complaint')
        .factory('complainFactory',complainFactory);

    complainFactory.$inject = ['$http' , '__env'];

    function complainFactory($http , __env) {
        var service = {};

        service.getType = function () {
            var promise = $http.get(__env.dataServerUrl + '/complaintType')
                .then(
                    function (response) {
                        return response;
                    },
                    function (response) {
                        return response;
                    });
            return promise;
        };

        service.getStatus = function () {
            var promise = $http.get(__env.dataServerUrl + '/complaintStatus')
                .then(
                    function (response) {
                        return response;
                    },
                    function (response) {
                        return response;
                    });
            return promise;
        };


        service.lodgeComplaint = function (complainData) {
            var promise = $http.post(__env.dataServerUrl + '/createComplaint', complainData)
                .then(
                    function (response) {
                        return response;
                    },
                    function (response) {
                        return response;
                    });
            return promise;
        };

        service.getComplaintByUser = function (id) {
            var promise = $http.get(__env.dataServerUrl + '/complaint/findByUser?societyId=' +id)
                .then(
                    function (response) {
                        return response;
                    },
                    function (response) {
                        return response;
                    });
            return promise;
        };

        service.getResolvedComplaintByUser = function () {
            var promise = $http.get(__env.dataServerUrl + '/complaint/findByStatus?status=Resolved')
                .then(
                    function (response) {
                        return response;
                    },
                    function (response) {
                        return response;
                    });
            return promise;
        };

        service.getClosedComplaintByUser = function () {
            var promise = $http.get(__env.dataServerUrl + '/complaint/findByStatus?status=Closed')
                .then(
                    function (response) {
                        return response;
                    },
                    function (response) {
                        return response;
                    });
            return promise;
        };

        service.findComplaint = function (id) {
            var promise = $http.get(__env.dataServerUrl + '/complaint/' + id)
                .then(
                    function (response) {
                        return response;
                    },
                    function (response) {
                        return response;
                    });
            return promise;
        };

        service.editComplaint = function (id,complainData) {
            var promise = $http.put(__env.dataServerUrl + '/editComplaint/' + id,complainData)
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
