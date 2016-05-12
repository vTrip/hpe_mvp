angular.module('starter').controller('GuestTicketsCtrl', function($scope, $state, $ionicModal, GuestGameService, GuestService) {

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
      m.hide();
    });
  }

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
          result[i].status = "null"
        }
      }

      $scope.guests = result;
    });
  });

  // Add game Modal
  $scope.modalTitle = "Invite Guest";

  $scope.newContact = {
    name: null,
    mobile: null,
    email: null,
  }

  var inviteGuestModalPromise = $ionicModal.fromTemplateUrl('templates/contact-add-edit.html', {
    scope: $scope,
    animation: 'slide-in-up'
  });

  $scope.inviteGuest = function inviteGuest(guest) {
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
    //TODO - POST to contact service, receieve the return object, grab the
    // contact id and create a new guest object to POST, update the guest-game.guests
    // list with this new guest.id in place of the $index of the invited duplicate
    inviteGuestModalPromise.then(function(m) {
      m.hide();
    })
  }

})
