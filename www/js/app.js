// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function ($stateProvider, $urlRouterProvider, $httpProvider, $ionicConfigProvider) {

  $stateProvider

  .state('login', {
    url: '/',
    templateUrl: 'templates/login.html',
  })

  .state('menu', {
    url: '/menu',
    abstract: true,
    templateUrl: 'templates/menu.html',
  })

  // list of games
  .state('menu.game-list', {
    url: '/games',
    views: {
      'menuContent' :{
        templateUrl: 'templates/game-list.html',
      }
    }
  })

  // detail of selected game
  .state('menu.game-item', {
    url: '/games/:gameId',
    views: {
      'menuContent' :{
        templateUrl: 'templates/game-detail.html',
      }
    }
  })

  // add guest to game
  .state('menu.add-guest', {
    url: '/games/:gameId/add-guest',
    views: {
      'menuContent' :{
        templateUrl: 'templates/game-add-guest.html'
      }
    }
  })

  // list of all tickets
  .state('menu.manage-tickets', {
    url: '/games/:gameId/manage-tickets',
    views: {
      'menuContent' :{
        templateUrl: 'templates/game-ticket-list.html',
      }
    }
  })

  // view of selected ticket
  .state('menu.ticket-detail', {
    url: '/games/:gameId/manage-tickets/:barcode',
    views: {
      'menuContent' :{
        templateUrl: 'templates/ticket-detail.html',
      }
    }
  })

  .state('menu.contact-list', {
    url: '/contacts',
    views: {
      'menuContent' :{
        templateUrl: 'templates/contact-list.html',
      }
    }
  })

  .state('menu.contact-item', {
    url: '/contacts/:contactId',
    views: {
      'menuContent' :{
        templateUrl: 'templates/contact-item.html',
      }
    }
  })




  // #TODO move guest screens into seperate app for production

  .state('guest-ticket-list', {
    url: '/guest/tickets',
    templateUrl: 'templates/guest-ticket-list.html',
  })


  $urlRouterProvider.otherwise("/");

})
