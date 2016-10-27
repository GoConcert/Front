// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

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

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack

  .state('tab.shows', {
      url: '/shows',
      views: {
        'tab-shows': {
          templateUrl: 'templates/tab-shows.html',
          controller: 'ShowsCtrl'
        }
      }
  })
    .state('tab.show-detail', {
      url: '/shows/:showId',
      views: {
        'tab-shows': {
          templateUrl: 'templates/show-detail.html',
          controller: 'ShowDetailCtrl'
        }
      }
    })
      .state('tab.recherche', {
      url: '/recherche',
      views: {
        'recherche': {
          templateUrl: 'templates/recherche.html',
          controller: 'RechercheCtrl',          
        } 
      } 
    })
      .state('tab.reservation', {
      url: '/reservation',
      views: {
        'reservation': {
          templateUrl: 'templates/reservation.html',
          controller: 'ReservationCtrl'
        }
      }
    })
      .state('tab.connexion', {
      url: '/connexion',
      views: {
        'connexion': {
          templateUrl: 'templates/connexion.html',
          controller: 'ConnexionCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/shows');
  // Permet de centrer les view-title
    $ionicConfigProvider.navBar.alignTitle('center');
    $ionicConfigProvider.tabs.position('bottom'); // other values: top
   

 });

