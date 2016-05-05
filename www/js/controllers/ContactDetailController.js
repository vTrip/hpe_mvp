angular.module('starter').controller('ContactsDetailCtrl', function($scope, $stateParams, $ionicModal, $ionicPopup, ContactsService) {

  $scope.contact = {
    $loading: false,
    $error: false,
    value: null,
  };

  $scope.reload = function reload() {
    $scope.contact.$loading = true;
    var loadingPopup = $ionicPopup.show({
     template: '<div class="icon-refreshing loading-placeholder"><ion-spinner></ion-spinner></div>',
     cssClass: 'custom-loading-popup',
    });
    ContactsService.read($stateParams.contactId).then(function(contact) {
      $scope.contact.value = contact.data;
    }).catch(function() {
      $scope.contact.$error = true;
    }).finally(function() {
      loadingPopup.close();
      $scope.contact.$loading = false;
      $scope.$broadcast('scroll.refreshComplete');
    });;
  }
  $scope.reload();

  // Add contact Modal
  var editContactModalPromise = $ionicModal.fromTemplateUrl('templates/contact-add-edit.html', {
    scope: $scope,
    animation: 'slide-in-up'
  });

  $scope.modalTitle = "Edit Contact"
  $scope.didMakeChanges = false;

  $scope.changesMade = function changesMade() {
    $scope.didMakeChanges = true;
  }

  $scope.showEditContact = function showAddContact() {
    $scope.newContact = $scope.contact.value;
    editContactModalPromise.then(function(m) {
      m.show();
    }).catch(function(err) {
      //TODO - catch any errors here
    })
  }

  $scope.cancelAddEditContact = function cancelAddEditContact() {
    if ($scope.didMakeChanges) {
      var confirmPopup = $ionicPopup.confirm({
        template: 'Exit without saving?',
        cssClass: 'custom-popup',
      });
      confirmPopup.then(function(res) {
        if(res) {
          confirmPopup.close();
          editContactModalPromise.then(function(m) {
            m.hide();
          });
        } else {
          confirmPopup.close();
        }
      });
    } else {
      editContactModalPromise.then(function(m) {
        m.hide();
      });
    }
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

});
