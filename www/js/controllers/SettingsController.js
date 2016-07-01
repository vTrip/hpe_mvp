angular.module('starter').controller('SettingsCtrl', function($scope, LogoToggleService) {

  $scope.showLogos = {
    text: "Logo On/Off",
    checked: true
  };

  $scope.$on("$ionicView.leave", function(scopes, states, element) {
    LogoToggleService.set($scope.showLogos.checked);
  });

});
