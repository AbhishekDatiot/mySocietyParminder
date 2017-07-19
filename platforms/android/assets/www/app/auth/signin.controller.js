(function () {
  'use strict';

  angular
      .module('app.auth')
      .controller('SigninController', SigninController);

  SigninController.$inject = ['$scope', '$state' ,'principal' , 'logger' , '$localStorage'];
  /* @ngInject */
  function SigninController($scope, $state, principal, logger , $localStorage) {
    var vm = this;

      vm.signin = signin;

      function signin() {

          principal.signin(vm.mobile, vm.password).then(function (user) {
              if(user.principal.role == 'ROLE_CONSUMER'){
                  $localStorage._identity = user;
                  $state.go('app.notice');
              }
              else
                  logger.error('You are not a consumer');

          }, function () {

              logger.error("Please enter valid credentials");

          });
      }


      activate();

      function activate() {
          //TODO to be removed;
          // vm.user = __env.user;
          // vm.password = __env.password;

      }
  }
})();