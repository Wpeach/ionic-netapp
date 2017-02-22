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

/**
 * Created by Wpeach on 2016/11/16.
 */
angular.module('netMg.module.work')
.controller('WorkController',function ($rootScope,$state,$scope,UserService,WorkService,OAuth,OAuthStorage,OAuthToken,ionicToast,$localStorage,$ionicPopup) {
    $rootScope.isAuthenticated = OAuth.isAuthenticated();
    //提示框
    $rootScope.showAlert=function (content) {
      $ionicPopup.alert({
        title:'提示',
        template:content
      });
    };

     // $scope.user=$localStorage.user;

    $rootScope.login=function (user) {
      WorkService.loginUser(user).then(function (response) {
        if(response){
          $localStorage.token=response;
          $localStorage.user.username=user.username;
          $localStorage.user.password=user.password;
          $scope.getUser();
          $state.go('app.index');
        }else{
          $rootScope.showAlert(user.username+" "+user.password+"用户名或密码错误,请重试")
        }
      });
      $scope.getUser=function () {
        UserService.getUser().then(function (response) {
          if(response){
            var roles=response.data.roleNames;
            $localStorage.user.role=roles.split(',');
            $localStorage.user.email=response.data.email;
            $localStorage.user.phone=response.data.phone;
            $localStorage.user.id=response.data.id;
            $localStorage.user.name=response.data.name;
            $localStorage.user.officeId=response.data.office.id;
            $localStorage.user.officeName=response.data.office.name;

            $scope.formData={};
            $scope.formData.alias=$localStorage.user.username;
            $scope.formData.tag1=response.data.office.name;
            $scope.formData.tag2="DataCenter";
            $scope.setTagsAndAlias();
          }
        })
      }
    };
  $scope.setTagsAndAlias = function () {
    try {
      var tags = [];
      if ($scope.formData.tag1 != "") {
        tags.push($scope.formData.tag1);
      }
      if ($scope.formData.tag2 != "") {
        tags.push($scope.formData.tag2);
      }
      window.plugins.jPushPlugin.setTagsWithAlias(tags, $scope.formData.alias);
    } catch (exception) {
      ionicToast.show('设置标签失败', 'middle', false, 2000);
      // console.log(exception);
    }
  };

  document.addEventListener("jpush.setTagsWithAlias", function(event) {
    var result = "result code:" + event.resultCode + " ";
    result += "tags:" + event.tags + " ";
    result += "alias:" + event.alias + " ";
    $("#tagAliasResult").html(result);
  }, false);

  })
  .controller('NewCtrl',function ($scope,$state,$cacheFactory,WorkService,$localStorage,ionicToast,$ionicSlideBoxDelegate) {
    $scope.$on('$ionicView.beforeEnter',function () {
      $scope.doRefresh($scope.slectIndex);
    });
    $scope.doRefresh=function (page) {
      switch (page){
        case 0:
          $scope.notifyGetList();
          break;
        case 1:
          $scope.notifyPutList();
          break;
      }
      $scope.$broadcast('scroll.refreshComplete');
    };
    if(!$localStorage.notifyType){
      WorkService.getType('oa_notify_type').then(function (response) {
        if(response){
          $localStorage.notifyType=response.data.data;
        }
      })
    }
    $scope.notifyGetList=function () {
      WorkService.notifyGetList().then(function (response) {
        if(response){
          $scope.getList=response.data.data.list;
          $scope.notifyType=$localStorage.notifyType;
          angular.forEach($scope.getList,function (item,i,array) {
            item.typename=WorkService.getTypeName($localStorage.notifyType,item.type);
          });
        }else {
          ionicToast.show('加载数据失败', 'middle', false, 2000);
        }
      })
    };
    $scope.notifyPutList=function () {
      WorkService.notifyPutList().then(function (response) {
        if(response){
          $scope.putList=response.data.data.list;
          $scope.notifyType=$localStorage.notifyType;
          angular.forEach($scope.putList,function (item,i,array) {
            item.typename=WorkService.getTypeName($localStorage.notifyType,item.type);
          });
        }else {
          ionicToast.show('加载数据失败', 'middle', false, 2000);
        }
      })
    };
    if($cacheFactory.get("user_check")){
      var user_check = $cacheFactory.get("user_check");   //取出名为user_cache的缓存对象  
      $scope.chooseItem = user_check.get("item");   //取出缓存对象中键值为lol的对象 
    }
    $scope.new={};
    $scope.quickRelease=function () {
      $scope.new.status="1";
      $scope.addNew();
    };
    $scope.keepDraft=function () {
      $scope.new.status="0";
      $scope.addNew();
    };
    $scope.addNew=function () {
      $cacheFactory.get("user_check").removeAll();
      if(!$scope.chooseItem){
        ionicToast.show('未添加接收人', 'middle', false, 2000);
      }else {
        var notifyId="";
        angular.forEach($scope.chooseItem,function (item,i,array) {
          notifyId+=item.id+',';
        });
        $scope.new.oaNotifyRecordIds=notifyId;
        WorkService.addNew(angular.toJson($scope.new,true)).then(function (response) {
          if(response){
            if($scope.new.status=="0"){
              ionicToast.show('保持成功', 'middle', false, 2000);
            }else {
              ionicToast.show('发布成功', 'middle', false, 2000);
            }
            $state.go("app.newMenu");
          }else {
            ionicToast.show('处理失败', 'middle', false, 2000);
          }
        })
      }
    };


    $scope.tabNames=['我收到的','我发出的'];
    $scope.slectIndex=0;
    $scope.activeSlide=function(index){//点击时候触发
      $scope.slectIndex=index;
      $ionicSlideBoxDelegate.slide(index);
    };
    $scope.slideChanged=function(index){//滑动时候触发
      $scope.slectIndex=index;
      $scope.doRefresh(index);
    };
    $scope.pages=["web/onlineWork/templates/news/newsGet.html","web/onlineWork/templates/news/newsPut.html"];
  })
  .controller('NewDetailCtrl',function ($scope,$filter,$stateParams,WorkService,$localStorage,ionicToast) {
    var id=$stateParams.id;
    WorkService.getDetailNew(id).then(function (response) {
      if(response){
        $scope.data=response.data.data;
        $scope.data.totalRead=parseInt($scope.data.readNum)+parseInt($scope.data.unReadNum);
        $scope.data.typename=WorkService.getTypeName($localStorage.notifyType,$scope.data.type);
        angular.forEach($scope.data.oaNotifyRecordList,function (item,i,array) {
          item.readDate=$filter('date')(new Date(item.readDate).getTime(), 'yyyy-MM-dd hh:mm');
        });
      }else {
        ionicToast.show('加载数据失败', 'middle', false, 2000);
      }
    })
  })
  .controller('NewSavedCtrl',function ($scope,$stateParams,WorkService,$localStorage,ionicToast,$cacheFactory,$state) {
    var id=$stateParams.id;
    WorkService.getDetailNew(id).then(function (response) {
      if(response){
        $scope.data=response.data.data;
        $scope.data.typename=WorkService.getTypeName($localStorage.notifyType,$scope.data.type);
        console.log($scope.data);
      }else {
        ionicToast.show('加载数据失败', 'middle', false, 2000);
      }
    });
    if($cacheFactory.get("user_check")){
      var user_check = $cacheFactory.get("user_check");   //取出名为user_cache的缓存对象  
      $scope.chooseItem = user_check.get("item");   //取出缓存对象中键值为lol的对象 
    }
    $scope.quickRelease=function () {
      $scope.data.status="1";
      $scope.addNew();
    };
    $scope.keepDraft=function () {
      $scope.data.status="0";
      $scope.addNew();
    };
    $scope.addNew=function () {
      if(!$scope.chooseItem&&!$scope.data.oaNotifyRecordList){
        ionicToast.show('未添加接收人', 'middle', false, 2000);
      }else {
        if($scope.chooseItem){
          var notifyId="";
          angular.forEach($scope.chooseItem,function (item,i,array) {
            notifyId+=item.id+',';
          });
          $scope.data.oaNotifyRecordIds=notifyId;
        }
        console.log(angular.toJson($scope.data,true));
        WorkService.addNew(angular.toJson($scope.data,true)).then(function (response) {
          if(response){
            if($scope.data.status=="0"){
              ionicToast.show('保持成功', 'middle', false, 2000);
            }else {
              ionicToast.show('发布成功', 'middle', false, 2000);
            }
            $state.go("app.newMenu");
          }else {
            ionicToast.show('处理失败', 'middle', false, 2000);
          }
        })
      }
    };
  })
  .controller('AskLeaveCtrl',function ($scope,$filter,$ionicSlideBoxDelegate,WorkService,$ionicPopup,$state,ionicToast) {
    $scope.$on('$ionicView.beforeEnter',function () {
      $scope.doRefresh($scope.slectIndex)
    });
    $scope.doRefresh=function (page) {
      switch (page){
        case 0:
          $scope.getDealLeave();
          break;
        case 1:
          $scope.viewAskLeave();
          break;
      }
      $scope.$broadcast('scroll.refreshComplete');
    };
    $scope.leaveLevel=[
      {
        "id":"1",
        "name":"公休"
      },
      {
        "id":"2",
        "name":"病假"
      },
      {
        "id":"3",
        "name":"事假"
      },
      {
        "id":"4",
        "name":"调休"
      },
      {
        "id":"5",
        "name":"婚假"
      }
    ];
    $scope.askLeave={};
    $scope.viewAskLeave=function () {
      WorkService.viewAskLeave().then(function (response) {
        if(response){
          $scope.selfLeave=response.data.data;
        }else {
          ionicToast.show('加载数据失败', 'middle', false, 2000);
        }
      })

    };
    $scope.addAskLeave=function () {
      $scope.askLeave.startTime=$filter('date')(new Date($scope.askLeave.startTime).getTime(), 'yyyy-MM-dd hh:mm:ss');
      $scope.askLeave.endTime=$filter('date')(new Date($scope.askLeave.endTime).getTime(), 'yyyy-MM-dd hh:mm:ss');
      WorkService.addAskLeave(angular.toJson($scope.askLeave,true)).then(function (response) {
        if(response){
          ionicToast.show('添加成功', 'middle', false, 2000);
          $state.go("app.leaveMenu");
        }else {
          ionicToast.show('添加失败', 'middle', false, 2000);
        }
      })
    };
    $scope.getDealLeave=function () {
      WorkService.getDealLeave().then(function (response) {
        if(response){
          $scope.datas=response.data.data;
        }else {
          ionicToast.show('加载数据失败', 'middle', false, 2000);
        }
      })
    };
    $scope.signLeave=function (taskId) {
      WorkService.signLeave(taskId).then(function (response) {
        if(response){
          ionicToast.show('签收成功', 'middle', false, 2000);
          $scope.doRefresh(0);
        }
      })
    };

    $scope.tabNames=['待处理','已完成'];
    $scope.slectIndex=0;
    $scope.activeSlide=function(index){//点击时候触发
      $scope.slectIndex=index;
      $ionicSlideBoxDelegate.slide(index);
    };
    $scope.slideChanged=function(index){//滑动时候触发
      $scope.slectIndex=index;
      $scope.doRefresh(index);
    };
    $scope.pages=["web/onlineWork/templates/askLeave/dealAskLeave.html","web/onlineWork/templates/askLeave/viewAskLeave.html"];

  })
  .controller('DetailLeaveCtrl',function ($scope,WorkService,$stateParams,$ionicPopup,$state,ionicToast) {
    var id = $stateParams.id;
    $scope.comment={};
    $scope.comment.value='';
    WorkService.getDetailLeave(id).then(function (response) {
      if(response){
        $scope.data=response.data;
        $scope.data.taskId=$stateParams.taskId;
      }else {
        ionicToast.show('加载数据失败', 'middle', false, 2000);
      }
    });
    $scope.turnBack=function () {
      $scope.deptLeaderData={
        taskId:$scope.data.taskId,
        proInsId:$scope.data.processInstanceId,
        comment:$scope.comment.value,
        vars:{
          keys:"deptLeaderPass,leaderBackReason",
          values:$scope.deptLeaderPass+','+$scope.comment.value,
          types:"B,S"
        }
      };

      WorkService.leaveDeptLeader(angular.toJson($scope.deptLeaderData,true)).then(function (response) {
        if(response){
          ionicToast.show('处理成功', 'middle', false, 2000);
          $state.go('app.leaveMenu');
        }else {
          ionicToast.show('处理失败', 'middle', false, 2000);
        }
      })

    };
    $scope.agreeLeave=function () {
      $scope.comment.value='同意';
      $scope.deptLeaderPass=true;
      $scope.turnBack();
    };
    $scope.refuseLeave=function () {
      var myPopup=$ionicPopup.show({
        template:'<ion-item class="item item-input"> <textarea name="a" rows="4" ng-model="comment.value" placeholder="驳回理由"></textarea> </ion-item>',
        title:'请填写驳回理由',
        scope:$scope,
        buttons:[
          {
            text:'取消',
            onTap:function (e) {
              $scope.comment.value='';
             }
          },
          {
            text:'<b>确定</b>',
            type:'button-positive',
            onTap:function (e) {
              $scope.deptLeaderPass=false;
              $scope.turnBack();
            }
          }
        ]
      });
    };
  })
  .controller('BigLeadAprCtrl',function ($scope,WorkService,$stateParams,$ionicPopup,$state,ionicToast) {
    var id = $stateParams.id;
    $scope.comment={};
    $scope.comment.value='';
    WorkService.getDetailLeave(id).then(function (response) {
      if(response){
        $scope.data=response.data;
        $scope.data.taskId=$stateParams.taskId;
      }else {
        ionicToast.show('加载数据失败', 'middle', false, 2000);
      }
    });
    $scope.turnBack=function () {
      $scope.deptLeaderData={
        taskId:$scope.data.taskId,
        proInsId:$scope.data.processInstanceId,
        comment:$scope.comment.value,
        vars:{
          keys:"hrPass,hrBackReason",
          values:$scope.hrPass+','+$scope.comment.value,
          types:"B,S"
        }
      };
      WorkService.leaveDeptLeader(angular.toJson($scope.deptLeaderData,true)).then(function (response) {
        if(response){
          ionicToast.show('处理成功', 'middle', false, 2000);
          $state.go('app.leaveMenu');
        }else {
          ionicToast.show('处理失败', 'middle', false, 2000);
        }
      })

    };
    $scope.agreeLeave=function () {
      $scope.comment.value='同意';
      $scope.hrPass=true;
      $scope.turnBack();
    };
    $scope.refuseLeave=function () {
      var myPopup=$ionicPopup.show({
        template:'<ion-item class="item item-input"> <textarea name="a" rows="4" ng-model="comment.value" placeholder="驳回理由"></textarea> </ion-item>',
        title:'请填写驳回理由',
        scope:$scope,
        buttons:[
          {
            text:'取消',
            onTap:function (e) {
              $scope.comment.value='';
            }
          },
          {
            text:'<b>确定</b>',
            type:'button-positive',
            onTap:function (e) {
              $scope.hrPass=false;
              $scope.turnBack();
            }
          }
        ]
      });
    };
  })
  .controller('ModifyLeaveCtrl',function ($scope,WorkService,$stateParams,ionicToast,$state,$filter) {
    var id=$stateParams.id;
    $scope.taskId=$stateParams.taskId;
    $scope.leaveLevel=[
      {
        "id":"1",
        "name":"公休"
      },
      {
        "id":"2",
        "name":"病假"
      },
      {
        "id":"3",
        "name":"事假"
      },
      {
        "id":"4",
        "name":"调休"
      },
      {
        "id":"5",
        "name":"婚假"
      }
    ];
    WorkService.getDetailLeave(id).then(function (response) {
      if(response){
        $scope.askLeave=response.data;
      }else {
        ionicToast.show('加载数据失败', 'middle', false, 2000);
      }
    });
    $scope.againLeave=function () {
      $scope.reApply='false';
      $scope.userConfirmWork();
    };
    $scope.abandonLeave=function () {
      $scope.reApply='true';
      $scope.userConfirmWork();
    };
    $scope.userConfirmWork=function () {
      $scope.askLeave.startTime=$filter('date')(new Date($scope.askLeave.startTime).getTime(), 'yyyy-MM-dd hh:mm:ss');
      $scope.askLeave.endTime=$filter('date')(new Date($scope.askLeave.endTime).getTime(), 'yyyy-MM-dd hh:mm:ss');
      $scope.deptLeaderData={
        taskId:$scope.taskId,
        proInsId:$scope.askLeave.processInstanceId,
        comment:'同意',
        vars:{
          keys:"reApply,leaveType,startTime,endTime,reason",
          values:$scope.reApply+','+$scope.askLeave.leaveType+','+$scope.askLeave.startTime+','+$scope.askLeave.endTime+','+$scope.askLeave.reason,
          types:"B,S,D,D,S"
        }
      };
      WorkService.leaveDeptLeader(angular.toJson($scope.deptLeaderData,true)).then(function (response) {
        if(response){
          ionicToast.show('处理成功', 'middle', false, 2000);
          $state.go('app.leaveMenu');
        }else {
          ionicToast.show('处理失败', 'middle', false, 2000);
        }
      })
    };
  })
  .controller('RealLeaveCtrl',function ($scope,$stateParams,WorkService,ionicToast,$state,$filter) {
    var id=$stateParams.id;
    $scope.taskId=$stateParams.taskId;
    WorkService.getDetailLeave(id).then(function (response) {
      if(response){
        $scope.data=response.data;
      }else {
        ionicToast.show('加载数据失败', 'middle', false, 2000);
      }
    });
    $scope.userConfirm={};
    $scope.userConfirmWork=function () {
      $scope.userConfirm.realityStartTime=$filter('date')(new Date($scope.userConfirm.realityStartTime).getTime(), 'yyyy-MM-dd hh:mm:ss');
      $scope.userConfirm.realityEndTime=$filter('date')(new Date($scope.userConfirm.realityEndTime).getTime(), 'yyyy-MM-dd hh:mm:ss');
      $scope.deptLeaderData={
        taskId:$scope.taskId,
        proInsId:$scope.data.processInstanceId,
        comment:'同意',
        vars:{
          keys:"realityStartTime,realityEndTime",
          values:$scope.userConfirm.realityStartTime+','+$scope.userConfirm.realityEndTime,
          types:"D,D"
        }
      };
      WorkService.leaveDeptLeader(angular.toJson($scope.deptLeaderData,true)).then(function (response) {
        if(response){
          ionicToast.show('处理成功', 'middle', false, 2000);
          $state.go('app.leaveMenu');
        }else {
          ionicToast.show('处理失败', 'middle', false, 2000);
        }
      })
    }
  })
  .controller('AskWorkCtrl',function ($scope,$ionicSlideBoxDelegate,WorkService,$ionicPopup,$filter,ionicToast,$state) {
    $scope.$on('$ionicView.beforeEnter',function () {
      $scope.doRefresh($scope.slectIndex)
    });
    $scope.doRefresh=function (page) {
      switch (page){
        case 0:
          $scope.getDealWork();
          break;
        case 1:
          $scope.viewAskWork();
          break;
      }
      $scope.$broadcast('scroll.refreshComplete');
    };
    $scope.getDealWork=function () {
      WorkService.getDealWork().then(function (response) {
        if(response){
          $scope.datas=response.data.data;
        }else {
          ionicToast.show('加载数据失败', 'middle', false, 2000);
        }
      });
    };
    $scope.viewAskWork=function () {
      WorkService.viewAskWork().then(function (response) {
        if(response){
          $scope.works=response.data.data.list;
        }else {
          ionicToast.show('加载数据失败', 'middle', false, 2000);
        }
      })
    };
    $scope.signWork=function (taskId) {
      WorkService.signWork(taskId).then(function (response) {
        if(response){
          ionicToast.show('签收成功', 'middle', false, 2000);
          $scope.doRefresh(0);
        }else {
          ionicToast.show('签收失败', 'middle', false, 2000);
        }
      })
    };
    $scope.askWork={};
    $scope.addAskWork=function () {
      $scope.askWork.startDate=$filter('date')(new Date($scope.askWork.startDate).getTime(), 'yyyy-MM-dd hh:mm:ss');
      $scope.askWork.endDate=$filter('date')(new Date($scope.askWork.endDate).getTime(), 'yyyy-MM-dd hh:mm:ss');
      WorkService.addAskWork(angular.toJson($scope.askWork,true)).then(function (response) {
        if(response){
          ionicToast.show('添加成功', 'middle', false, 2000);
          $state.go("app.askWorkMenu");
        }else {
          ionicToast.show('添加失败', 'middle', false, 2000);
        }
      })
    };
    $scope.tabNames=['待处理','已完成'];
    $scope.slectIndex=0;
    $scope.activeSlide=function(index){//点击时候触发
      $scope.slectIndex=index;
      $ionicSlideBoxDelegate.slide(index);
    };
    $scope.slideChanged=function(index){//滑动时候触发
      $scope.slectIndex=index;
      $scope.doRefresh(index);
    };
    $scope.pages=["web/onlineWork/templates/askWork/dealAskWork.html","web/onlineWork/templates/askWork/viewAskWork.html"];
  })
  .controller('DetailWorkCtrl',function ($scope,WorkService,$stateParams,$ionicPopup,ionicToast,$state) {
    var InsId = $stateParams.procInsId;
    $scope.taskId = $stateParams.taskId;
    $scope.comment={};
    $scope.comment.value='';
    WorkService.getDetailWork(InsId).then(function (response) {
      if(response){
        $scope.data=response.data.data;
      }else {
        ionicToast.show('加载数据失败', 'middle', false, 2000);
      }
    });

    $scope.turnBack=function () {
      $scope.deptLeaderData={
        taskId:$scope.taskId,
        comment:$scope.comment.value,
        flag:$scope.flag
      };
      WorkService.workDeptLeader(angular.toJson($scope.deptLeaderData,true)).then(function (response) {
        if(response){
          ionicToast.show('处理成功', 'middle', false, 2000);
          $state.go('app.askWorkMenu');
        }else {
          ionicToast.show('处理失败', 'middle', false, 2000);
        }
      })

    };


    $scope.agreeWork=function () {
      $scope.comment.value='同意';
      $scope.flag='yes';
      $scope.turnBack();
    };
    $scope.refuseWork=function () {
      var myPopup=$ionicPopup.show({
        template:'<ion-item class="item item-input"> <textarea name="a" rows="4" ng-model="comment.value" placeholder="驳回理由"></textarea> </ion-item>',
        title:'请填写驳回理由',
        scope:$scope,
        buttons:[
          {
            text:'取消',
            onTap:function (e) {
              $scope.comment.value='';
            }
          },
          {
            text:'<b>确定</b>',
            type:'button-positive',
            onTap:function (e) {
              $scope.flag='no';
              $scope.turnBack();
            }
          }
        ]
      });
    };
  })
  .controller('RealWorkCtrl',function ($scope,WorkService,$stateParams,ionicToast,$state,$filter) {
    var insId=$stateParams.id;
    $scope.taskId=$stateParams.taskId;
    WorkService.getDetailWork(insId).then(function (response) {
      if(response){
        $scope.data=response.data.data;
      }else {
        ionicToast.show('加载数据失败', 'middle', false, 2000);
      }
    });
    $scope.userConfirm={};
    $scope.userConfirmWork=function () {
      $scope.userConfirm.beginDate=$filter('date')(new Date($scope.userConfirm.beginDate).getTime(), 'yyyy-MM-dd hh:mm:ss');
      $scope.userConfirm.endDate=$filter('date')(new Date($scope.userConfirm.endDate).getTime(), 'yyyy-MM-dd hh:mm:ss');
      $scope.deptLeaderData={
        taskId:$scope.taskId,
        comment:'同意',
        flag:'yes',
        beginDate:$scope.userConfirm.beginDate,
        endDate:$scope.userConfirm.endDate
      };
      WorkService.workDeptLeader(angular.toJson($scope.deptLeaderData,true)).then(function (response) {
        if(response){
          ionicToast.show('处理成功', 'middle', false, 2000);
          $state.go('app.leaveMenu');
        }else {
          ionicToast.show('处理失败', 'middle', false, 2000);
        }
      })
    }
  })
  .controller('DayOperCtrl',function ($scope,WorkService,$filter,$ionicPopup,$state,ionicToast) {
    WorkService.getDayOper().then(function (response) {
      if(response){
        $scope.datas=response.data.data.list;
        angular.forEach($scope.datas,function (item,i,array) {
          item['date']=$filter('date')(new Date(item['date']).getTime(), 'yyyy-MM-dd h:mm');
        })
      }else {
        ionicToast.show('加载数据失败', 'middle', false, 2000);
      }
    });


   $scope.day={};
    $scope.addDayOper=function () {
      console.log(angular.toJson($scope.day,true));
      WorkService.addDayOper(angular.toJson($scope.day,true)).then(function (response) {
        if(response){
          ionicToast.show('添加日志成功', 'middle', false, 2000);
          $state.go("app.viewDayOperation");
        }else {
          ionicToast.show('添加日志失败', 'middle', false, 2000);
        }
      })
    };
  })
  .controller('DayDetailCtrl',function ($scope,WorkService,$stateParams,$filter,ionicToast) {
      var id = $stateParams.id;
      WorkService.detailDayOper(id).then(function (response) {
        if(response){
          $scope.day=response.data.data;
          $scope.day.date=$filter('date')(new Date($scope.day.date).getTime(), 'yyyy-MM-dd h:mm');
        }else {
          ionicToast.show('加载数据失败', 'middle', false, 2000);
        }
      });
  })
  .controller('BugRecordCtrl',function ($scope,WorkService,$localStorage,$state,$ionicPopup,ionicToast) {
    WorkService.getBugRecord().then(function (response) {
      if(response){
        $scope.datas=response.data.data.list;
      }else {
        ionicToast.show('加载数据失败', 'middle', false, 2000);
      }
    });
    $scope.devList =[
      {name: "Value1", id:"1"},
      {name: "Value2", id:"2"},
      {name: "Value3", id:"3"},
      {name: "Value4", id:"4"},
    ];
    $scope.bugLevel=[
      {
        "id":"1",
        "name":"一般故障"
      },
      {
        "id":"2",
        "name":"中等故障"
      },
      {
        "id":"3",
        "name":"严重故障"
      }
    ];
    $scope.bugRecord={};
    $scope.addBugRecord=function () {
      $scope.bugRecord.office={};
      $scope.bugRecord.user={};
      $scope.bugRecord.office.id=$localStorage.user.officeId;
      $scope.bugRecord.office.name=$localStorage.user.officeName;
      $scope.bugRecord.user.id=$localStorage.user.id;
      $scope.bugRecord.user.name=$localStorage.user.name;
      WorkService.addBugRecord(angular.toJson($scope.bugRecord,true)).then(function (response) {
        if(response){
          ionicToast.show('添加成功', 'middle', false, 2000);
          $state.go("app.viewBugRecord");
        }else {
          ionicToast.show('添加失败', 'middle', false, 2000);
        }
      })
    };
  })
  .controller('BigRecordCtrl',function ($scope,WorkService,$localStorage,$ionicPopup,$state,ionicToast) {
    $scope.$on('$ionicView.beforeEnter',function () {
      $scope.doRefresh();
    });
    $scope.doRefresh=function () {
        $scope.getBigRecord();
      $scope.$broadcast('scroll.refreshComplete');
    };
    $scope.getBigRecord=function () {
      WorkService.getBigRecord().then(function (response) {
        if(response){
          $scope.datas=response.data.data.list;
        }else {
          ionicToast.show('加载数据失败', 'middle', false, 2000);
        }
      });
    };

    $scope.big={};
    $scope.addBigRecord=function () {
      $scope.big.office={};
      $scope.big.office.id=$localStorage.user.officeId;
      $scope.big.office.name=$localStorage.user.officeName;
      WorkService.addBigRecord(angular.toJson($scope.big,true)).then(function (response) {
        if(response){
          ionicToast.show('添加成功', 'middle', false, 2000);
          $state.go("app.viewBigRecord");
        }else {
          ionicToast.show('添加失败', 'middle', false, 2000);
        }
      })
    };
    $scope.deleteBigRecord=function (id) {
      WorkService.deleteBigRecord(id).then(function(response) {
        if(response){
          $ionicPopup.alert({title:'删除大事记成功'});
          $scope.doRefresh();
        }else {
          $ionicPopup.alert({title:'删除大事记失败',template:response})
        }
      })
    };
})
  .controller('weeklyPaperCtrl',function ($scope,WorkService,$ionicSlideBoxDelegate,ionicToast) {
    $scope.$on('$ionicView.beforeEnter',function () {
      $scope.doRefresh($scope.slectIndex)
    });

    $scope.currentMenuIndex = 0;

    $scope.doRefresh=function (page) {
      switch (page){
        case 0:
          $scope.weeklyGet();
          break;
        case 1:
          $scope.weeklyPut();
          break;
      }
      $scope.$broadcast('scroll.refreshComplete');
    };
    $scope.weeklyPut=function () {
      WorkService.weeklyGet().then(function (response) {
        if(response){
          $scope.papers = response.data.list;
        }else {
          ionicToast.show('加载数据失败', 'middle', false, 2000);
        }
      });
    };

    $scope.weeklyGet=function () {
      WorkService.weeklyGet().then(function (response) {
        if(response){
          $scope.papers = response.data.list;
        }else {
          ionicToast.show('加载数据失败', 'middle', false, 2000);
        }
      });
    };
    $scope.tabNames=['我收到的','我发出的'];
    $scope.slectIndex=0;
    $scope.activeSlide=function(index){//点击时候触发
      $scope.slectIndex=index;
      $ionicSlideBoxDelegate.slide(index);
    };
    $scope.slideChanged=function(index){//滑动时候触发
      $scope.slectIndex=index;
      $scope.doRefresh(index);
    };
    $scope.pages=["web/onlineWork/templates/weeklyPaper/weeklyGet.html","web/onlineWork/templates/weeklyPaper/weeklyPut.html"];


  })
  .controller('NcuCtrl',function ($scope,WorkService,$filter,ionicToast,$ionicSlideBoxDelegate) {
    $scope.$on('$ionicView.beforeEnter',function () {
      $scope.doRefresh($scope.slectIndex);
    });
    $scope.doRefresh=function (page) {
      switch (page){
        case 0:
          $scope.ncuOnline();
          break;
        case 1:
          $scope.trafficStatistic();
          break;
      }
      $scope.$broadcast('scroll.refreshComplete');
    };
    $scope.ncuOnline=function () {
      WorkService.ncuOnline().then(function (response) {
        if(response){
          var data=response.data._embedded.onlineReportPoints;
          data=data.reverse();
          var tempdata = [];
          $scope.ncuData=[];
          $scope.ncuLabel=[];
          angular.forEach(data,function (item,i,array) {
            tempdata.push(item['count']);
            $scope.ncuLabel.push($filter('date')(new Date(item['timePoint']*1000).getTime(),'MM-dd hh:mm'));
          });
          $scope.ncuData.push(tempdata);
        }else {
          ionicToast.show('加载数据失败', 'middle', false, 2000);
        }
      })
    };

    $scope.trafficStatistic=function () {
      function getItemsArr(o)
      {
        var item=[];
        for(var i in o)
        {
          var obj={
            name:i,
            id:o[i]
          }
          item.push(obj);
        }
        return item;
      }
      WorkService.trafficeId().then(function (response) {
        if(response){
          $scope.items=getItemsArr(response.data.data);
          $scope.selectValue=$scope.items[0].id;
          $scope.trafficData($scope.selectValue);
        }
      });
      $scope.trafficData=function (trafficeId) {
        WorkService.trafficeData(trafficeId).then(function (response) {
          if(response){
            $scope.td=response.data.data.list;
            $scope.data=$scope.td.reverse();
            var inSpeed=[];
            var outSpeed=[];
            $scope.series = ['Series A', 'Series B'];
            $scope.labels=[];
            $scope.colors=['#90D26D', '#F73F52'];
            angular.forEach($scope.data,function (item,i,array) {
              inSpeed.push(parseInt(item.inSpeed));
              outSpeed.push(parseInt(item.outSpeed));
              $scope.labels.push(item.createDate.slice(8,-3));
            });
            $scope.series = ['进口流量', '出口流量'];
            $scope.data=[inSpeed,outSpeed];
            $scope.options={
              // title:{
              //   display:true,
              //   position:'top',
              //   titleFontSize:14,
              //   text:'进出口流量统计'
              // },
              elements:{
                point:{
                  radius:0
                }
              },
              line:{
                borderWidth:1
              }
              // tooltips:{
              //   enabled:true
              // }
            };

          }else {
            ionicToast.show('加载数据失败', 'middle', false, 2000);
          }
        })
      }

    };
    $scope.tabNames=['Ncu在线','进出口流量'];
    $scope.slectIndex=0;
    $scope.activeSlide=function(index){//点击时候触发
      $scope.slectIndex=index;
      $ionicSlideBoxDelegate.slide(index);
    };
    $scope.slideChanged=function(index){//滑动时候触发
      $scope.slectIndex=index;
      $scope.doRefresh(index);
    };
    $scope.pages=["web/onlineWork/templates/mywork/ncuOnline.html","web/onlineWork/templates/mywork/inOut.html"];

  })
  .directive('selectBox', function () {
  return {
    restrict: 'E',
    require: ['ngModel', 'ngData', 'ngSelectedId', 'ngSelectedValue', '?ngTitle', 'ngiItemName', 'ngItemId'],
    template: '<input id="showed" type="text" ng-click="showSelectModal()" style="cursor:inherit;" readonly />' + '<span id="hidden" type="text" style="display: none;"></span>',
    controller: function ($scope, $element, $attrs, $ionicModal, $parse) {
      $scope.modal = {};

      $scope.showSelectModal = function () {
        var val = $parse($attrs.ngData);
        $scope.data = val($scope);

        $scope.modal.show();
      };

      $scope.closeSelectModal = function () {
        $scope.modal.hide();
      };

      $scope.$on('$destroy', function (id) {
        $scope.modal.remove();
      });

      $scope.modal = $ionicModal.fromTemplate('<ion-modal-view id="select">' + '<ion-header-bar>' + '<h1 class="title">' + $attrs.ngTitle + '</h1>' + ' <a ng-click="closeSelectModal()" class="button button-icon icon ion-close"></a>' + '</ion-header-bar>' + '<ion-content>' + '<ion-list>' + '<ion-item  ng-click="clickItem(item)" ng-repeat="item in data" ng-bind-html="item[\'' + $attrs.ngItemName + '\']"></ion-item>' + '</ion-list>' + ' </ion-content>' + '</ion-modal-view>', {
        scope: $scope,
        animation: 'slide-in-up'
      });

      $scope.clickItem = function (item) {
        var index = $parse($attrs.ngSelectedId);
        index.assign($scope.$parent, item[$attrs.ngItemId]);

        var value = $parse($attrs.ngSelectedValue);
        value.assign($scope.$parent, item[$attrs.ngItemName]);

        $scope.closeSelectModal();
      };
    },
    compile: function ($element, $attrs) {
      var input = $element.find('input');
      angular.forEach({
        'name': $attrs.name,
        'placeholder': $attrs.ngPlaceholder,
        'ng-model': $attrs.ngSelectedValue
      }, function (value, name) {
        if (angular.isDefined(value)) {
          input.attr(name, value);
        }
      });

      var span = $element.find('span');
      if (angular.isDefined($attrs.ngSelectedId)) {
        span.attr('ng-model', $attrs.ngSelectedId);
      }
    }
  };
})
;


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
