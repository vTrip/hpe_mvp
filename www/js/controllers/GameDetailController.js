angular.module('starter').controller('GameDetailCtrl', function($scope, $location, $stateParams, $q, GamesListService, ContactsService, GuestStatusService, $state, $ionicModal, $ionicPopup) {

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

  $scope.reload = function reload() {
    var loadingPopup = $ionicPopup.show({
     template: '<div class="icon-refreshing loading-placeholder"><ion-spinner></ion-spinner></div>',
     cssClass: 'custom-loading-popup',
    });

    var promises = [GamesListService.read($stateParams.gameId), GuestStatusService.read($stateParams.gameId)];

    $q.all(promises).then(function(res) {
      $scope.game.value = res[0].data;
      ContactsService.selection($scope.game.value.guests).then(function(guests) {
        console.log(guests);
        $scope.guests = guests.data;
        $scope.revealContactOptions = new Array(guests.data.length);
        $scope.revealContactOptions.forEach(function(item, index) {
          item = false;
        });
      }).finally(function() {
        loadingPopup.close();
        $scope.game.$loading = false;
        $scope.$broadcast('scroll.refreshComplete');
      });;
      $scope.guest_status = res[1].data;
    }).catch(function(err) {
      // any error catching here
      $scope.game.$error = true;
      console.log(err);
    });
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

  $scope.prepareForSegue = function prepareForSegue(view) {
    $location.path("/menu/games/" + $scope.game.value.id + "/" + view);
  }

  $scope.getStatusString = function getStatusString(id) {
    var index = $scope.getGuestStatus(id);
    if (index != -1) {
      return $scope.guest_status.statuses[index].status;
    }
    return null;
  }

  $scope.getGuestStatus = function getGuestStatus(id) {
    var index = $scope.guest_status.statuses.map(function(guest_status) {
        return guest_status.contact_id;
      }).indexOf(id);
    return index;
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

  $scope.saveSearchContact = function saveSearchContact(contact) {
    var guests = $scope.game.value.guests.slice();
    searchContactModalPromise.then(function(m) {
      guests.push(contact.id);
      var updated = {
        "guests": guests,
      }
      GamesListService.updateAttribute($scope.game.value.id, updated).then(function() {
        m.hide();
        $scope.reload();
      }).catch(function(err) {
        console.log(err);
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
      if (obj.indexOf($scope.contacts.$search.toLowerCase()) > -1)
      array.push($scope.contacts.value[i]);
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
