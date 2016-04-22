angular.module('starter')

.controller('LoginCtrl', function($scope, $state) {

  $scope.$on("$ionicView.loaded", function(scopes, states, element) {
    //focus on the input field once the view is loaded
    element('form-login-password').focus();
  });

  $scope.login = function login() {
    $state.go('menu');
  }

})

.controller('GamesListCtrl', function($scope, GamesListService, $ionicModal) {

  var games = $scope.games = {
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


  $scope.reload = function reload() {
    games.$loading = true;
    GamesListService.all().then(function(result) {
      games.value = result;
      games.$loading = false;
    }).catch(function(err) {
      games.$error = true;
      games.$loading = false;
      console.log(err);
    })
  }
  $scope.reload();

  // Add game Modal

  var addGameModalPromise = $ionicModal.fromTemplateUrl('templates/host-game-add-edit.html', {
    scope: $scope,
    animation: 'slide-in-up'
  });

  $scope.addGame = function addGame() {
    $scope.newGame = {
      id: games.value.length,
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
    GamesListService.create($scope.newGame).then(function() {
      games.value.push($scope.newGame);
      addGameModalPromise.then(function(m) {
        m.hide();
      });
    }).catch(function(err) {
      console.log(err);
    });
  }

  $scope.cancelAddGame = function cancelAddGame() {
    addGameModalPromise.then(function(m) {
      m.hide();
    });
  }

})
