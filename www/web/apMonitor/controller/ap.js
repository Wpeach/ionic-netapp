/**
 * Created by Wpeach on 2016/11/16.
 */
angular.module('netMg.module.ap')
  .controller('ApController',function ($scope,ApService,$ionicLoading,$ionicSlideBoxDelegate,$filter,$localStorage,$ionicPopup) {
    $scope.$on('$ionicView.beforeEnter',function () {
      $scope.doRefresh($scope.slectIndex)
    });
    $ionicLoading.show({
      template:'数据加载中…'
    });

    $scope.doRefresh=function (page) {
      switch (page){
        case 0:
          $scope.getApreal();
          break;
        case 1:
          $scope.getApHisHour();
          break;
        case 2:
          $scope.getApHisDay();
          break;
        case 3:
          $scope.getApHisWeek();
          break;
        case 4:
          $scope.getApHisMon();
          break;
        case 5:
          $scope.getApHisYear();
          break;
      }
      // window.location.reload();
      $scope.$broadcast('scroll.refreshComplete');
    };
    if(!$localStorage.acConfigs){
      ApService.getAcConfigList().then(function (response) {
        if(response){
          var acConfigList=[];
          angular.forEach(response.data,function (item,i,array) {
            acConfigList.push(item);
          });
          console.log(acConfigList);
          $localStorage.acConfigs=acConfigList;

        }else {
          console.log('获取设备信息失败');
        }
      });
    }


    $scope.getApreal=function () {
      $scope.data1=$localStorage.acConfigs;
      $scope.selectValue=$localStorage.acConfigs[0].id;
      ApService.getApreal().then(function (response) {
        if(response){
          $ionicLoading.hide();
          $scope.options = { scaleShowVerticalLines: false };
          var data=response.data;

          $scope.barLabels = ['arubaac1', 'arubaac2', 'h3cac1', 'h3cac2', 'h3cac3', 'h3cac4', 'h3cac5','h3cac6','ruijieac主'];
          $scope.barData = [
            [ data.arubaac1, data.arubaac2, data.h3cac1, data.h3cac2, data.h3cac3, data.h3cac4, data.h3cac5,data.h3cac6,data.ruijieac主]
          ];
          $scope.barTotal=data.arubaac1+data.arubaac2+data.h3cac1+data.h3cac2+data.h3cac3+data.h3cac4+data.h3cac5+data.h3cac6+data.ruijieac主;
        }else {
          $ionicLoading.hide();
          console.log('获取AP实时数据失败');
        }
      });
    };

    $scope.getApHisHour=function () {
      ApService.getApHisHour().then(function (response) {
        if(response){
          $ionicLoading.hide();
          var data=response.data;
          $scope.apHourData=[];
          var tempdata = [];
          $scope.apHourLabels=[];
          angular.forEach(data['list'],function (item,i,array) {
            tempdata.push(item['apSum']);
            $scope.apHourLabels.push($filter('date')(item['sumDate'], 'MM-dd h:mm'));
          });
          $scope.apHourData.push(tempdata);
          $scope.acConfig=$localStorage.acConfigs;
          $scope.getAcHisHour($scope.selectValue);
        }else {
          $ionicLoading.hide();
        }
      });

    };
    $scope.getAcHisHour=function (selectValue) {
      ApService.getAcHisHour(selectValue).then(function (response) {
        if(response){
          var data=response.data;
          $scope.aclineData=[];
          var tempdata = [];
          $scope.aclineLabels=[];
          angular.forEach(data['list'],function (item,i,array) {
            tempdata.push(item['apNum']);
            $scope.aclineLabels.push($filter('date')(new Date(item['createDate']).getTime(), 'MM-dd h:mm'));
          });
          $scope.aclineData.push(tempdata);
        }else {
          $ionicPopup.alert({title:'提示', template:'获取ac数据失败'});
        }
      });
    };
    $scope.getApHisDay=function () {
      ApService.getApHisDay().then(function (response) {
        if(response){
          $ionicLoading.hide();
          var data=response.data;
          $scope.apDayData=[];
          var tempdata = [];
          $scope.apDayLabels=[];
          angular.forEach(data['list'],function (item,i,array) {
            // if (i<10) {
            tempdata.push(item['apSum']);
            $scope.apDayLabels.push($filter('date')(item['sumDate'], 'MM-dd'));
            // }
          })
          $scope.apDayData.push(tempdata);
          $scope.getAcHisDay($scope.selectValue);
        }else {
          $ionicLoading.hide();
          console.log('获取AP历史天数据失败');
        }
      });
    };
    $scope.getAcHisDay=function (selectValue) {
      ApService.getAcHisDay(selectValue).then(function (response) {
        if(response){
          var data=response.data;
          $scope.acDayData=[];
          var tempdata = [];
          $scope.acDayLabels=[];
          angular.forEach(data['list'],function (item,i,array) {
            tempdata.push(item['apNum']);
            $scope.acDayLabels.push($filter('date')(new Date(item['createDate']).getTime(), 'MM-dd'));
          });
          $scope.acDayData.push(tempdata);

        }else {
          $ionicPopup.alert({
            title:'提示',
            template:'获取ac数据失败'
          });
        }
      });
    };
    $scope.getApHisWeek=function () {
      ApService.getApHisWeek().then(function (response) {
        if(response){
          $ionicLoading.hide();
          var data=response.data;
          $scope.apWeekData=[];
          var tempdata = [];
          $scope.apWeekLabels=[];
          angular.forEach(data['list'],function (item,i,array) {
            // if (i<10) {
            tempdata.push(item['apSum']);
            $scope.apWeekLabels.push($filter('date')(item['sumDate'], 'MM-ww'));
            // }
          })
          $scope.apWeekData.push(tempdata);
          $scope.getAcHisWeek($scope.selectValue);
        }else {
          $ionicLoading.hide();
          console.log('获取AP历史天数据失败');
        }
      });
    };
    $scope.getAcHisWeek=function (selectValue) {
      ApService.getAcHisWeek(selectValue).then(function (response) {
        if(response){
          var data=response.data;
          $scope.acWeekData=[];
          var tempdata = [];
          $scope.acWeekLabels=[];
          angular.forEach(data['list'],function (item,i,array) {
            tempdata.push(item['apNum']);
            $scope.acWeekLabels.push($filter('date')(new Date(item['createDate']).getTime(), 'MM-dd h:mm'));
          });
          $scope.acWeekData.push(tempdata);
        }else {
          $ionicPopup.alert({title:'提示', template:'获取ac数据失败'});
        }
      });
    };
    $scope.getApHisMon=function () {
      ApService.getApHisMon().then(function (response) {
        if(response){
          $ionicLoading.hide();
          var data=response.data;
          $scope.apMonData=[];
          var tempdata = [];
          $scope.apMonLabels=[];
          angular.forEach(data['list'],function (item,i,array) {
            // if (i<10) {
            tempdata.push(item['apSum']);
            $scope.apMonLabels.push($filter('date')(item['sumDate'], 'yyyy-MM'));
            // }
          })
          $scope.apMonData.push(tempdata);
          $scope.getAcHisMon($scope.selectValue);
        }else {
          $ionicLoading.hide();
          console.log('获取AP历史天数据失败');
        }
      });
    };
    $scope.getAcHisMon=function (selectValue) {
      ApService.getAcHisMon(selectValue).then(function (response) {
        if(response){
          var data=response.data;
          $scope.acMonData=[];
          var tempdata = [];
          $scope.acMonLabels=[];
          angular.forEach(data['list'],function (item,i,array) {
            tempdata.push(item['apNum']);
            $scope.acMonLabels.push($filter('date')(new Date(item['createDate']).getTime(), 'MM-dd h:mm'));
          });
          $scope.acMonData.push(tempdata);
        }else {
          $ionicPopup.alert({
            title:'提示',
            template:'获取ac数据失败'
          });
        }
      });
    };
    $scope.getApHisYear=function () {
      ApService.getApHisYear().then(function (response) {
        if(response){
          $ionicLoading.hide();
          var data=response.data;
          $scope.apYearData=[];
          var tempdata = [];
          $scope.apYearLabels=[];
          angular.forEach(data['list'],function (item,i,array) {
            // if (i<10) {
            tempdata.push(item['apSum']);
            $scope.apYearLabels.push($filter('date')(item['sumDate'], 'yyyy-MM'));
            // }
          })
          $scope.apYearData.push(tempdata);
          $scope.getAcHisYear($scope.selectValue);
        }else {
          $ionicLoading.hide();
          console.log('获取AP历史天数据失败');
        }
      });
    };
    $scope.getAcHisYear=function (selectValue) {
      ApService.getAcHisYear(selectValue).then(function (response) {
        if(response){
          var data=response.data;
          $scope.acYearData=[];
          var tempdata = [];
          $scope.acYearLabels=[];
          angular.forEach(data['list'],function (item,i,array) {
            tempdata.push(item['apNum']);
            $scope.acYearLabels.push($filter('date')(new Date(item['createDate']).getTime(), 'MM-dd h:mm'));
          });
          $scope.acYearData.push(tempdata);
        }else {
          $ionicPopup.alert({
            title:'提示',
            template:'获取ac数据失败'
          });
        }
      });
    };



    $scope.tabNames=['实时','分时','天','周','月','年'];
    $scope.slectIndex=0;
    $scope.activeSlide=function(index){//点击时候触发
      $scope.slectIndex=index;
      $ionicSlideBoxDelegate.slide(index);
    };
    $scope.slideChanged=function(index){//滑动时候触发
      $scope.slectIndex=index;
      $scope.doRefresh(index);
    };
    $scope.pages=["web/apMonitor/templates/apNew.html","web/apMonitor/templates/apHisHour.html","web/apMonitor/templates/apHisDay.html","web/apMonitor/templates/apHisWeek.html","web/apMonitor/templates/apHisMon.html","web/apMonitor/templates/apHisYear.html"];

  });
