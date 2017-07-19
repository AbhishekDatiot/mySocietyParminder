(function () {
    'use strict';

    angular
        .module('app.notice')
        .controller('noticeController', noticeController);

    noticeController.$inject = ['$state' , 'logger' , 'noticeFactory' , '$ionicHistory' ];
    /* @ngInject */
    function noticeController($state, logger, noticeFactory , $ionicHistory ) {
        var vm = this;
        vm.progress = true;
        vm.noticeTypeList = ['All', 'Festival' , 'Violation' , 'Announcement' , 'Other'];
        vm.noticeType = vm.noticeTypeList[0];

        activate();

        function activate() {

            noticeFactory.getNotices().then(function (response) {
                if (response.status == 200) {
                    vm.progress = false;
                    vm.adminNoticeList = response.data;
                    vm.noticeList = vm.adminNoticeList;
                }
                else if (response.status == -1) {
                    logger.error('Network Error');
                }
                else if (response.status == 400) {
                }
                else if (response.status == 401) {
                    logger.info("User is not logged in. Redirecting to Login Page");
                    $state.go('signout')
                    // $state.go('login');
                    // $ionicHistory.nextViewOptions({
                    //     disableBack: true
                    // });
                }
                else {
                    logger.error('Some problem');
                }
            });
        }

        vm.populateNoticeList = function () {
            vm.noticeList = [];
            if(vm.noticeType == 'All')
                vm.noticeList = vm.adminNoticeList;
            else {
                for(var index=0 ;index < vm.adminNoticeList.length; index++){
                    if(vm.noticeType == vm.adminNoticeList[index].type)
                        vm.noticeList.push(vm.adminNoticeList[index])
                }
            }
        }
    }
})();