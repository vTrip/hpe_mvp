angular.module('starter')

.controller('LoginCtrl', function($scope, $state) {

  $scope.$on("$ionicView.loaded", function(scopes, states, element) {
    //focus on the input field once the view is loaded
    element('form-login-password').focus();
  });

  $scope.login = function login() {
    $state.go('menu');
  }

})

.controller('GamesListCtrl', function($scope, GamesListService) {

  var games = $scope.games = {
    $loading: false,
    $error: false,
    value: [],
  };

  $scope.reload = function reload() {
    games.$loading = true;
    GamesListService.all().then(function(result) {
      games.value = result;
      games.$loading = false;
    }).catch(function(err) {
      games.$error = true;
      games.$loading = false;
      console.log(err);
    })
  }
  $scope.reload();

})
