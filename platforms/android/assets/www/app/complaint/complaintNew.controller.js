(function () {
    'use strict';

    angular
        .module('app.complaint')
        .controller('complaintNewController', complaintNewController);

    complaintNewController.$inject = ['$scope', '$state' , 'logger' , 'complainFactory' , '$ionicHistory' ];
    /* @ngInject */
    function complaintNewController($scope, $state, logger, complainFactory , $ionicHistory ) {
        var vm = this;
        vm.progress = true;
        vm.complainData = {};
        activate();
        
        function activate() {
            complainFactory.getType().then(function (response) {
                if(response.status == 200)
                    vm.progress = false;
                    vm.complaintTypeList = response.data;
            })
        }

        vm.submit = function () {
            vm.complainData.complaintType = vm.complaintType;
            vm.complainData.description = vm.description;

            var firstError = null;
            if (vm.Form.$invalid) {
                validationHelperFactory.manageValidationFailed(vm.Form);
                return;
            }
            else {
                complainFactory.lodgeComplaint(vm.complainData).then(function (response) {

                    if (response.status == 200) {
                        logger.info('Complaint Lodged', 'default');
                        $state.go('app.complaintList');
                        $ionicHistory.nextViewOptions({
                            disableBack: true
                        });
                    }
                    else if (response.status == -1) {
                        logger.error('Network Error', 'error');
                    }
                    else if (response.status == 400) {
                        logger.error(response.data[0].message, 'error');
                    }
                    else {
                        logger.error(response.data[0].message, 'error');
                    }
                });

            }
        };

        vm.onCancel = function() {
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $state.go("app.complaintList");
        }
    }
})();