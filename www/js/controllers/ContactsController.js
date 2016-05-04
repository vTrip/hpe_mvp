angular.module('starter').controller('ContactsCtrl', function($scope, ContactsService, $ionicModal, $ionicPopup) {
  $scope.contacts = {
    $loading: false,
    $error: false,
    value: [],
    $search: '',
  };

  var game = null;

  $scope.$on( "$ionicView.enter", function( scopes, states ) {
    $scope.contacts.$loading = true;
    $scope.reload();
  });

  $scope.reload = function reload() {
    var loadingPopup = $ionicPopup.show({
     template: '<div class="icon-refreshing loading-placeholder"><ion-spinner></ion-spinner></div>',
     cssClass: 'custom-loading-popup',
    });
    ContactsService.all().then(function(result) {
      $scope.contacts.value = $scope.filteredUsers = result.data;
    }).catch(function(err) {
      console.log("Error loading contacts");
      console.log(err);
    }).finally(function() {
      loadingPopup.close();
      $scope.contacts.$loading = false;
      $scope.$broadcast('scroll.refreshComplete');
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

  $scope.modalTitle = "Add Contact"

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
});
