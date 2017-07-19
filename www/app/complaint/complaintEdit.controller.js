(function () {
    'use strict';

    angular
        .module('app.complaint')
        .controller('complaintEditController', complaintEditController);

    complaintEditController.$inject = ['$q', 'logger','complainFactory','$stateParams','$state','$ionicHistory'];
    /* @ngInject */
    function complaintEditController($q, logger,complainFactory, $stateParams, $state, $ionicHistory) {

        var vm = this;
        vm.progress = true;
        vm.send = {};

        activate();

        function activate() {
            complainFactory.getStatus().then(function (response) {
                vm.masterComplaintStatusList = response.data;
                vm.complaintStatusList = [];
                for(var index=1 ; index<vm.masterComplaintStatusList.length ; index++){
                    console.log(vm.complaintStatusList)
                    var temp = vm.masterComplaintStatusList[index].split("_");
                    if(temp.length > 1){
                        console.log(temp)
                        var newTemp = "";
                        for(var j=0 ; j<temp.length ; j++){
                            newTemp = newTemp + temp[j] + " ";
                        }
                        vm.complaintStatusList.push(newTemp);
                    }
                    else
                       vm.complaintStatusList.push(vm.masterComplaintStatusList[index]);
                }
                findComplaintData();
            });

            complainFactory.getType().then(function (response) {
                vm.complaintTypeList = response.data;
            });
        }

        function findComplaintData() {
            complainFactory.findComplaint($stateParams.id).then(function (response) {
                console.log(response)
                if (response.status == 200) {
                    vm.progress = false;
                    vm.complaintData = response.data;
                    console.log(vm.complaintData)
                    for(var index=1 ; index < vm.masterComplaintStatusList.length ; index++){
                        if(vm.masterComplaintStatusList[index] == vm.complaintData.status)
                            vm.complaintData.status = vm.complaintStatusList[index - 1];
                    }

                    console.log(vm.complaintData)

                }
                else if (response.status == -1) {
                    logger.error('Network Error', 'error');
                }
                else if (response.status == 400) {
                    logger.error(response.data[0].message, 'error');
                }
                else if (response.status == 401) {
                    logger.info("User is not logged in. Redirecting to Login Page");
                    $state.go('signout')
                }
                else {
                    logger.error('error');
                }
            });
        }

        vm.submit = function () {
            console.log(vm.complaintData)
            vm.send = vm.complaintData;
            for(var index=0 ; index < vm.complaintStatusList.length ; index++){
                if(vm.complaintStatusList[index] == vm.complaintData.status)
                    vm.send.status = vm.masterComplaintStatusList[index+1];
            }

            var firstError = null;
            if (vm.Form.$invalid) {
                validationHelperFactory.manageValidationFailed(vm.Form);
                return;
            }
            else {
                complainFactory.editComplaint($stateParams.id,vm.send).then(function (response) {

                    if (response.status == 200) {
                        logger.info('Complaint edited', 'default');
                        $state.go('app.complaintList');
                        $ionicHistory.nextViewOptions({
                            disableBack: true
                        });
                    }
                    else if (response.status == -1) {
                        logger.error('Network Error', 'error');
                    }
                    else if (response.status == 400) {
                        logger.error('error');
                    }
                    else if (response.status == 401) {
                        logger.info("User is not logged in. Redirecting to Login Page");
                        $state.go('signout')
                    }
                    else {
                        logger.error(response.data[0].message, 'error');
                    }
                });

            }
        };

        vm.onCancel = function () {
            vm.Form.$setPristine();
            $state.go('app.complaintList');
        }

    }
})();

