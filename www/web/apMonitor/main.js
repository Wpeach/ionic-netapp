/**
 * Created by Wpeach on 2016/11/16.
 */
angular.module("netMg.module.ap",[])
  .config(['$stateProvider',function ($stateProvider) {
    $stateProvider
      .state('app.apMonitor',{
        url:'/apMonitor',
        views:{
          'ap-monitor':{
            templateUrl:'web/apMonitor/templates/apMonitor.html',
            controller:'ApController'
          }
        }
      })
      .state('app.apMenu',{
        url:'/apMenu',
        cache: false,
        views:{
          'ap-monitor':{
            templateUrl:'web/apMonitor/templates/apMenu.html',
            controller:'ApController'
          }
        }
      })
  }]);
