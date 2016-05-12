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
    })
  })

})
