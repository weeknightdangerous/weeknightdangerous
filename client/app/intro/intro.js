angular.module('trailApp.intro', [])

.controller('introCtrl', function($location, $window, $state, showTrails) {
  var intro = this;

  intro.showlist = false;
  intro.data = [];

  intro.getList = function(location) {
    console.log('showlist is working: ', location)
    //if(isValid) { 
      intro.city = capitalize(location.city);
      intro.state = capitalize(location.state);

      return showTrails.getLocation(location)
      .then(function (result) {
        intro.showList = true;
        intro.data = result;

      })
      .catch(function(err) {
        console.log('getLocation err: ', err);
      })
    //}
  };

  intro.getTrail = function(trailId) {
    console.log('trailId: ', trailId);

    $state.go('trail', { trailId: trailId });

    
  }

  //helper function to make sure the city and state inputed by the user are capitalized
  function capitalize (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

});
