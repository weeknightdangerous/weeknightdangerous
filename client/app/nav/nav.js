angular.module('trailApp.nav', [])

.controller('navigation', function($scope, $location, $window, showTopNav) {
  //console.log($location.$$path)
  //signIn.navToggle($location);
  $scope.showTopNav = showTopNav.navToggle();
  $scope.showList = function() {
     $location.url('/results');
  };
  $scope.signIn = function() {
    $window.location.assign('/authorize_user');
    //$location.url('/authorize_user');
    console.log("signIn", $location)
  };
})