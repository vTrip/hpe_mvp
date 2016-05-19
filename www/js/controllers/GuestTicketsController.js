angular.module('starter').controller('GuestTicketsCtrl', function($scope, $state, $q, $ionicModal, $ionicPopup, GuestGameService, GuestService, ContactsService) {

  var declineTicketModalPromise = $ionicModal.fromTemplateUrl('templates/guest-ticket-decline.html', {
    scope: $scope,
    animation: 'slide-in-up'
  });

  $scope.showDeclineTicketModal = function showDeclineTicketModal() {
    declineTicketModalPromise.then(function(m) {
      m.show();
    });
  }

  $scope.hideDeclineTicketModal = function hideDeclineTicketModal() {
    declineTicketModalPromise.then(function(m) {
      $scope.respondToInvite("declined");
      m.hide();
    });
  }

  $scope.reload = function reload() {
    var loadingPopup = $ionicPopup.show({
     template: '<div class="icon-refreshing loading-placeholder"><ion-spinner></ion-spinner></div>',
     cssClass: 'custom-loading-popup',
    });
    GuestGameService.read(0).then(function(res) {
      $scope.guestGame = res.data;
      GuestService.selection($scope.guestGame.guests).then(function(res) {
        var result = res.data;
        var duplicate = 0;
        var first = result[0];

        for (var i = 1; i < result.length; ++i) {
          var current = result[i];
          if (first.id == current.id) {
            duplicate += 1;
            result[i].name = "Guest " + duplicate;
            result[i].status = null
          }
        }

        $scope.guests = result;
      });
    }).finally(function() {
      loadingPopup.close();
    });
  }
  $scope.reload();

  // Add game Modal
  $scope.modalTitle = "Invite Guest";

  $scope.newContact = {
    name: null,
    mobile: null,
    email: null,
    $index: null,
  }

  var inviteGuestModalPromise = $ionicModal.fromTemplateUrl('templates/contact-add-edit.html', {
    scope: $scope,
    animation: 'slide-in-up'
  });

  $scope.inviteGuest = function inviteGuest($index) {
    $scope.newContact.$index = $index;
    inviteGuestModalPromise.then(function(m) {
      m.show();
    });
  }

  // Function name needs to coincide with the view call as the view is shared
  // across multiple controllers
  $scope.cancelAddEditContact = function cancelAddEditContact() {
    inviteGuestModalPromise.then(function(m) {
      m.hide();
    });
  }

  // Function name needs to coincide with the view call as the view is shared
  // across multiple controllers
  $scope.saveContact = function saveContact() {
    var loadingPopup = $ionicPopup.show({
     template: '<div class="icon-refreshing loading-placeholder"><ion-spinner></ion-spinner></div>',
     cssClass: 'custom-loading-popup',
    });

    // create the contact
    ContactsService.create($scope.newContact).then(function(object) {
      // initialise a guest object with the return object (contact)'s'
      // generated id
      var guest = {
        contact_id: object.data.id,
        game_id: $scope.guestGame.id
      }

      // create the guest
      GuestService.create(guest).then(function(obj) {
        //initialise the guest-game attribute to update
        var guests = {
          guests: $scope.guestGame.guests,
        }

        var guest = {
          status: "invited"
        }

        // update the array of guests with the returned guest created object's id
        guests.guests[$scope.newContact.$index] = obj.data.id;


        // update the guest game object's guests attribute
        var promises = [GuestGameService.updateAttribute($scope.guestGame.id, guests), GuestService.updateAttribute(obj.data.id, guest)];

        $q.all(promises).then(function() {
          inviteGuestModalPromise.then(function(m) {
            m.hide();
          }).finally(function() {
            loadingPopup.close();
            $scope.reload();
          });
        });

      });

    });

  }

  $scope.respondToInvite = function respondToInvite(string) {
    var newStatus = {
      status: string,
    }
    var guestId = $scope.guestGame.guests[0];

    GuestService.updateAttribute(guestId, newStatus).finally(function() {
      $scope.reload();
    });
  }

})
