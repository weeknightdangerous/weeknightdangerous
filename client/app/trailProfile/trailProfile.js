var trailsApp = angular.module('trailApp.profile', [])

.controller('profileCtrl', function(showTrails, $scope) {
  var profile = this;
  profile.data = {};

    //get trail info from the stored value in showTrails service by using showTrails.getTrail(); 
    profile.getTrail = function() {
      profile.data = showTrails.getTrail();
     };
    
    //initialize the trail data
    profile.getTrail();
})


// angular.module('cookiesExample', ['ngCookies'])
// .controller('ExampleController', ['$cookies', function($cookies) {
//   // Retrieving a cookie
//   var favoriteCookie = $cookies.myFavorite;
//   // Setting a cookie
//   $cookies.myFavorite = 'oatmeal';
// }]);
