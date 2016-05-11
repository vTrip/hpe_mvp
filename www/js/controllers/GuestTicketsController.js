angular.module('starter').controller('GuestTicketsCtrl', function($scope, $state, $ionicModal) {

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

})
