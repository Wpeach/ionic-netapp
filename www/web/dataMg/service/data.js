/**
 * Created by Wpeach on 2016/11/20.
 */
angular.module('netMg.module.data')
  .factory('DataService',function (settings,$http,$ionicPopup,$ionicLoading) {
    return{
      getRoom1:function () {
        var url='/json/room1.json';
        return $http.get(url)
          .then(function (response) {
            return response;
          },function (error) {
            $ionicPopup.alert({title:'获取room1错误',template:error});
            return false;
          })
      },
      getRoom2:function () {
        var url='/json/room2.json';
        return $http.get(url)
          .then(function (response) {
            return response;
          },function (error) {
            $ionicPopup.alert({title:'获取room2错误',template:error});
            return false;
          })
      },
      getRoom3:function () {
        var url='/json/room3.json';
        return $http.get(url)
          .then(function (response) {
            return response;
          },function (error) {
            $ionicPopup.alert({title:'获取room3错误',template:error});
            return false;
          })
      },
      getRoom4:function () {
        var url='/json/room4.json';
        return $http.get(url)
          .then(function (response) {
            return response;
          },function (error) {
            $ionicPopup.alert({title:'获取room4错误',template:error});
            return false;
          })
      }
    }
  })
