angular.module('starter').controller('TicketCtrl', function($scope, $stateParams, $ionicPopup, GamesListService) {

  $scope.game = {
    $loading: false,
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
      $scope.getBarcode();
    }).catch(function(err) {
      // any error catching here
      console.log(err);
    }).finally(function() {
      loadingPopup.close();
      $scope.game.$loading = false;
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

  $scope.formatTime = function formatTime(time) {
    var momentTime = moment(time);
    return momentTime.format('hh:mm A');
  }
});
