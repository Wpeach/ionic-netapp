/**
 * Created by Wpeach on 2016/11/16.
 */
angular.module('netMg.module.work',[])
  .config(['$stateProvider',function ($stateProvider) {
    $stateProvider
      .state('app.askLeave',{
        url:'/askLeave',
        cache: false,
        views:{
          'online-work':{
            templateUrl:'web/onlineWork/templates/askLeave/askLeave.html',
            controller:'AskLeaveCtrl'
          }
        }
      })
      .state('app.viewAskLeave',{
        url:'/viewAskLeave',
        cache: false,
        views:{
          'online-work':{
            templateUrl:'web/onlineWork/templates/askLeave/viewAskLeave.html',
            controller:'AskLeaveCtrl'
          }
        }
      })
      .state('app.leaveMenu',{
        url:'/leaveMenu',
        cache: false,
        views:{
          'online-work':{
            templateUrl:'web/onlineWork/templates/askLeave/leaveMenu.html',
            controller:'AskLeaveCtrl'
          }
        }
      })
      .state('app.dealAskLeave',{
        url:'/dealAskLeave',
        cache: false,
        views:{
          'online-work':{
            templateUrl:'web/onlineWork/templates/askLeave/dealAskLeave.html',
            controller:'AskLeaveCtrl'
          }
        }
      })
      .state('app.leadApproval',{
        url:'/leadApproval/:id/:taskId',
        cache: false,
        views:{
          'online-work':{
            templateUrl:'web/onlineWork/templates/askLeave/leadApproval.html',
            controller:'DetailLeaveCtrl'
          }
        }
      })
      .state('app.bigLeadApproval',{
        url:'/bigLeadApproval/:id/:taskId',
        cache: false,
        views:{
          'online-work':{
            templateUrl:'web/onlineWork/templates/askLeave/bigLeadApproval.html',
            controller:'BigLeadAprCtrl'
          }
        }
      })
      .state('app.realAskLeave',{
        url:'/realAskLeave/:id/:taskId',
        cache: false,
        views:{
          'online-work':{
            templateUrl:'web/onlineWork/templates/askLeave/realAskLeave.html',
            controller:'RealLeaveCtrl'
          }
        }
      })
      .state('app.modifyAskLeave',{
        url:'/modifyAskLeave/:id/:taskId',
        cache: false,
        views:{
          'online-work':{
            templateUrl:'web/onlineWork/templates/askLeave/modifyAskLeave.html',
            controller:'ModifyLeaveCtrl'
          }
        }
      })
      .state('app.askWorkMenu',{
        url:'/askWorkMenu',
        cache: false,
        views:{
          'online-work':{
            templateUrl:'web/onlineWork/templates/askWork/askWorkMenu.html',
            controller:'AskWorkCtrl'
          }
        }
      })
      .state('app.askWork',{
        url:'/askWork',
        cache: false,
        views:{
          'online-work':{
            templateUrl:'web/onlineWork/templates/askWork/askWork.html',
            controller:'AskWorkCtrl'
          }
        }
      })
      .state('app.dealAskWork',{
        url:'/dealAskWork',
        cache: false,
        views:{
          'online-work':{
            templateUrl:'web/onlineWork/templates/askWork/dealAskWork.html',
            controller:'AskWorkCtrl'
          }
        }
      })
      .state('app.leadApprovalWork',{
        url:'/leadApprovalWork/:procInsId/:taskId',
        cache: false,
        views:{
          'online-work':{
            templateUrl:'web/onlineWork/templates/askWork/leaderApproval.html',
            controller:'DetailWorkCtrl'
          }
        }
      })
      .state('app.viewAskWork',{
        url:'/viewAskWork',
        cache: false,
        views:{
          'online-work':{
            templateUrl:'web/onlineWork/templates/askWork/viewAskWork.html',
            controller:'AskWorkCtrl'
          }
        }
      })
      .state('app.realAskWork',{
        url:'/realAskWork/:id/:taskId',
        cache: false,
        views:{
          'online-work':{
            templateUrl:'web/onlineWork/templates/askWork/realAskWork.html',
            controller:'RealWorkCtrl'
          }
        }
      })
      .state('app.bigRecord',{
        url:'/bigRecord',
        cache: false,
        views:{
          'online-work':{
            templateUrl:'web/onlineWork/templates/bigRecord/bigRecord.html',
            controller:'BigRecordCtrl'
          }
        }
      })
      .state('app.viewBigRecord',{
        url:'/viewBigRecord',
        cache: false,
        views:{
          'online-work':{
            templateUrl:'web/onlineWork/templates/bigRecord/viewBigRecord.html',
            controller:'BigRecordCtrl'
          }
        }
      })
      .state('app.weeklyPut',{
        url:'/weeklyPut',
        cache: false,
        views:{
          'online-work':{
            templateUrl:'web/onlineWork/templates/weeklyPaper/weeklyPut.html',
            controller:'weeklyPaperCtrl'
          }
        }
      })
      .state('app.weeklyMenu',{
        url:'/weeklyMenu',
        cache: false,
        views:{
          'online-work':{
            templateUrl:'web/onlineWork/templates/weeklyPaper/weeklyMenu.html',
            controller:'weeklyPaperCtrl'
          }
        }
      })
      .state('app.weeklyGet',{
        url:'/weeklyGet',
        cache: false,
        views:{
          'online-work':{
            templateUrl:'web/onlineWork/templates/weeklyPaper/weeklyGet.html',
            controller:'weeklyPaperCtrl'
          }
        }
      })
      .state('app.workMenu',{
        url:'/workMenu',
        cache: false,
        views:{
          'online-work':{
            templateUrl:'web/onlineWork/templates/mywork/workMenu.html',
            controller:'NcuCtrl'
          }
        }
      })
      .state('app.ncuOnline',{
        url:'/ncuOnline',
        cache: false,
        views:{
          'online-work':{
            templateUrl:'web/onlineWork/templates/mywork/ncuOnline.html',
            controller:'NcuCtrl'
          }
        }
      })
      .state('app.inOut',{
        url:'/inOut',
        cache: false,
        views:{
          'online-work':{
            templateUrl:'web/onlineWork/templates/mywork/inOut.html',
            controller:'NcuCtrl'
          }
        }
      })
      .state('app.bugRecord',{
        url:'/bugRecord',
        cache: false,
        views:{
          'online-work':{
            templateUrl:'web/onlineWork/templates/bugRecord/bugRecord.html',
            controller:'BugRecordCtrl'
          }
        }
      })
      .state('app.viewBugRecord',{
        url:'/viewBugRecord',
        cache: false,
        views:{
          'online-work':{
            templateUrl:'web/onlineWork/templates/bugRecord/ViewBugRecord.html',
            controller:'BugRecordCtrl'
          }
        }
      })
      .state('app.dayOperation',{
        url:'/dayOperation',
        cache: false,
        views:{
          'online-work':{
            templateUrl:'web/onlineWork/templates/dayOperation/dayOperation.html',
            controller:'DayOperCtrl'
          }
        }
      })
      .state('app.viewDayOperation',{
        url:'/viewDayOperation',
        cache: false,
        views:{
          'online-work':{
            templateUrl:'web/onlineWork/templates/dayOperation/viewDayOperation.html',
            controller:'DayOperCtrl'
          }
        }
      })
      .state('app.day-detail',{
        url:'/days/:id',
        cache: false,
        views:{
          'online-work':{
            templateUrl:'web/onlineWork/templates/dayOperation/dayDetail.html',
            controller:'DayDetailCtrl'
          }
        }
      })
      .state('app.quartWork',{
        url:'/quartWork',
        cache: false,
        views:{
          'online-work':{
            templateUrl:'web/onlineWork/templates/quartWork/quartWork.html',
            controller:'AskLeaveCtrl'
          }
        }
      })
      .state('app.newsGet',{
        url:'/newsGet',
        cache: false,
        views:{
          'online-work':{
            templateUrl:'web/onlineWork/templates/news/newsGet.html',
            controller:'NewCtrl'
          }
        }
      })
      .state('app.newsPut',{
        url:'/newsPut',
        cache: false,
        views:{
          'online-work':{
            templateUrl:'web/onlineWork/templates/news/newsPut.html',
            controller:'NewCtrl'
          }
        }
      })
      .state('app.newMenu',{
        url:'/newMenu',
        cache: false,
        views:{
          'online-work':{
            templateUrl:'web/onlineWork/templates/news/newMenu.html',
            controller:'NewCtrl'
          }
        }
      })
      .state('app.newDetail',{
        url:'/newDetail/:id',
        cache: false,
        views:{
          'online-work':{
            templateUrl:'web/onlineWork/templates/news/newDetail.html',
            controller:'NewDetailCtrl'
          }
        }
      })
      .state('app.newSaved',{
        url:'/newSaved/:id',
        cache: false,
        views:{
          'online-work':{
            templateUrl:'web/onlineWork/templates/news/newSaved.html',
            controller:'NewSavedCtrl'
          }
        }
      })
      .state('app.addNew',{
        url:'/addNew',
        cache: false,
        views:{
          'online-work':{
            templateUrl:'web/onlineWork/templates/news/addNew.html',
            controller:'NewCtrl'
          }
        }
      })
      .state('app.accepter',{
        url:'/addNew',
        cache: false,
        views:{
          'online-work':{
            templateUrl:'web/onlineWork/templates/news/accepter.html',
            controller:'NewCtrl'
          }
        }
      })
    ;
  }]);
