(function () {
    'use strict';

    angular
        .module('app.user')
        .controller('userProfileController', userProfileController);

    userProfileController.$inject = ['$state' , 'logger' , 'userFactory' , '$localStorage' , '$ionicHistory'];
    /* @ngInject */
    function userProfileController($state, logger, userFactory , $localStorage , $ionicHistory) {
        var vm = this;
        vm.progress = true;
        vm.passData = {};

        activate();

        function activate() {
            vm.isProfileSelected = true;
            vm.isChangePasswordSelected = false;
            vm.user = angular.copy($localStorage._identity.principal);

            userFactory.userAddress(vm.user.id).then(function(response){
                vm.progress = false;
                if(response.status == 200){
                    vm.user.address = 'Tower:' + response.data.tower + ',Flat No:' + response.data.flatNo;
                }
                else if(response.status == 401){
                    $state.go('auth.signout')
                }
            });
        }

        vm.changeView = function (view) {
            vm.progressInnerView = true;
            if(view == 'Profile'){
                vm.currentPassword = null;
                vm.newPassword = null;
                vm.password2 = null;
                vm.isProfileSelected = true;
                vm.isChangePasswordSelected = false;
                vm.progressInnerView = false;
            }
            else {
                vm.user = angular.copy($localStorage._identity.principal);
                vm.isProfileSelected = false;
                vm.isChangePasswordSelected = true;
                vm.progressInnerView = false;
            }
        }
        
        vm.submitPassword = function () {
            vm.passData.password = vm.currentPassword;
            vm.passData.newPassword = vm.newPassword;
            vm.passData.id = $localStorage._identity.principal.id;

            var firstError = null;
            if (vm.Form.$invalid) {
                validationHelperFactory.manageValidationFailed(vm.Form);
                vm.errorMessage = 'Validation Error';
                return;
            }
            else {
                userFactory.updatePassword(vm.passData, $localStorage._identity.principal.id).then(function (response) {

                    if (response.status == 200) {
                        logger.info('Password Changed', 'default');
                        $state.go('login');
                    }
                    else if (response.status == -1) {
                        vm.errorMessage = 'Network Error';
                        logger.error('Network Error', 'error');
                    }
                    else if (response.status == 400) {
                        vm.errorMessage = response.data.message;
                        logger.error(response.data.message, 'error');
                    }
                    else if (response.status == 401) {
                        logger.info("User is not logged in. Redirecting to Login Page");
                        $state.go('signout')
                    }
                    else {
                        vm.errorMessage = response.data[0].message;
                        logger.error(response.data[0].message, 'error');
                    }
                });

            }
        }

        vm.submitProfile = function () {
            var firstError = null;
            if (vm.profileForm.$invalid) {
                validationHelperFactory.manageValidationFailed(vm.Form);
                vm.errorMessage = "Validation error";
                return;
            }
            else {
                userFactory.edit(vm.user.id, vm.user).then(function (response) {
                    if (response.status == 200) {
                        $localStorage._identity.principal = response.data;
                        $ionicHistory.nextViewOptions({
                            disableBack: true
                        });
                        logger.info('User Saved');
                        $state.go('app.notice')
                    }
                    else if (response.status == -1) {
                        vm.errorMessage = 'Network Error';
                        logger.error('Network Error');
                    }
                    else if (response.status == 400) {
                        vm.errorMessage = response.data[0].message;
                        logger.error(response.data[0].message);
                    }
                    else if (response.status == 401) {
                        logger.info("User is not logged in. Redirecting to Login Page");
                        $state.go('signout')
                    }
                    else {
                        logger.error('Some problem');
                    }
                });

            }
        }

    }
})();