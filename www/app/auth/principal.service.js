(function () {
  'use strict';

  angular
    .module('app.auth')
    .factory('principal', principal);

  principal.$inject = ['$q', '$http', '$timeout', 'logger', '$localStorage' , '$rootScope'];

  /* @ngInject */
  function principal($q, $http, $timeout, logger, $localStorage , $rootScope ) {
    var _identity = undefined;
    var _authenticated = false;

    var service = {

      signin: signin,
      signout: signout,
    };
    return service;

    function isIdentityInLocalStorage() {
      return angular.isDefined($localStorage._identity);
    }


    function clearLocalStorage() {
      if (isIdentityInLocalStorage()) {
        $localStorage.$reset();
        // delete $localStorage._identity;
        // delete $localStorage.loggedInTimeStamp;
      }
    }

    function signin(user, password) {
      var deferred = $q.defer();
      var headers = {
        authorization : "Basic "
        + btoa(user + ":"
          + password)
      }
      $http.get(__env.dataServerUrl + '/login', {
        headers : headers
      }).then(function(response) {
        if(response.status == 200){
          _authenticated = true;
          deferred.resolve(response.data);
        }
        else {
          clearLocalStorage();
          //_authenticated = false;
          deferred.reject("Invalid Login credentials");
        }
        },
        function (response) {
          _identity = null;
          _authenticated = false;
          deferred.reject(_identity);
          logger.error("Login Failed");
        });

      return deferred.promise;
    }

    function signout() {
      var deferred = $q.defer();
      $http.post(__env.dataServerUrl + '/logout', {}).finally(function() {
        deferred.resolve(_identity);
         if (response.status == 401) {
          logger.info("User is not logged in. Redirecting to Login Page");
          $state.go('login')
        }

      });
      $rootScope.currentUser = null;
      _identity = null;
      _authenticated = false;
      clearLocalStorage();
      return deferred.promise;
    }
    
  }

})();


