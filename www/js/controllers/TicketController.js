angular.module('starter').controller('TicketCtrl', function($scope, $stateParams, $ionicPopup, GamesListService, $document) {

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
      $scope.countDown($scope.game.value.startTime);
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
    return momentDate.format('DD MMMM');
  }

  $scope.formatTime = function formatTime(time) {
    var momentTime = moment(time);
    return momentTime.format('hh:mm A');
  }
  
  $scope.countDown = function countDown(time) {
      //time = "2016-05-30 17:30p";

      setInterval(function(){
        var now = moment();
        var start = moment(time);
        
        var days = start.diff(now, 'days');
        start.subtract(days,'days');
        
        var hours = start.diff(now, 'hours');
        start.subtract(hours,'hours');
        
        var minutes = start.diff(now, 'minutes');
        start.subtract(minutes,'minutes');
        
        var seconds = start.diff(now, 'seconds');    
        var display_time = days + " : " + hours + " : " + minutes + " : " + seconds;
        
        // Left pad with 0
        days = (days<10)?'0'+days:days;
        hours = (hours<10)?'0'+hours:hours;
        minutes = (minutes<10)?'0'+minutes:minutes;
        seconds = (seconds<10)?'0'+seconds:seconds;

        document.getElementById("countdown--days").innerHTML = days;
        document.getElementById("countdown--hours").innerHTML = hours;
        document.getElementById("countdown--minutes").innerHTML = minutes;
        document.getElementById("countdown--seconds").innerHTML = seconds;
      },333);
  }
});
