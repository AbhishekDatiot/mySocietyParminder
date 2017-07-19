(function () {
    'use strict';

    angular
        .module('app.complaint')
        .controller('complaintListController', complaintListController);

    complaintListController.$inject = ['$scope', '$state' , 'logger' , 'complainFactory' , '$ionicHistory' , '$ionicPopup', '$localStorage' ];
    /* @ngInject */
    function complaintListController($scope, $state, logger, complainFactory , $ionicHistory , $ionicPopup , $localStorage ) {
        var vm = this;
        vm.progress = true;
        vm.selectedFilter = null;
        vm.count = 0;
        activate();

        function activate() {
            vm.isActiveSelected = true;
            vm.isResolvedSelected = false;
            complainFactory.getType().then(function (response) {
                if(response.status == 200)
                    vm.complaintTypeList = response.data;
                if (response.status == 401) {
                    logger.info("User is not logged in. Redirecting to Login Page");
                    $state.go('signout')
                }
            });

            complainFactory.getComplaintByUser($localStorage._identity.principal.societyId).then(function (response) {
                vm.count++;
                showScreen();
                vm.masterComplaintList = response.data;
                for(var index=0 ; index<vm.masterComplaintList.length ; index++){
                    var temp = vm.masterComplaintList[index].status.split("_");
                    if(temp.length > 1){
                        var newTemp = "";
                        for(var j=0 ; j<temp.length ; j++){
                            newTemp = newTemp + temp[j] + " ";
                        }
                        vm.masterComplaintList[index].status = newTemp;
                    }
                }
                vm.complaintList = vm.masterComplaintList;
            }, function (error) {
            });

            complainFactory.getResolvedComplaintByUser().then(function (response) {
                vm.count++;
                showScreen();
                console.log(response);
                if(response.status == 200){
                    vm.masterResolvedComplaintList = response.data;
                }
                else if(response.status == 404){
                    vm.masterResolvedComplaintList = null;
                }
                // vm.resolvedComplaintList = vm.masterResolvedComplaintList;
            }, function (error) {

            });

            complainFactory.getClosedComplaintByUser().then(function (response) {
                vm.count++;
                showScreen();
                console.log(response)
                if(response.status == 200){
                    vm.masterClosedComplaintList = response.data;
                }
                else if(response.status == 404){
                    vm.masterClosedComplaintList = null;
                }

                // vm.closedComplaintList = vm.masterClosedComplaintList;
            }, function (error) {

            });
        }

        function showScreen() {
            if(vm.count == 3)
                vm.progress = false;
        }

        vm.changeView = function (view) {
            $scope.vm.selectedFilter = null;
            if(view == 'Active'){
                vm.complaintList = [];
                vm.complaintList = vm.masterComplaintList;
                vm.isActiveSelected = true;
                vm.isResolvedSelected = false;
            }
            else {
                vm.complaintList = [];
                if(vm.masterResolvedComplaintList != null  && vm.masterResolvedComplaintList[0].logref == undefined){
                    for(var index=0 ; index < vm.masterResolvedComplaintList.length ; index++){
                        vm.complaintList.push(vm.masterResolvedComplaintList[index])
                    }
                }
                if(vm.masterClosedComplaintList != null && vm.masterClosedComplaintList[0].logref == undefined) {
                    for (var index = 0; index < vm.masterClosedComplaintList.length; index++) {
                        vm.complaintList.push(vm.masterClosedComplaintList[index])
                    }
                }
                vm.isActiveSelected = false;
                vm.isResolvedSelected = true;
            }
        }

        vm.filterComplaintList = function() {
            $scope.complaintList = [];
            $scope.complaintList.push('All');
            for(var index=0 ; index<vm.complaintTypeList.length; index++){
                $scope.complaintList.push(vm.complaintTypeList[index]);
            }

            if($scope.vm.selectedFilter == null){
                $scope.vm.selectedFilter = $scope.complaintList[0];
            }
            var temp = $scope.vm.selectedFilter;

            // An elaborate, custom popup
            var myPopup = $ionicPopup.show({
                templateUrl: 'app/complaint/popup-quantity.html',
                title: 'List Type',
                scope: $scope,
                buttons: [
                    {
                        text: 'Cancel',
                        onTap: function(e) {
                            if (!$scope.vm.selectedFilter) {
                                //don't allow the user to close unless he enters note
                                 e.preventDefault();
                            } else {
                                return ($scope.vm.selectedFilter = temp);
                            }
                        }
                    },
                    {
                        text: '<b>Save</b>',
                        type: 'button-balanced',
                        onTap: function(e) {
                            if (!$scope.vm.selectedFilter) {
                                //don't allow the user to close unless he enters note
                                e.preventDefault();
                            } else {
                                return $scope.vm.selectedFilter;
                            }
                        }
                    },
                ]
            });
            myPopup.then(function(res) {
                vm.complaintList = [];
                if(vm.isActiveSelected){
                    if(res == 'All'){
                        vm.complaintList = vm.masterComplaintList;
                    }
                    else {
                        for(var index=0; index<vm.masterComplaintList.length; index++){
                            if(res == vm.masterComplaintList[index].complaintType){
                                vm.complaintList.push(vm.masterComplaintList[index]);
                            }
                        }
                    }
                }
                else {
                    if(res == 'All'){
                        if(vm.masterResolvedComplaintList != null){
                            for(var index=0 ;index < vm.masterResolvedComplaintList.length ; index++){
                                vm.complaintList.push(vm.masterResolvedComplaintList[index]);
                            }
                        }
                        if(vm.masterClosedComplaintList != null){
                            for(var index=0 ;index < vm.masterClosedComplaintList.length ; index++){
                                vm.complaintList.push(vm.masterClosedComplaintList[index]);
                            }
                        }
                    }
                    else {
                        if(vm.masterResolvedComplaintList != null && vm.masterResolvedComplaintList[0].logref == undefined){
                            for(var index=0; index<vm.masterResolvedComplaintList.length; index++){
                                if(res == vm.masterResolvedComplaintList[index].complaintType){
                                    vm.complaintList.push(vm.masterResolvedComplaintList[index]);
                                }
                            }
                        }
                        if(vm.masterClosedComplaintList != null && vm.masterClosedComplaintList[0].logref == undefined) {
                            for (var index = 0; index < vm.masterClosedComplaintList.length; index++) {
                                if (res == vm.masterClosedComplaintList[index].complaintType) {
                                    vm.complaintList.push(vm.masterClosedComplaintList[index]);
                                }
                            }
                        }
                    }
                }

                // $scope.complaintList = res;
            });
        };

    }
})();