(function() {
    'use strict';

    angular
        .module('app.notice')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'app.notice',
                config: {
                    url: '/notice',
                    templateUrl: 'app/notice/notice.html',
                    controller: 'noticeController',
                    controllerAs: 'vm'
                }
            },
            {
                state: 'app.readNotice',
                config: {
                    url: '/notice',
                    params:{
                      notice: null
                    },
                    templateUrl: 'app/notice/viewNotice.html',
                    controller: 'viewNoticeController',
                    controllerAs: 'vm'
                }
            }
        ];
    }
})();
