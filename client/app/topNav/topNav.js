var trailsApp = angular.module('trailApp.topNav', [])

.controller('topNav', function($window, Auth) {
	var nav = this;
  nav.signInToggle = Auth.checkUser();; 

  nav.signIn = function () {
    $window.location.assign('/authorize_user');
  };

  nav.signOut = function () {
    Auth.removeUser();
    console.log('Auth.cookie', Auth.cookie)
    nav.signInToggle = !nav.signInToggle;
  }
})
