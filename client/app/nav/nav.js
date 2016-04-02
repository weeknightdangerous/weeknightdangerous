angular.module('trailApp.nav', [])

.controller('navigation', function($scope, $location, $window, showTopNav) {
  //console.log($location.$$path)
  //signIn.navToggle($location);
  $scope.bool = false;
  $scope.showTopNav = showTopNav.navToggle();
  $scope.showList = function() {
     $location.url('/results');
  };
  $scope.signIn = function() {
    $scope.bool = true;
    $window.location.assign('/authorize_user');
    console.log("signIn", $location)
  };
})