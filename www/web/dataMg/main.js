/**
 * Created by Wpeach on 2016/11/16.
 */
angular.module('netMg.module.data',[])
  .config(['$stateProvider',function ($stateProvider) {
    $stateProvider
      .state('app.dataMenu',{
        url:'/dataMenu',
        views:{
          'data-mg':{
            templateUrl:'web/dataMg/templates/dataMenu.html',
            controller:'DataController'
          }
        }
      })
      .state('app.device',{
        url:'/device',
        views:{
          'data-mg':{
            templateUrl:'web/dataMg/templates/device.html',
            controller:'DataController'
          }
        }
      })
  }])
