var trailsApp = angular.module('trailApp.topNav', [])
.controller('topNav', function($window) {
	var nav = this;
  nav.signIn = function() {
    $window.location.assign('/authorize_user');
  };
})
