(function () {
    'use strict';

    angular
        .module('app.support')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state:'app.support',
                config: {
                    url: '/support',
                    templateUrl: 'app/support/support.html'
                }
            }
        ];
    }
})();

