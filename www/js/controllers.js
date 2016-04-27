angular.module('starter')

.controller('LoginCtrl', function($scope, $state) {

  $scope.$on("$ionicView.loaded", function(scopes, states, element) {
    //focus on the input field once the view is loaded
    element('form-login-password').focus();
  });

  $scope.login = function login() {
    $state.go('game-list');
  }

})

.controller('GamesListCtrl', function($scope, GamesListService, $ionicModal, $stateParams, $state) {

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


  $scope.reload = function reload() {
    $scope.games.$loading = true;
    GamesListService.all().then(function(result) {
      $scope.games.value = result;
      $scope.games.$loading = false;
    }).catch(function(err) {
      $scopegames.$error = true;
      $scope.games.$loading = false;
      console.log(err);
    })
  }
  $scope.reload();

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
      console.log(obj);
      $scope.games.value.push(obj);
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

  $scope.deleteGame = function deleteGame($index) {
    GamesListService.delete($index).then(function() {
      //TODO - reset state of ion list items by rehiding option btns
    }).catch(function(err) {

    });
  }

})

.controller('GameDetailCtrl', function($scope, $stateParams, GamesListService, $state) {
  $scope.game = null;

  $scope.reload = function reload() {
    GamesListService.read($stateParams.gameId).then(function(res) {
      $scope.game = res;
    }).catch(function(err) {
      // any error catching here
      console.log(err);
    });
  }
  $scope.reload();

  $scope.formatDate = function formatDate(date) {
    var momentDate = moment(date);
    return momentDate.format('DD MMM');
  }

  $scope.addGuest = function addGuest() {
    $state.go('add-guest');
  }

})

.controller('AddGuestCtrl', function($scope, $stateParams, ContactsService, GamesListService) {

  $scope.contacts = {
    $loading: false,
    $error: false,
    value: [],
    $search: '',
  };

  $scope.reload = function reload() {
    ContactsService.all().then(function(result) {
      $scope.contacts.value = result;
    }).catch(function(err) {
      console.log("Error loading contacts");
      console.log(err);
    });
  }
  $scope.reload();

  $scope.filteredUsers = [];

  $scope.filterUsers = function filterUsers() {
    var array = [];
    for (var i = 0; i < $scope.contacts.value.length; ++i) {
      var obj = $scope.contacts.value[i].email;
      if (obj.indexOf($scope.contacts.$search.toLowerCase()) > -1)
      array.push($scope.contacts.value[i]);
    }
    $scope.filteredUsers = array;
  }

})
