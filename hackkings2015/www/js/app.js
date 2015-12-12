angular.module('starter', ['ionic', 'ngCordova', 'starter.controllers', 'starter.directives'])


.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('out', {
      url: '/out',
      abstract: true,
      templateUrl: "templates/menu_out.html",
      controller: "AppCtrl"
    })

    .state('out.home', {
      url: '/home',
      views: {
        "menuContent" : {
          templateUrl: "templates/home_out.html",
          controller: "AuthCtrl"
        }
      }
    })

    .state('out.register', {
      url: '/register',
      views: {
        'menuContent': {
          templateUrl: 'templates/register.html',
          controller: "AuthCtrl"
        }
      }
    })

    .state('out.map', {
      url: '/map',
      views: {
        "menuContent" : {
          templateUrl: "templates/map_out.html",
          controller: "MapCtrl"
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/out/home');
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
