angular.module('trailApp.nav', [])

.controller('navigation', function($scope, $location, showTopNav) {
  //console.log($location.$$path)
  //signIn.navToggle($location);
  $scope.showTopNav = showTopNav.navToggle();
  $scope.showList = function() {
     $location.url('/results');
  }
})