(function() {
    'use strict';

    angular
        .module('app.complaint')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'app.complaintList',
                config: {
                    url: '/complaint',
                    templateUrl: 'app/complaint/complaintList.html',
                    controller: 'complaintListController',
                    controllerAs: 'vm'
                }
            },
            {
                state: 'app.newComplaint',
                config: {
                    url: '/newComplaint',
                    templateUrl: 'app/complaint/newComplaint.html',
                    controller: 'complaintNewController',
                    controllerAs: 'vm'
                }
            },
            {
                state: 'app.editComplaint',
                config: {
                    url: '/:id/editComplaint',
                    templateUrl: 'app/complaint/editComplaint.html',
                    controller: 'complaintEditController',
                    controllerAs: 'vm'
                }
            }
        ];
    }
})();
