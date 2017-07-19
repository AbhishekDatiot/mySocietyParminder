(function() {
  'use strict';

  angular
    .module('app.core')

.factory('ConnectivityMonitor', function($rootScope, $cordovaNetwork, $ionicPopup){
 
  return {
    isOnline: function(){
      if(ionic.Platform.isWebView()){
        return $cordovaNetwork.isOnline();
      } else {
        return navigator.onLine;
      }
    },
    isOffline: function(){
      if(ionic.Platform.isWebView()){
        return !$cordovaNetwork.isOnline();    
      } else {
        return !navigator.onLine;
      }
    },
    startWatching: function(){
      console.log("watching......");
       var myPopup;
        if(ionic.Platform.isWebView()){
 
          $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
           console.log("went online");
           if(myPopup)
            myPopup.close();
          });
 
          $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
           myPopup =  $ionicPopup.show({
              title : 'No Internet',
              template : 'App is unable to connect to our system. Please check your WIFI or network connectivity',
              buttons : [
                {
                text : 'Exit',
                type : 'button-assertive',
                onTap : function() {
                    window.close();
                    ionic.Platform.exitApp();
                }
              }]
            });    
          });
 
        }
        else {
 
          window.addEventListener("online", function(e) {
            console.log("went online");
            if(myPopup)
              myPopup.close();
          }, false);    
 
          window.addEventListener("offline", function(e) {
            myPopup = $ionicPopup.show({
              title : 'No Internet',
              template : 'App is unable to connect to our system. Please check your WIFI or network connectivity',
              buttons : [
                {
                text : 'Exit',
                type : 'button-assertive',
                onTap : function() {
                    window.close();
                    ionic.Platform.exitApp();
                }
              }]
            });    
          }, false);  
        }       
    }
  }
})
} ());