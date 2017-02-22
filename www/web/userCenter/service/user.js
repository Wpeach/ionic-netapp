/**
 * Created by Wpeach on 2016/11/21.
 */
angular.module('netMg.module.user')
  .factory('UserService',function (settings,$http,$ionicPopup,$ionicLoading) {

    return{
      getUser:function () {
        var url=settings.server+'/api/sys/user';
        return $http.get(url)
          .then(function (response) {
            return response;
          },function(error){
            $ionicPopup.alert({title:'提示', template:error.status});
            return false;
          })
      },
      getUserList:function () {
        var url=settings.server+'/api/sys/user/all/group';
        return $http.get(url)
          .then(function (response) {
            return response;
          },function(error){
            $ionicPopup.alert({title:'提示', template:error.status});
            return false;
          })
      },
      getUserDetail:function (userId) {
        var url=settings.server+'/api/sys/user/'+userId;
        return $http.get(url)
          .then(function (response) {
            return response;
          },function(error){
            $ionicPopup.alert({title:'提示', template:error.status});
            return false;
          })
      }
    }
  });
