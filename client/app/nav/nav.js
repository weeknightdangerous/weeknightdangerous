angular.module('trailApp.nav', [])

.controller('navigation', function($location, $window, showTopNav, showTrails) {
  var nav = this;

  nav.location = {
    city: '',
    state: ''
  }

  nav.bool = false;
  nav.showTopNav = showTopNav.navToggle();

  nav.signIn = function() {
    nav.bool = true;
    $window.location.assign('/authorize_user');
    console.log("signIn", $location)
  };

  nav.showList = function(location, isValid) {
    console.log('showlist is working: ', location)
    //if(isValid) { 
    // nav.getTrails = function(){
    //   nav.data.city = nav.location.city;
    //   nav.data.state = nav.location.state;
    // }

      console.log("showTrails:", showTrails.postLocation(location))
      showTrails.postLocation(location)
      .then(function(result) {
        console.log('postLocation result: ', result);
      })
      .catch(function(err) {
        console.log('postLocation err: ', err);
      })
      .finally(function(){

      })
    //}
  };

})

// Trails.getTrails($scope.data)
//       .then(function(trails){
//         //console.log('trails', trails);
//         $scope.trails = trails
        
        
//       }).catch(function(err){
//         console.log(err);
//       })
//   };
