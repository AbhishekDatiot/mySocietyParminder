(function () {
    'use strict';

    angular
        .module('app.auth')
        .controller('ForgotController', ForgotController);

    ForgotController.$inject = ['$state' ,'forgotFactory' ,'logger' , 'validationHelperFactory'];
    /* @ngInject */
    function ForgotController( $state ,forgotFactory ,logger , validationHelperFactory ) {
        var vm = this;

        vm.submit = function(){

            var firstError = null;
            if (vm.forgot_password_form.$invalid) {
                validationHelperFactory.manageValidationFailed(vm.forgot_password_form);
                return;
            }
            else {
                forgotFactory.forgetPwd(vm.phoneNumber).then(function (response) {

                    if (response.status == 200) {
                        logger.info('Message Sent');
                        $state.go('login');
                    }
                    else if (response.status == -1) {
                        logger.set('Network Error', 'error');
                        console.error(response);
                    }
                    else if (response.status == 400) {
                        logger.info(response.data[0].message);
                        console.error(response);
                    }
                    else if( response.status == 401){
                        logger.info("User is not logged in. Redirecting to Login Page");
                        $state.go('signout')
                    }
                    else {
                        logger.error(response.data[0].message);
                    }
                });

            }
        }
    }
})();