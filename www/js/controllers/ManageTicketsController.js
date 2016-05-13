angular.module('starter').controller('ManageTicketsCtrl', function($scope, $stateParams, $location, $ionicScrollDelegate, $ionicPopup, GamesListService) {

  $scope.game = {
    $loading: false,
    $error: false,
    value: null,
  };

  $scope.reload = function reload() {
    var loadingPopup = $ionicPopup.show({
     template: '<div class="icon-refreshing loading-placeholder"><ion-spinner></ion-spinner></div>',
     cssClass: 'custom-loading-popup',
    });
    $scope.game.$loading = true;
    GamesListService.read($stateParams.gameId).then(function(res) {
      $scope.game.value = res.data;
    }).catch(function(err) {
      // any error catching here
      $scope.game.$error = true;
      console.log(err);
    }).finally(function() {
      loadingPopup.close();
      $scope.game.$loading = false;
      $scope.$broadcast('scroll.refreshComplete');
    });
  }
  $scope.reload();

  $scope.formatDate = function formatDate(date) {
    var momentDate = moment(date);
    return momentDate.format('DD MMM');
  }

  $scope.formatTime = function formatTime(time) {
    var momentTime = moment(time);
    return momentTime.format('h:mm A');
  }

  $scope.ticket = {
    $input: null,
    $show: false,
    number: null,
  };

  $scope.deleteTicket = function deleteTicket($index) {
    var ticket = $scope.game.value.tickets[$index];
    $scope.game.value.tickets.splice($index, 1);
    
    var updated = {
      tickets: $scope.game.value.tickets,
    };
    GamesListService.updateAttribute($scope.game.value.id, updated);
  }

  $scope.addTicket = function addTicket() {
    $scope.ticket.$show = true;
    $location.hash("ticket-input");
    $ionicScrollDelegate.anchorScroll(true);
  }

  $scope.saveTicket = function saveTicket() {
    var newTicket = parseInt($scope.ticket.number);
    $scope.game.value.tickets.push(newTicket);
    var updated = {
      tickets: $scope.game.value.tickets,
    };
    var loadingPopup = $ionicPopup.show({
     template: '<div class="icon-refreshing loading-placeholder"><ion-spinner></ion-spinner></div>',
     cssClass: 'custom-loading-popup',
    });
    GamesListService.updateAttribute($scope.game.value.id, updated).then(function() {
      loadingPopup.close();
      $scope.resetTicket();
      $scope.reload();
    });
  }

  $scope.resetTicket = function resetTicket() {
    $scope.ticket.$show = false;
    $scope.ticket.number = null;
    $location.hash("game-card");
    $ionicScrollDelegate.anchorScroll(true);
  }

});
