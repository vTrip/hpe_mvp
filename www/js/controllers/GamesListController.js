angular.module('starter').controller('GamesListCtrl', function($scope, GamesListService, $ionicPopup, $ionicModal, $stateParams, $state) {

  $scope.games = {
    $loading: false,
    $error: false,
    value: [],
  };

  var teams = $scope.teams = [
    {name: 'Broncos'},
    {name: 'Bulldogs'},
    {name: 'Cowboys'},
    {name: 'Dragons'},
    {name: 'Eels'},
    {name: 'Knights'},
    {name: 'Panthers'},
    {name: 'Rabbitohs'},
    {name: 'Raiders'},
    {name: 'Roosters'},
    {name: 'Sea-Eagles'},
    {name: 'Sharks'},
    {name: 'Storm'},
    {name: 'Tigers'},
    {name: 'Titans'},
    {name: 'Warriors'},
  ];

  $scope.$on( "$ionicView.enter", function( scopes, states ) {
    $scope.reload();
  });

  $scope.$on( "$ionicView.leave", function( scopes, states ) {
    $scope.games.$loading = true;
  });

  $scope.reload = function reload() {
    $scope.games.$loading = true;
    var loadingPopup = $ionicPopup.show({
     template: '<div class="icon-refreshing loading-placeholder"><ion-spinner></ion-spinner></div>',
     cssClass: 'custom-loading-popup',
    });
    GamesListService.all().then(function(result) {
      $scope.games.value = result.data;
    }).catch(function(err) {
      $scope.games.$error = true;
      console.error(err);
    }).finally(function() {
      loadingPopup.close();
      $scope.games.$loading = false;
      $scope.$broadcast('scroll.refreshComplete');
    });
  }


  $scope.isEmptyState = function isEmptyState() {
    return $scope.games.length = 0 && !$scope.games.$loading;
  }

  $scope.formatDate = function formatDate(date) {
    var momentDate = moment(date);
    return momentDate.format('DD MMM');
  }

  // Add game Modal
  $scope.modalTitle = "Add Game";

  var addGameModalPromise = $ionicModal.fromTemplateUrl('templates/game-add-edit.html', {
    scope: $scope,
    animation: 'slide-in-up'
  });

  $scope.addGame = function addGame() {
    $scope.newGame = {
      id: $scope.games.value.length,
      date: null,
      startTime: null,
      finishTime: null,
      homeTeam: 'Sea Eagles',
      awayTeam: null,
      invited: 0,
      accepted: 0,
      declined: 0,
      host_name: null,
      host_contact: null,
      events: [],
    }
    addGameModalPromise.then(function(m) {
      m.show();
    });
  }

  $scope.saveGame = function saveGame() {
    GamesListService.create($scope.newGame).then(function(obj) {
      addGameModalPromise.then(function(m) {
        m.hide();
        $scope.reload();
      });
    }).catch(function(err) {
      console.log(err);
    });
  }

  $scope.cancelAddEditGame = function cancelAddEditGame() {
    addGameModalPromise.then(function(m) {
      m.hide();
    });
  }

  $scope.deleteGame = function deleteGame($index) {
    GamesListService.delete($index).then(function() {
      //TODO - reset state of ion list items by rehiding option btns
      $scope.reload();
    }).catch(function(err) {
      console.log(err);
    });
  }

  $scope.showNewEventField = function showNewEventField() {
    var newEvent = {
      start_time: null,
      details: null,
    };
    $scope.newGame.events.push(newEvent);
  }

  $scope.deleteEvent = function deleteEvent($index) {
    $scope.newGame.events.splice($index, 1);
  }

});
