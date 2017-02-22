/**
 * Created by Wpeach on 2016/11/16.
 */
angular.module('netMg.module.data')
  .controller('DataController',function ($scope,DataService,$ionicLoading,$ionicSlideBoxDelegate) {
    // $scope.$on('$ionicView.loaded',function () {
    // });
    // $ionicLoading.show({
    //   template:'数据加载中…'
    // });
    // $scope.getRoom1=function () {
    //   DataService.getRoom1().then(function (response) {
    //     if(response){
    //       $ionicLoading.hide();
    //       $scope.room1=response.data;
    //       console.log(response);
    //     }else {
    //       $ionicLoading.hide();
    //       console.log('获取room1失败');
    //     }
    //   });
    // };
    // $scope.getRoom2=function () {
    //   DataService.getRoom2().then(function (response) {
    //     if(response){
    //       $ionicLoading.hide();
    //       $scope.room2=response.data;
    //       console.log(response);
    //     }else {
    //       $ionicLoading.hide();
    //       console.log('获取room2失败');
    //     }
    //   });
    // };
    // $scope.getRoom3=function () {
    //   DataService.getRoom3().then(function (response) {
    //     if(response){
    //       $ionicLoading.hide();
    //       $scope.room3=response.data;
    //       console.log(response);
    //     }else {
    //       $ionicLoading.hide();
    //       console.log('获取room2失败');
    //     }
    //   });
    // };
    // $scope.getRoom4=function () {
    //   DataService.getRoom4().then(function (response) {
    //     if(response){
    //       $ionicLoading.hide();
    //       $scope.room4=response.data;
    //       console.log(response);
    //     }else {
    //       $ionicLoading.hide();
    //       console.log('获取room2失败');
    //     }
    //   })
    // };

    $scope.tabNames=['1','2','3','4'];
    $scope.slectIndex=0;
    $scope.activeSlide=function(index){//点击时候触发
      $scope.slectIndex=index;
      $ionicSlideBoxDelegate.slide(index);
    };
    $scope.slideChanged=function(index){//滑动时候触发
      $scope.slectIndex=index;
      // $scope.doRefresh(index);
    };
    $scope.pages=["web/dataMg/templates/room1.html","web/dataMg/templates/room2.html","web/dataMg/templates/room3.html","web/dataMg/templates/room4.html"];

  });
