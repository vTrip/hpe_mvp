angular.module('starter').controller('GamesListCtrl', function($scope, GamesListService, $ionicModal, $stateParams, $state) {

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

  $scope.reload = function reload() {
    $scope.games.$loading = true;
    GamesListService.all().then(function(result) {
      $scope.games.value = result.data;
      $scope.games.$loading = false;
    }).catch(function(err) {
      $scopegames.$error = true;
      $scope.games.$loading = false;
      console.log(err);
    })
  }

  $scope.formatDate = function formatDate(date) {
    var momentDate = moment(date);
    return momentDate.format('DD MMM');
  }

  // Add game Modal

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

});
