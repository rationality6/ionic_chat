angular
  .module('starter', ['ionic', 'starter.controllers', 'ngCordova', 'starter.services', 'lists_controller', 'photos_controller'])
  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })

  //CORS settings
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  }])

  //Router
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'Login'
      })
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
      })
      .state('tab.chats', {
        url: '/chats',
        views: {
          'tab-chats': {
            templateUrl: 'templates/tab-chats.html',
            controller: 'ChatsCtrl'
          }
        }
      })
      .state('tab.photos', {
        url: '/photos',
        views: {
          'tab-photos': {
            templateUrl: 'templates/tab-photos.html',
            controller: 'PhotosCtrl'
          }
        }
      })
      .state('tab.lists', {
        url: '/lists',
        views: {
          'tab-lists': {
            templateUrl: 'templates/tab-lists.html',
            controller: 'ListsCtrl'
          }
        }
      });
    $urlRouterProvider.otherwise('/login');
  });
