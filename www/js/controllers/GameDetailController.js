angular.module('starter').controller('GameDetailCtrl', function($scope, $location,
  $stateParams, $q, $ionicListDelegate, GamesListService, GuestService,
  ContactsService, $state, $ionicModal, $ionicPopup, LogoToggleService, $timeout,
  TeamCodes) {

  $scope.$on("$ionicView.enter", function(scopes, states, element) {
    $scope.showLogos = LogoToggleService.get();
  });

  $scope.game = {
    $loading: true,
    $error: false,
    value: null,
  };

  $scope.guests = [];
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

  $scope.$on("$ionicView.enter", function( scopes, states ) {
    $scope.reload();
  });

  $scope.$on("$ionicView.leave", function( scopes, states ) {
    $scope.game.$loading = true;
  });

  $scope.goToManageTickets = function goToManageTickets() {
    $state.go('menu.manage-tickets', {gameId: $stateParams.gameId})
  }

  $scope.isReady = function isReady() {
    return !$scope.game.$loading && !$scope.guests.length > 0;
  }

  $scope.reload = function reload() {
    var loadingPopup = $ionicPopup.show({
     template: '<div class="icon-refreshing loading-placeholder"><ion-spinner></ion-spinner></div>',
     cssClass: 'custom-loading-popup',
    });
    $timeout(function() {
      GamesListService.read($stateParams.gameId).then(function(res) {
        $scope.game.value = res.data;
      }).catch(function(err) {
        // any error catching here
        $scope.game.$error = true;
        console.log(err);
      }).finally(function() {
        if ($scope.game.value.guests.length > 0) {
          $scope.loadGuests();
        }
        loadingPopup.close();
      });
      $scope.showLogos = LogoToggleService.get();
    }, 500);
  }

  $scope.getTeamCode = function getTeamCode(team) {
    return TeamCodes.get(team);
  }

  $scope.loadGuests = function loadGuests() {
    var selection = $scope.game.value.guests;
    GuestService.selection(selection).then(function(result) {
      $scope.guests = displayGuests(result.data);
      $scope.revealContactOptions = new Array(result.data.length);
      $scope.revealContactOptions.forEach(function(item, index) {
        item = false;
      });
    }).finally(function() {
      $scope.game.$loading = false;
      $scope.$broadcast('scroll.refreshComplete');
    });
  }

  // iterates over the guests looking for duplicated contact_ids to ammend the
  // objects as required
  function displayGuests(guests) {
    var occured = [];

    guests.forEach(function(guest, index){
      if (!occured.hasOwnProperty(guest.contact_id)) {
        occured[guest.contact_id] = 0;
      }

      occured[guest.contact_id]++;

      if (occured[guest.contact_id] > 1) {
        guest.status = 'guest';
        guest.name += " (Guest " + (occured[guest.contact_id] - 1) + ")";
      }
    });

    guests.sort(function(a, b){
       if(a.name < b.name) return -1;
       if(a.name > b.name) return 1;
       return 0;
     });

    return guests;
  }

  $scope.toggleShowContactOptions = function toggleShowContactOptions($index) {
    $scope.revealContactOptions[$index] ^= true;
  }

  $scope.formatDate = function formatDate(date) {
    var momentDate = moment(date);
    return momentDate.format('DD MMM');
  }

  $scope.formatTime = function formatTime(time) {
    var momentTime = moment(time);
    return momentTime.format('h:mm A');
  }

  $scope.invite = function invite(guest) {
    var updated = {
      status: "invited"
    }

    GuestService.updateAttribute(guest.id, updated);
    $scope.reload();
  }

  $scope.deleteGuest = function deleteGuest(id) {
    var newList = {
      guests: $scope.game.value.guests
    }
    var index = newList.guests.indexOf(id);
    var gameId = $scope.game.value.id;

    newList.guests.splice(index, 1);
    if (newList.guests[newList.guests.length-1] == -1) {
      newList.guests.splice(newList.guests.length-1, 1);
    }

    var promises = [GuestService.delete(id), GamesListService.updateAttribute(gameId, newList)];
    $q.all(promises);
    $ionicListDelegate.closeOptionButtons();
    $scope.reload();
  }

  // Contact search modal
  var searchContactModalPromise = $ionicModal.fromTemplateUrl('templates/game-add-guest.html', {
    scope: $scope,
    animation: 'slide-in-up'
  });

  $scope.showSearchContact = function showSearchContact() {
    searchContactModalPromise.then(function(m) {
      $scope.getContacts();
      m.show();
    }).catch(function(err) {
      //TODO - catch any errors here
    })
  }

  $scope.cancelSearchContact = function cancelSearchContact() {
    searchContactModalPromise.then(function(m) {
      m.hide();
    });
  }

  $scope.addGuest = function addGuest(guest) {
    var loadingPopup = $ionicPopup.show({
     template: '<div class="icon-refreshing loading-placeholder"><ion-spinner></ion-spinner></div>',
     cssClass: 'custom-loading-popup',
    });
    var guest = {
      contact_id: guest.contact_id,
      game_id: $scope.game.id,
    };

    GuestService.create(guest).then(function() {
      searchContactModalPromise.then(function(m) {
        m.hide();
      }).finally(function() {
        loadingPopup.close();
        $scope.reload();
      });
    });
  }

  $scope.saveSearchContact = function saveSearchContact(contact) {
    var guest = {
      contact_id: contact.id,
      game_id: $scope.game.value.id,
    };

    GuestService.create(guest).then(function() {
      searchContactModalPromise.then(function(m) {
        m.hide();
      }).finally(function() {
        $scope.reload();
      });
    });
  }

  $scope.contacts = {
    $loading: false,
    $error: false,
    value: [],
    $search: '',
  };

  var game = null;

  $scope.getContacts = function getContacts() {
    ContactsService.all().then(function(result) {
      $scope.contacts.value = result.data;
    }).catch(function(err) {
      console.log("Error loading contacts");
      console.log(err);
    });
  }

  $scope.filteredUsers = [];

  $scope.filterUsers = function filterUsers() {
    var array = [];
    for (var i = 0; i < $scope.contacts.value.length; ++i) {
      var obj = $scope.contacts.value[i].email;
      if (obj != undefined) {
        if (obj.indexOf($scope.contacts.$search.toLowerCase()) > -1)
        array.push($scope.contacts.value[i]);
      }
    }
    $scope.filteredUsers = array;
  }
  // end of contact search modal

  // Add contact Modal
  var addContactModalPromise = $ionicModal.fromTemplateUrl('templates/contact-add-edit.html', {
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
    });
  }

  $scope.cancelAddEditContact = function cancelAddContact() {
    addContactModalPromise.then(function(m) {
      m.hide();
    });
  }

  $scope.saveContact = function saveContact() {
    //TODO - create a new contact add add to service
    ContactsService.create($scope.newContact).then(function() {
      addContactModalPromise.then(function(m) {
        m.hide();
      });
    }).catch(function(err) {
      console.log(err);
    });

  }
  // end of add contact modal

  // Add game Modal
  var editGameModalPromise = $ionicModal.fromTemplateUrl('templates/game-add-edit.html', {
    scope: $scope,
    animation: 'slide-in-up'
  });

  $scope.didMakeChanges = false;
  $scope.modalTitle = "Edit Game";

  $scope.changesMade = function changesMade() {
    $scope.didMakeChanges = true;
  }

  $scope.editGame = function editGame() {
    $scope.newGame = $scope.game.value;
    editGameModalPromise.then(function(m) {
      m.show();
    });
  }

  $scope.saveGame = function saveGame() {
    GamesListService.updateAttribute($scope.game.value.id, $scope.newGame).then(function() {
      editGameModalPromise.then(function(m) {
        $scope.reload();
        m.hide();
      });
    }).catch(function(err) {
      console.log(err);
    });
  }

  $scope.cancelAddEditGame = function cancelAddEditGame() {
    if ($scope.didMakeChanges) {
      // A confirm dialog
     var confirmPopup = $ionicPopup.confirm({
       template: 'Exit without saving?',
       cssClass: 'custom-popup',
     });

     confirmPopup.then(function(res) {
       if(res) {
         confirmPopup.close();
         editGameModalPromise.then(function(m) {
           m.hide();
         });
       } else {
         confirmPopup.close();
       }
     });
   } else {
     editGameModalPromise.then(function(m) {
       m.hide();
     });
   }
  }

  $scope.showNewEventField = function showNewEventField() {
    var newEvent = {
      start_time: null,
      details: null,
    };
    $scope.newGame.events.push(newEvent);
  }
  // end of edit game modal

});
