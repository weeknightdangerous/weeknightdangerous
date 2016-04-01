angular.module('trailApp.services', [])

.factory('showTopNav', function($location) {

  var navToggle = function() {
    console.log('working')
    var showTopNav = {};
    if ($location.$$path === '/home') {
      
      showTopNav.showTopNav = false;
      console.log('showTopNav:', showTopNav.showTopNav)
    } else {
      showTopNav.showTopNav = true;
      console.log('showNav:', showTopNav.showTopNav)
    }
    return showTopNav;
  };

  return {

    navToggle: navToggle
  }
})