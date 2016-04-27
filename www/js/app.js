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

  // list of games
  .state('game-list', {
    url: '/games',
    templateUrl: 'templates/game-list.html',
  })

  // detail of selected game
  .state('game-item', {
    url: '/games/:gameId',
    templateUrl: 'templates/game-detail.html',
  })

  // add guest to game
  .state('add-guest', {
    url: '/games/:gameId/add-guest',
    templateUrl: 'templates/game-add-guest.html'
  })

  .state('ticket-list', {
    url: '/games/item/tickets',
    templateUrl: 'templates/game-ticket-list.html',
  })

  .state('contact-list', {
    url: '/contacts',
    templateUrl: 'templates/contact-list.html',
  })

  .state('contact-item', {
    url: '/contacts/item',
    templateUrl: 'templates/contact-item.html',
  })




  // #TODO move guest screens into seperate app for production

  .state('guest-ticket-list', {
    url: '/guest/tickets',
    templateUrl: 'templates/guest-ticket-list.html',
  })


  $urlRouterProvider.otherwise("/");

})
