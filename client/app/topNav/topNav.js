var trailsApp = angular.module('trailApp.topNav', [])

.controller('topNav', function($window, Auth) {
	var nav = this;
  nav.user,
  nav.image;
  nav.signInToggle = Auth.checkUser();; 

  nav.signIn = function () {
    $window.location.assign('/authorize_user');
  };

  nav.myFav = function () {
    $window.location.href = '/#/myFav';
  }

  nav.signOut = function () {
    Auth.removeUser();
    console.log('Auth.cookie', Auth.cookie)
    nav.signInToggle = !nav.signInToggle;
    $window.location.href = '/';
  }

  nav.getUser = function () {
    nav.user = Auth.getUser();
    nav.image = Auth.getImage();
  }

  nav.getUser();

})
