// angular.module('starter');

angular.module('starter').controller('LoginCtrl', function($scope, $state, $rootScope) {

  $rootScope.logo_toggle = true;

  $scope.$on("$ionicView.loaded", function(scopes, states, element) {
    //focus on the input field once the view is loaded
    element('form-login-password').focus();
  });

  $scope.login = function login() {
    $state.go('menu.game-list');
  }

});
