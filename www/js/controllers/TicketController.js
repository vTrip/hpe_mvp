angular.module('starter').controller('TicketCtrl', function($scope, $state, $stateParams, $ionicModal, $ionicPopup, GamesListService, GuestService, $document) {

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
      $scope.countDown($scope.game.value.date, $scope.game.value.startTime);
    });
  }
  $scope.reload();

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

  $scope.respondToInvite = function respondToInvite(string) {
    var newStatus = {
      status: string,
    }
    var guestId = $scope.game.value.guests[0];
    console.log(guestId);
    GuestService.updateAttribute(guestId, newStatus).then(function(){
      $state.go('guest-ticket-list');
    });
  }

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

  $scope.countDown = function countDown(date, time) {

      var start = moment(date).format('YYYY-MM-DD') + 'T' + moment(time).format('hh:mm:ss') + 'Z';

      $scope.countdown_timer = setInterval(function(){
        var now = moment();
        var dateTime = moment(start)

        var days = dateTime.diff(now, 'days');
        dateTime.subtract(days,'days');

        var hours = dateTime.diff(now, 'hours');
        dateTime.subtract(hours,'hours');

        var minutes = dateTime.diff(now, 'minutes');
        dateTime.subtract(minutes,'minutes');

        var seconds = dateTime.diff(now, 'seconds');
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

  $scope.$on("$ionicView.afterLeave", function(event, data){
     // handle event
     clearInterval($scope.countdown_timer);
  });

})

angular.module('starter').controller('GuestTicketCtrl', function($scope, $state, $stateParams, $ionicModal, $ionicPopup, GuestGameService, GuestService, $document) {

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
    GuestGameService.read(0).then(function(res) {
      $scope.game.value = res.data;
      $scope.getBarcode();
    }).catch(function(err) {
      // any error catching here
      console.log(err);
    }).finally(function() {
      loadingPopup.close();
      $scope.game.$loading = false;
      $scope.countDown($scope.game.value.date, $scope.game.value.startTime);
    });
  }
  $scope.reload();

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

  $scope.respondToInvite = function respondToInvite(string) {
    var newStatus = {
      status: string,
    }
    var guestId = $scope.game.value.guests[0];
    GuestService.updateAttribute(guestId, newStatus).then(function(){
      $state.go('guest-ticket-list');
    });
  }

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

  $scope.countDown = function countDown(date, time) {

      var start = moment(date).format('YYYY-MM-DD') + 'T' + moment(time).format('hh:mm:ss') + 'Z';

      $scope.countdown_timer = setInterval(function(){
        var now = moment();
        var dateTime = moment(start)

        var days = dateTime.diff(now, 'days');
        dateTime.subtract(days,'days');

        var hours = dateTime.diff(now, 'hours');
        dateTime.subtract(hours,'hours');

        var minutes = dateTime.diff(now, 'minutes');
        dateTime.subtract(minutes,'minutes');

        var seconds = dateTime.diff(now, 'seconds');
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

  $scope.$on("$ionicView.afterLeave", function(event, data){
     // handle event
     clearInterval($scope.countdown_timer);
  });

})
