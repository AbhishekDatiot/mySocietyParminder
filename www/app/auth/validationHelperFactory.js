(function () {
'use strict';
angular
  .module('app')
  .factory('validationHelperFactory', validationHelperFactory);

  validationHelperFactory.$inject=[];
  function validationHelperFactory() {
    var service = {};
  //console.log("1");
    service.manageValidationFailed = function(form) {
      console.log("2");
      var firstError = null;
      var field = null, firstError = null;
      for (field in form) {
        console.log("3");
        if (field[0] != '$') {
          if (firstError === null && !form[field].$valid) {
            firstError = form[field].$name;
          }

          if (form[field].$pristine) {
            form[field].$dirty = true;
          }
        }
      }
      console.log("4");
      angular.element('.ng-invalid[name=' + firstError + ']').focus();
      console.error('Validation Error', 'error');
      console.log("5");
    }

    return service;
  };
})();
