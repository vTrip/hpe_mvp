angular.module('starter');

angular.module('starter').controller('LoginCtrl', function($scope, $state) {

  $scope.$on("$ionicView.loaded", function(scopes, states, element) {
    //focus on the input field once the view is loaded
    element('form-login-password').focus();
  });

  $scope.login = function login() {
    $state.go('menu.game-list');
  }

});

angular.module('starter').controller('GameDetailCtrl', function($scope, $location, $stateParams, GamesListService, ContactsService, $state, $ionicModal) {
  $scope.game = null;
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

  $scope.reload = function reload() {
    GamesListService.read($stateParams.gameId).then(function(res) {
      $scope.game = res.data;
      console.log($scope.game);
      ContactsService.selection($scope.game.guests).then(function(guests) {
        $scope.guests = guests.data;
      });
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
    $location.path("/menu/games/" + $scope.game.id + "/" + view);
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
    }).catch(function(err) {
      //TODO - catch any errors here
    })
  }

  $scope.saveSearchContact = function saveSearchContact(contact) {
    var guests = $scope.game.guests.slice();
    searchContactModalPromise.then(function(m) {
      guests.push(contact.id);
      var updated = {
        "guests": guests,
      }
      GamesListService.updateAttribute($scope.game.id, updated).then(function() {
        m.hide();
        $scope.reload();
      }).catch(function(err) {
        console.log(err);
      });
    }).catch(function(err) {
      //TODO - catch any errors here
    })
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

  $scope.cancelAddEditContact = function cancelAddContact() {
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
  // end of add contact modal

  // Add game Modal
  var editGameModalPromise = $ionicModal.fromTemplateUrl('templates/game-add-edit.html', {
    scope: $scope,
    animation: 'slide-in-up'
  });

  $scope.editGame = function editGame() {
    $scope.newGame = $scope.game;
    editGameModalPromise.then(function(m) {
      m.show();
    });
  }

  $scope.saveGame = function saveGame() {
    GamesListService.updateAttribute($scope.game.id, $scope.newGame).then(function() {
      editGameModalPromise.then(function(m) {
        $scope.reload();
        m.hide();
      });
    }).catch(function(err) {
      console.log(err);
    });
  }

  $scope.cancelAddEditGame = function cancelAddEditGame() {
    editGameModalPromise.then(function(m) {
      m.hide();
    });
  }
  // end of edit game modal

})

angular.module('starter').controller('ManageTicketsCtrl', function($scope, $stateParams, $location, $ionicScrollDelegate, GamesListService) {

  $scope.game = null;

  $scope.reload = function reload() {
    GamesListService.read($stateParams.gameId).then(function(res) {
      $scope.game = res.data;
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
    var newTicket = parseInt($scope.ticket.number);
    $scope.game.tickets.push(newTicket);
    var updated = {
      tickets: $scope.game.tickets,
    };
    GamesListService.updateAttribute($scope.game.id, updated).then(function() {
      $scope.reload();
      $scope.resetTicket();
    });
  }

  $scope.resetTicket = function resetTicket() {
    $scope.ticket.$show = false;
    $scope.ticket.number = null;
    $location.hash("game-card");
    $ionicScrollDelegate.anchorScroll(true);
  }

})

angular.module('starter').controller('TicketCtrl', function($scope, $stateParams, GamesListService) {

  $scope.game = null;

  $scope.reload = function reload() {
    GamesListService.read($stateParams.gameId).then(function(res) {
      $scope.game = res.data;
      $scope.getBarcode();
    }).catch(function(err) {
      // any error catching here
      console.log(err);
    });
  }
  $scope.reload();

  $scope.getBarcode = function getBarcode() {
    JsBarcode("#barcode", $stateParams.barcode, {
      format: "ITF",
      width:2,
      height:100,
      format: "auto",
      displayValue: true,
      font: "monospace",
      textAlign: "center",
      textPosition: "bottom",
      textMargin: 5,
      fontSize: 20,
      background: "#ffffff",
      lineColor: "#000000",
    });
  }

  $scope.formatDate = function formatDate(date) {
    var momentDate = moment(date);
    return momentDate.format('DD MMM');
  }
})

.controller('ContactsCtrl', function($scope, ContactsService, $ionicModal) {
  $scope.contacts = {
    $loading: false,
    $error: false,
    value: [],
    $search: '',
  };

  var game = null;

  $scope.reload = function reload() {
    ContactsService.all().then(function(result) {
      $scope.contacts.value = $scope.filteredUsers = result.data;
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
  // end of add contact modal
})

.controller('ContactsDetailCtrl', function($scope, $stateParams, $ionicModal, ContactsService) {

  $scope.contact = null;

  $scope.reload = function reload() {
    ContactsService.read($stateParams.contactId).then(function(contact) {
      $scope.contact = contact.data;
    });
  }
  $scope.reload();

  // Add contact Modal
  var editContactModalPromise = $ionicModal.fromTemplateUrl('templates/contact-add-edit.html', {
    scope: $scope,
    animation: 'slide-in-up'
  });

  $scope.showEditContact = function showAddContact() {
    $scope.newContact = $scope.contact;
    editContactModalPromise.then(function(m) {
      m.show();
    }).catch(function(err) {
      //TODO - catch any errors here
    })
  }

  $scope.cancelAddEditContact = function cancelAddContact() {
    editContactModalPromise.then(function(m) {
      m.hide();
    }).catch(function(err) {
      //TODO - catch any errors here
    })
  }

  $scope.saveContact = function saveContact() {
    ContactsService.update($scope.newContact).then(function() {
      editContactModalPromise.then(function(m) {
        $scope.reload();
        m.hide();
      }).catch(function(err) {
        //TODO - catch any errors here
      });
    }).catch(function(err) {
      console.log(err);
    });

  }
  // end of add contact modal

})
