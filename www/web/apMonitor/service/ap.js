/**
 * Created by Wpeach on 2016/11/20.
 */
angular.module('netMg.module.ap')
  .factory('ApService',function (settings,$http,$ionicPopup,$ionicLoading) {
    return{
      getApreal:function () {
        var url=settings.server+'/api/ap/realTime';
        return $http.get(url)
          .then(function (response) {
            return response;
          },function (error) {
            return false;
          })
      },
      getApHisHour:function () {
        var url = settings.server + '/api/ap/hisCounter';
        return $http.get(url)
          .then(function (response) {
            return response;
          }, function (error) {
            return false;
          })
      },
      getAcHisHour:function (acId) {
        var url = settings.server + '/api/ap/hisCounter/?acConfig.id='+acId;
        return $http.get(url)
          .then(function (response) {
            return response;
          }, function (error) {
            return false;
          })
      },
      getApHisDay:function () {
        var url = settings.server + '/api/ap/hisCounter/?viewType=1';
        return $http.get(url)
          .then(function (response) {
            return response;
          }, function (error) {
            $ionicPopup.alert({
              title:'提示',
              template:error.status
            });
            return false;
          })
      },
      getAcHisDay:function (acId) {
        var url = settings.server + '/api/ap/hisCounter/?viewType=1&acConfig.id='+acId;
        return $http.get(url)
          .then(function (response) {
            return response;
          }, function (error) {
            return false;
          })
      },
      getApHisWeek:function () {
        var url = settings.server + '/api/ap/hisCounter/?viewType=4';
        return $http.get(url)
          .then(function (response) {
            return response;
          }, function (error) {
            $ionicPopup.alert({
              title:'提示',
              template:error.status
            });
            return false;
          })
      },
      getAcHisWeek:function (acId) {
        var url = settings.server + '/api/ap/hisCounter/?viewType=4&acConfig.id='+acId;
        return $http.get(url)
          .then(function (response) {
            return response;
          }, function (error) {
            return false;
          })
      },
      getApHisMon:function () {
        var url = settings.server + '/api/ap/hisCounter/?viewType=2';
        return $http.get(url)
          .then(function (response) {
            return response;
          }, function (error) {
            $ionicPopup.alert({
              title:'提示',
              template:error.status
            });
            return false;
          })
      },
      getAcHisMon:function (acId) {
        var url = settings.server + '/api/ap/hisCounter/?viewType=2&acConfig.id='+acId;
        return $http.get(url)
          .then(function (response) {
            return response;
          }, function (error) {
            return false;
          })
      },
      getApHisYear:function () {
        var url = settings.server + '/api/ap/hisCounter/?viewType=3';
        return $http.get(url)
          .then(function (response) {
            return response;
          }, function (error) {
            $ionicPopup.alert({
              title:'提示',
              template:error.status
            });
            return false;
          })
      },
      getAcHisYear:function (acId) {
        var url = settings.server + '/api/ap/hisCounter/?viewType=3&acConfig.id='+acId;
        return $http.get(url)
          .then(function (response) {
            return response;
          }, function (error) {
            return false;
          })
      },
      getAcConfigList:function () {
        var url = settings.server + '/api/ap/acConfigList';
        return $http.get(url)
          .then(function (response) {
            return response;
          }, function (error) {
            return false;
          })
      }
    }
  });
