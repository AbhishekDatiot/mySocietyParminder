(function () {
  'use strict';

  angular
    .module('app.layout')
    .controller('sideMenuController', sideMenuController);

  sideMenuController.$inject = ['$localStorage' , '$ionicSideMenuDelegate' , '$scope'];
  /* @ngInject */
  function sideMenuController($localStorage , $ionicSideMenuDelegate , $scope) {
    var vm = this;
      activate();

    function activate() {
      vm.user = angular.copy($localStorage._identity.principal);
    }
    $scope.$watch(function () {
          return $ionicSideMenuDelegate.isOpenLeft();
        },
        function (isOpen) {
          if (isOpen){
            vm.user = angular.copy($localStorage._identity.principal);
          }
        });
  }

})();
