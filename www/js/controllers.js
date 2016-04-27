angular.module('starter');

angular.module('starter').controller('LoginCtrl', function($scope, $state) {

  $scope.$on("$ionicView.loaded", function(scopes, states, element) {
    //focus on the input field once the view is loaded
    element('form-login-password').focus();
  });

  $scope.login = function login() {
    $state.go('game-list');
  }

});

angular.module('starter').controller('GameDetailCtrl', function($scope, $location, $stateParams, GamesListService, $state) {
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

  $scope.prepareForSegue = function prepareForSegue(view) {
    $location.path("/games/" + $scope.game.id + "/" + view);
  }

})

angular.module('starter').controller('ManageTicketsCtrl', function($scope, $stateParams, $location, $ionicScrollDelegate, GamesListService) {

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

  $scope.ticket = {
    $input: null,
    $show: false,
    number: null,
  };

  $scope.addTicket = function addTicket() {
    $scope.ticket.$show = true;
    $location.hash("ticket-input");
    $ionicScrollDelegate.anchorScroll(true);
  }

  $scope.saveTicket = function saveTicket() {
    var newTicket = {
      number: $scope.ticket.number,
    };
    $scope.game.tickets.push(newTicket);
    GamesListService.update($scope.game);
    $scope.reload();
    $scope.resetTicket();
  }

  $scope.resetTicket = function resetTicket() {
    $scope.ticket.$show = false;
    $scope.ticket.number = null;
    $location.hash("game-card");
    $ionicScrollDelegate.anchorScroll(true);
  }

})

angular.module('starter').controller('AddGuestCtrl', function($scope, $stateParams, ContactsService, GamesListService, $ionicModal) {

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

  var addContactModalPromise = $ionicModal.fromTemplateUrl('templates/contact-add-contact.html', {
    scope: $scope,
    animation: 'slide-in-up'
  });

  $scope.newContact = {
    name: null,
    mobile: null,
    email: null,
  }

  $scope.showAddContact = function showAddContact() {
    addContactModalPromise.then(function(m) {
      m.show();
    }).catch(function(err) {
      //TODO - catch any errors here
    })
  }

  $scope.cancelAddContact = function cancelAddContact() {
    addContactModalPromise.then(function(m) {
      m.hide();
    }).catch(function(err) {
      //TODO - catch any errors here
    })
  }

  $scope.saveContact = function saveContact() {
    //TODO - create a new contact add add to service
    ContactsService.create($scope.newContact).then(function() {
      addContactModalPromise.then(function(m) {
        m.hide();
      }).catch(function(err) {
        //TODO - catch any errors here
      });
    }).catch(function(err) {
      console.log(err);
    });

  }

})
