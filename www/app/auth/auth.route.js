(function() {
    'use strict';

    angular
        .module('app.auth')
        .run(appRun);

    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'startAction',
                config: {
                    url: '',
                    template: '<div class="spinner" ng-show="vm.progress"><ion-spinner icon="android"></ion-spinner></div>',
                    controller: 'InitController',
                    controllerAs: 'vm'
                }
            },
            {
                state: 'login',
                config: {
                    url: '/login',
                    templateUrl: 'app/auth/login.html',
                    controller: 'SigninController',
                    controllerAs: 'vm'
                }
            },
            {
                state: 'app',
                config: {
                    url: '/app',
                    templateUrl: 'app/layout/sidebar.html',
                    controller: 'sideMenuController',
                    controllerAs: 'vm'
                }
            },
            {
                state: 'signout',
                config: {
                    url: '/signout',
                    controller: 'SignoutController'
                }
            },
            {
                state: 'forgot',
                config: {
                    url: '/forgot',
                    templateUrl: 'app/auth/login_forgot.html',
                    controller: 'ForgotController',
                    controllerAs: 'vm'
                }
            }


        ];
    }
})();
