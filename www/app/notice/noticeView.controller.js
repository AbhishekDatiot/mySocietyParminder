(function () {
    'use strict';

    angular
        .module('app.notice')
        .controller('viewNoticeController', viewNoticeController);

    viewNoticeController.$inject = ['$state' , 'logger' , 'noticeFactory'  , '$stateParams' , '$localStorage' , '$scope' ];
    /* @ngInject */
    function viewNoticeController( $state, logger, noticeFactory  , $stateParams , $localStorage , $scope  ) {
        var vm = this;
        vm.progress = true;

        activate();

        function activate(){
            vm.post = $stateParams.notice;

            noticeFactory.addReadRecipient($stateParams.notice.id , $localStorage._identity.principal).then(function (response) {
                if (response.status == 200) {
                    vm.progress = false;
                }
                else if (response.status == -1) {
                    vm.errorMessage = 'Network Error';
                    logger.error('Network Error', 'error');
                }
                else if (response.status == 400) {
                    vm.errorMessage = response.data[0].message;
                    logger.error(response.data[0].message, 'error');
                }
                else if( response.status == 401){
                    logger.info("User is not logged in. Redirecting to Login Page");
                    $state.go('signout')
                }
                else {
                    vm.errorMessage = 'Some problem';
                    logger.error('Some problem', 'error');
                }
            })

        }

        // vm.Download = function (urlLink) {
        //     ionic.Platform.ready(function(){
        //         var url = urlLink;
        //         var filename = url.split("/").pop();
        //         var targetPath = cordova.file.externalRootDirectory + 'Pictures/' + filename;
        //
        //         $cordovaFileTransfer.download(url, targetPath, {}, true).then(function (result) {
        //             $scope.hasil = 'Save file on '+targetPath+' success!';
        //             $scope.mywallpaper=targetPath;
        //         }, function (error) {
        //             $scope.hasil = 'Error Download file';
        //         }, function (progress) {
        //             $scope.downloadProgress = (progress.loaded / progress.total) * 100;
        //         });
        //     });
        // }
    }
})();