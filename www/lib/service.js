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

/**
 * Created by Wpeach on 2016/11/17.
 */
angular.module('netMg.module.work')
  .factory('WorkService',function ($q,settings,$http,OAuth,$ionicPopup,$localStorage,$ionicLoading) {
    var day;
    return{
      loginUser:function (user) {
        var options={scope:'read write'};
        return OAuth.getAccessToken(user, options).then(function (response) {
          return response;
        }, function (error) {
          return false;
        });
      },
      getUser:function () {
        var url=settings.server+'/api/sys/user';
        return $http.post(url)
          .then(function (response) {
            return response;
          },function(error){
            return false;
        })
      },
      weeklyGet:function () {
        var url=settings.server+'/api/internship/weekly/';
        return $http.post(url)
          .then(function (response) {
            return response;
          },function(error){
            return false;
          })
      },
      weeklyPut:function () {
        var url=settings.server+'/api/ap/realTime';
        return $http.post(url)
          .then(function (response) {
            return response;
          },function(error){
            return false;
          })
      },
      getBugRecord:function () {
        var url=settings.server+'/api/oa/faultRecord';
        return $http.get(url)
          .then(function (response) {
            return response;
          },function(error){
            return false;
          })
      },
      addBugRecord:function (data) {
        var url=settings.server+'/api/oa/faultRecord';
        return $http.post(url,data,{headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Authorization': 'Bearer ' +$localStorage.token
        }})
          .then(function (response) {
            return response;
          },function(error){
            return false;
          })
      },
      getBigRecord:function () {
        var url=settings.server+'/api/oa/bigEvent';
        return $http.get(url)
          .then(function (response) {

            return response;
          },function(error){
            return false;
          })
      },
      addBigRecord:function (data) {
        var url=settings.server+'/api/oa/bigEvent';
        return $http.post(url,data,{headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Authorization': 'Bearer ' +$localStorage.token
        }})
          .then(function (response) {
            return response;
          },function(error){
            return false;
          })
      },
      getDayOper:function () {
        var url=settings.server+'/api/oa/dayWork';
        return $http.get(url)
          .then(function (response) {
            return response;
          },function(error){
            return false;
          })
      },
      addDayOper:function (data) {
        var url=settings.server+'/api/oa/dayWork';
        return $http.post(url,data,{headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Authorization': 'Bearer ' +$localStorage.token
        }})
          .then(function (response) {
            return response;
          },function(error){
            return false;
          })
      },
      detailDayOper:function (id) {
        if(day !==undefined && day.id===id){
          var dayDefer=$q.defer();
          dayDefer.resolve({
            data:day
          });
          console.log('defer');
          return{
            $promise:dayDefer.promise
          };
        }
        return this.get(id);
      },
      get:function (id) {
        var url=settings.server+'/api/oa/dayWork/'+id;
        return $http.get(url)
          .then(function (response) {
            day=response;
            return response;
          },function(error){
            return false;
          })
      },
      addAskLeave:function (data) {
        var url=settings.server+'/api/oa/leave';
        return $http.post(url,data,{headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Authorization': 'Bearer ' +$localStorage.token
        }})
          .then(function (response) {
            return response;
          },function(error){
            return false;
          })
      },
      getDealLeave:function () {
        var url=settings.server+'/api/oa/leave';
        return $http.get(url)
          .then(function (response) {
            return response;
          },function(error){
            return false;
          })
      },
      viewAskLeave:function () {
        var url=settings.server+'/api/oa/leave/self';
        return $http.get(url)
          .then(function (response) {
            return response;
          },function(error){
            return false;
          })
      },
      getDetailLeave:function (id) {
        var url=settings.server+'/api/oa/leave/'+id;
        return $http.get(url)
          .then(function (response) {
            return response;
          },function(error){
            return false;
          })
      },
      signLeave:function (taskId) {
        var url=settings.server+'/api/oa/leave/claim/'+taskId;
        return $http.post(url,{headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Authorization': 'Bearer ' +$localStorage.token
        }})
          .then(function (response) {
            return response;
          },function(error){
            return false;
          })
      },
      leaveDeptLeader:function (data) {
        var url=settings.server+'/api/oa/leave/audit';
        return $http.post(url,data,{headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Authorization': 'Bearer ' +$localStorage.token
        }})
          .then(function (response) {
            return response;
          },function(error){
            return false;
          })
      },
      addAskWork:function (data) {
        var url=settings.server+'/api/oa/overTime';
        return $http.post(url,data,{headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Authorization': 'Bearer ' +$localStorage.token
        }})
          .then(function (response) {
            return response;
          },function(error){
            return false;
          })
      },
      getDealWork:function () {
        var url=settings.server+'/api/oa/overTime/todo';
        return $http.get(url)
          .then(function (response) {
            return response;
          },function(error){
            return false;
          })
      },
      viewAskWork:function () {
        var url=settings.server+'/api/oa/overTime';
        return $http.get(url)
          .then(function (response) {
            return response;
          },function(error){
            return false;
          })
      },
      signWork:function (taskId) {
        var url=settings.server+'/api/oa/overTime/claim/'+taskId;
        return $http.post(url,{headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Authorization': 'Bearer ' +$localStorage.token
        }})
          .then(function (response) {
            return response;
          },function(error){
            return false;
          })
      },
      getDetailWork:function (id) {
        var url=settings.server+'/api/oa/overTime/byInsId/'+id;
        return $http.get(url)
          .then(function (response) {
            return response;
          },function(error){
            return false;
          })
      },
      workDeptLeader:function (data) {
        var url=settings.server+'/api/oa/overTime/audit';
        return $http.post(url,data,{headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Authorization': 'Bearer ' +$localStorage.token
        }})
          .then(function (response) {
            return response;
          },function(error){
            return false;
          })
      },
      ncuOnline:function () {
        var url=settings.server+':8100/onlineReportPoints?sort=timePoint,desc';
        return $http.get(url)
          .then(function (response) {
            return response;
          },function(error){
            return false;
          })
      },
      trafficeId:function () {
        var url=settings.server+'/api/op/trafic';
        return $http.get(url)
          .then(function (response) {
            return response;
          },function(error){
            return false;
          })
      },
      trafficeData:function (id) {
        var url=settings.server+'/api/op/trafic/'+id+'?pageSize=500';
        return $http.get(url)
          .then(function (response) {
            return response;
          },function(error){
            return false;
          })
      },
      notifyGetList:function () {
        var url=settings.server+'/api/oa/notify/self';
        return $http.get(url)
          .then(function (response) {
            return response;
          },function(error){
            return false;
          })
      },
      notifyPutList:function () {
        var url=settings.server+'/api/oa/notify';
        return $http.get(url)
          .then(function (response) {
            return response;
          },function(error){
            return false;
          })
      },
      getType:function (typeName) {
        var url=settings.server+'/api/sys/dicLabel/'+typeName;
        return $http.get(url)
          .then(function (response) {
            return response;
          },function(error){
            return false;
          })
      },
      getTypeName:function (data,id) {
        var typename;
        angular.forEach(data,function (item,i,array) {
          if(item.value==id){
            typename=item.label;
          }
        });
        return typename;
      },
    addNew:function (data) {
      var url=settings.server+'/api/oa/notify';
      return $http.post(url,data,{headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': 'Bearer ' +$localStorage.token
      }})
        .then(function (response) {
          return response;
        },function(error){
          return false;
        })
    },
      getDetailNew:function (id) {
        var url=settings.server+'/api/oa/notify/'+id;
        return $http.get(url)
          .then(function (response) {
            return response;
          },function(error){
            return false;
          })
      }
    }
  });

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
