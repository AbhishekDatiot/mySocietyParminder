// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', [
    'app.auth',
    'app.logger',
    'app.router',
    'app.layout',
    'app.notice',
    'app.support',
    'app.user',
    'app.complaint',
    'ionic',
    'nl2br',
    'monospaced.elastic'])

    .config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.withCredentials = true;
    }])

    .run(function($ionicPlatform,$rootScope,$http, $ionicConfig, $timeout, $ionicPopup, $ionicHistory, $state, $location, ConnectivityMonitor) {
        $rootScope.currentUser = null;
        $rootScope.currentState = null;
        $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
            $rootScope.currentState=angular.fromJson(toState.pageType);

            if (toState.$$finishAuthorize) {
                return;
            }
            // if (!authorization.isAuthorized(toState.data.access)) {
            //     $rootScope.error = "Seems like you tried accessing a route you don't have access to...";
            //     event.preventDefault();
            //
            //     //if(fromState.url === '^') {
            //     if(authorization.isAuthenticated())
            //     {
            //         toState = angular.extend({'$$finishAuthorize': true}, toState);
            //         $state.go('admin.home', toParams, {notify: false}).then(function() {
            //             $rootScope.$broadcast('$stateChangeSuccess', toState, toParams, fromState, fromParams);
            //         });
            //         //$state.go('admin.home');
            //     }
            //     else {
            //         $rootScope.error = null;
            //         toState = angular.extend({'$$finishAuthorize': true}, toState);
            //         $state.go('meter.login', toParams, {notify: false}).then(function() {
            //             $rootScope.$broadcast('$stateChangeSuccess', toState, toParams, fromState, fromParams);
            //         });
            //     }
            //     // }
            // }

            ConnectivityMonitor.startWatching();

        });


        $ionicPlatform.ready(function() {
            console.log('ready platform')
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });

        $ionicPlatform.registerBackButtonAction(function(event) {
            console.log('Back button')
            console.log(event)
            event.preventDefault();
            if (true) { // your check here
                $ionicPopup.confirm({
                    title: 'System warning',
                    template: 'are you sure you want to exit?'
                }).then(function(res) {
                    if (res) {
                        window.close();
                        // ionic.Platform.exitApp();
                    }
                })
            }
        }, 100);

        // $ionicPlatform.registerBackButtonAction(function(e) {
        //     console.log(e)
        //     e.preventDefault();
        //     function showConfirm() {
        //         var confirmPopup = $ionicPopup.show({
        //             title : 'Exit My Society?',
        //             template : 'Are you sure you want to exit My Society?',
        //             buttons : [{
        //                 text : 'Cancel',
        //                 type : ' button-assertive',
        //             }, {
        //                 text : 'OK',
        //                 type : 'button-positive',
        //                 onTap : function() {
        //                     ionic.Platform.exitApp();
        //                 }
        //             }]
        //         });
        //     };
        //
        //     // Is there a page to go back to?
        //     if ($ionicHistory.backView()) {
        //         // Go back in history
        //         console.log('can Go Back '+$location.path());
        //         $ionicHistory.backView().go();
        //     } else {
        //         // This is the last page: Show confirmation popup
        //         console.log('pa '+$location.path());
        //         if ($location.path() === "/app/notice" || $location.path() === "/login") {
        //             showConfirm();
        //         } else {
        //             $ionicHistory.clearHistory();
        //             $ionicHistory.clearCache();
        //             $ionicHistory.nextViewOptions({
        //                 disableBack: true
        //             });
        //             $state.go('app.notice');
        //         }
        //
        //     }
        //
        //     return false;
        // }, 101);
    });
