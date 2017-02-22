/**
 * Created by Wpeach on 2016/11/16.
 */
angular.module('netMg.module.user')
  .controller('UserController',function ($scope,$ionicLoading,$localStorage,UserService,$state) {
    $scope.user=$localStorage.user;

   $scope.logout=function () {
     $state.go("login");
   }
  })
  .controller('UserDetailCtrl',function ($scope,UserService,$stateParams,$window,$ionicLoading) {
    $ionicLoading.show({
      template:'数据加载中…'
    });
    var id=$stateParams.id;
    $scope.callPhone = function (mobilePhone) {
      console.log("拨打:" + mobilePhone);
      $window.location.href = "tel:" + mobilePhone;
    };
    UserService.getUserDetail(id).then(function (response) {
      if(response){
        $ionicLoading.hide();
        $scope.data=response.data.data;
        var roles=response.data.data.roleNames;
        $scope.data.role=roles.split(',');
      }else {
        $ionicLoading.hide();
      }
    })
  })
  .controller('AddressBookCtrl',function ($scope,UserService,$ionicLetterAvatarSelector,$ionicLoading,$cacheFactory,$state,$stateParams) {
    $scope.$on($ionicLetterAvatarSelector.stateChanged, function($event, selectionActive) {
      console.log("111");
      $scope.selectionActive = selectionActive;
    });
    $scope.status=$stateParams.status;
    $scope.finish =function () {
      $scope.userChoose=$ionicLetterAvatarSelector.getData();
      console.log($scope.userChoose);
      var user_check=$cacheFactory("user_check");
      user_check.put("item",$scope.userChoose);
      $state.go('app.addNew');
    };


    $ionicLoading.show({
      template:'数据加载中…'
    });
    $scope.groups = [];
    var index = 0;
    UserService.getUserList().then(function (response) {
      if(response){
        $ionicLoading.hide();
        angular.forEach(response.data.data,function (item,i,array) {
          if(item['users'].length!=0) {
            $scope.groups[index] = {
              name: item['name'],
              id:item['id'],
              number:item['users'].length,
              items: [],
              show: false
            };
            angular.forEach(item['users'], function (data, j, array) {
              var user = {
                userId:{
                  id:data.id,
                  name:data.name
                },
                loginName:data['loginName'],
                phone: data['mobile']
              };
              $scope.groups[index].items.push(user);
            });
            index++ ;
          }

        });
      }
    });

    $scope.toggleGroup = function(group) {
      group.show = !group.show;
    };
    $scope.isGroupShown = function(group) {
      return group.show;
    };

    $scope.delete = function() {
      // Get selected item IDs
      var selectedItems = $ionicLetterAvatarSelector.getData();

      //Write your code to delete selected items

      // Finish selection
      $ionicLetterAvatarSelector.finish();
    };

  })
;
