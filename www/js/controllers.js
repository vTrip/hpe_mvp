angular.module('starter')

.controller('LoginCtrl', function($scope, $state) {

  $scope.login = function login() {
    $state.go('menu');
  }

})
