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
