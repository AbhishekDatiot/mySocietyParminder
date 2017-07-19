(function() {
    'use strict';

    angular
        .module('app.auth')
        .controller('SignoutController', SignoutController);

    SignoutController.$inject = ['$state', 'principal', '$ionicHistory' , '$localStorage' , '$window'];
    /* @ngInject */
    function SignoutController($state, principal, $ionicHistory , $localStorage , $window) {
        var vm = this;

        activate();

        function activate() {
            principal.signout();
            $ionicHistory.clearHistory();
            $ionicHistory.clearCache();
            $ionicHistory.nextViewOptions({
                disableBack: true
            });

            $state.go('startAction');

        }


    }
})();

