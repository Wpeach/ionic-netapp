
angular.module('netMg', ['ionic','ion-datetime-picker','ionic-toast','ionicLetterAvatarSelector','ngResource','chart.js','angular-oauth2','ngCordova', 'netMg.module.work', 'netMg.module.user','netMg.module.data','netMg.module.ap'])
  .constant('settings', {
    // server:"http://222.204.3.177"
    server: "http://120.203.222.155"
    // server:"http://222.204.40.104:8090"
  })

.run(function($ionicPlatform, $ionicPopup, $location,$ionicHistory) {

  $ionicPlatform.ready(function() {

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }

    //推送初始化
    var setTagsWithAliasCallback=function(event){
        window.alert('result code:'+event.resultCode+' tags:'+event.tags+' alias:'+event.alias);
    };

    //推送插件
    window.plugins.jPushPlugin.init();

    // System events
    document.addEventListener("resume", resume, false);

    function resume() {
      if (window.plugins.jPushPlugin.isPlatformIOS()) {
        window.plugins.jPushPlugin.setBadge(0);
        window.plugins.jPushPlugin.setApplicationIconBadgeNumber(0);
      } else if (window.plugins.jPushPlugin.isAndroid()) {
        window.plugins.jPushPlugin.setLatestNotificationNum(3);
        window.plugins.jPushPlugin.clearAllNotification();
      }
    }

  });

  //主页面显示退出提示框
  $ionicPlatform.registerBackButtonAction(function (e) {
    e.preventDefault();

    function showConfirm() {
      var confirmPopup = $ionicPopup.confirm({
        title: '<strong>退出应用?</strong>',
        template: '你确定要退出应用吗?',
        okText: '退出',
        cancelText: '取消'
      });

      confirmPopup.then(function (res) {
        if (res) {
          ionic.Platform.exitApp();
        } else {
          // Don't close
        }
      });
    }
    // Is there a page to go back to?
    if ($location.path() == '/app/index'||$location.path() == '/app/apMenu'||$location.path() == '/app/dataMenu'||$location.path() == '/app/userCenter') {
      showConfirm();
    } else if ($ionicHistory.backView()) {
      $ionicHistory.goBack();
    } else {
      // This is the last page: Show confirmation popup
      showConfirm();
    }
    return false;
  }, 101);

})
  .run(function ($ionicLoading,$rootScope) {
    $rootScope.$on('loading:show', function () {
      $ionicLoading.show({template: '努力为您加载中...'})
    });
    $rootScope.$on('loading:hide', function () {
      $ionicLoading.hide()
    })
  })

//定义时间选择器的语言
  .run(function($ionicPickerI18n) {
    $ionicPickerI18n.weekdays = ["日","一", "二", "三", "四", "五", "六"];
    $ionicPickerI18n.months = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
    $ionicPickerI18n.ok = "确定";
    $ionicPickerI18n.cancel = "取消";
    $ionicPickerI18n.okClass = "button-positive";
    $ionicPickerI18n.cancelClass = "button-stable";
  })

  //定义多选控件的样式
  .config(function($ionicLetterAvatarSelectorConfigProvider) {
    $ionicLetterAvatarSelectorConfigProvider.setBackground('positive');
    $ionicLetterAvatarSelectorConfigProvider.setColor('light');
    $ionicLetterAvatarSelectorConfigProvider.setBorder('1px solid black');
    $ionicLetterAvatarSelectorConfigProvider.setFinishOnStateChange(true);
    $ionicLetterAvatarSelectorConfigProvider.setLetterNumber(1);
    $ionicLetterAvatarSelectorConfigProvider.setSelectionAndroid(false);
    $ionicLetterAvatarSelectorConfigProvider.setSelectionIos(true);
    $ionicLetterAvatarSelectorConfigProvider.setSelectionColor('#86b0f9');
  })

.config(['OAuthProvider', 'settings', function (OAuthProvider, settings) {
  OAuthProvider.configure({
    baseUrl: settings.server,
    clientId: 'test',
    clientSecret: 'test',
    grantPath: '/oauth/token'
  });
}])

  // .config(['ChartJsProvider', function (ChartJsProvider) {
  //   // Configure all charts
  //   ChartJsProvider.setOptions({
  //     chartColors: ['#FF5252', '#FF8A80'],
  //     responsive: false
  //   });
  //   // Configure all line charts
  //   ChartJsProvider.setOptions('line', {
  //     showLines: false
  //   });
  // }])

.run(['$rootScope', '$window', 'OAuth', function ($rootScope, $window, OAuth) {
    $rootScope.$on('oauth:error', function (event, rejection) {
      return;
    });
  }])

    //设置HTTP请求格式
  .config(function ($httpProvider) {
  // Use x-www-form-urlencoded Content-Type form格式传值
  // $httpProvider.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
  $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    // $httpProvider.defaults.timeout = 4000;
    $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function($q, $location, $localStorage) {
    return {
      'request': function (config) {
        config.headers = config.headers || {};
        if ($localStorage.token) {
          config.headers.Authorization = 'Bearer '+ $localStorage.token;
          // console.log(config.headers);
        }
        return config;
      },
      'responseError': function(response) {
        if(response.status === 401 || response.status === 403) {
          console.log('请重新登录');
          $localStorage.user={};
          $localStorage.token={};
            $location.path('/login');
        }
        return $q.reject(response);
      }
    };
  }]);
  //设置请求数据的格式。
  $httpProvider.defaults.transformRequest = [function (data) {
    var param = function (obj) {
      var query = '';
      var name, value, fullSubName, subName, subValue, innerObj, i;
      for (name in obj) {
        value = obj[name];
        if (value instanceof Array) {
          for (i = 0; i < value.length; ++i) {
            subValue = value[i];
            fullSubName = name + '[' + i + ']';
            innerObj = {};
            innerObj[fullSubName] = subValue;
            query += param(innerObj) + '&';
          }
        } else if (value instanceof Object) {
          for (subName in value) {
            if (!(typeof subName === 'string' && subName.charAt(0) === '$' && subName.charAt(1) === '$')) {
              subValue = value[subName];
              fullSubName = name + '.' + subName;//+ ']';
              innerObj = {};
              innerObj[fullSubName] = subValue;
              query += param(innerObj) + '&';
            }
          }
        } else if (value !== undefined && value !== null) {
          query += encodeURIComponent(name) + '='
            + encodeURIComponent(value) + '&';
        }
      }

      return query.length ? query.substr(0, query.length - 1) : query;
    };

    return angular.isObject(data) && String(data) !== '[object File]'
      ? param(data)
      : data;
  }];

  /*请求数据时添加loading*/
  $httpProvider.interceptors.push(function ($rootScope, $q) {
    return {
      request: function (config) {
        $rootScope.$broadcast('loading:show');
        return config;
      },
      response: function (response) {
        $rootScope.$broadcast('loading:hide');
        return response;
      },
      responseError: function (rejection) {
        $rootScope.$broadcast('loading:hide');
        return $q.reject(rejection);
      },
      requestError: function (config) {
        $rootScope.$broadcast('loading:hide');
        return config
      }
    }
  })
})
  //隐藏底部tab栏的指令
  .directive('hideTabs', function($rootScope) {
  return {
    restrict: 'A',
    link: function(scope, element, attributes) {
      scope.$on('$ionicView.beforeEnter', function() {
        scope.$watch(attributes.hideTabs, function(value){
          $rootScope.hideTabs = value;
        });
      });
      scope.$on('$ionicView.beforeLeave', function() {
        $rootScope.hideTabs = false;
      });
    }
  };
})

.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
  $stateProvider
  $ionicConfigProvider.platform.ios.tabs.style('standard');
  $ionicConfigProvider.platform.ios.tabs.position('bottom');
  $ionicConfigProvider.platform.android.tabs.style('standard');
  $ionicConfigProvider.platform.android.tabs.position('standard');

  $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
  $ionicConfigProvider.platform.android.navBar.alignTitle('center');

  $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
  $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');

  $ionicConfigProvider.platform.ios.views.transition('ios');
  $ionicConfigProvider.platform.android.views.transition('android');
  $stateProvider
    .state('app',{
      url:'/app',
      abstract:true,
      templateUrl:'templates/appLayout.html'
    })
    .state('app.index',{
      url:'/index',
      views:{
        'online-work':{
          templateUrl:'web/onlineWork/templates/index.html',
          controller:'WorkController'
        }
      }
    })

    .state('login',{
      url:'/login',
      templateUrl:'web/onlineWork/templates/login.html',
      controller:'WorkController'
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/index');

});
