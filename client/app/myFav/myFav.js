var trailsApp = angular.module('trailApp.myFav', [])

.controller('myFavCtrl', function(addFav, showTrails) {
  var myFav = this;

  myFav.getFavList = function() {
    console.log('myFave.getFavList is working')
    var data = showTrails.getTrail();
    console.log('data', data);

    return addFav.getFav()
      .then(function(result) {
        console.log('getFavList client result:', result);
        myFav.data = result;
      })
      .catch(function(err) {
        console.error('getFavList client error:', err);
      })
  }

  //to get the trail information from the one user clicks on through ng-click and send to the showTrails service
  myFav.getTrail = function(trail) {
    // call the service function that will store the trail in showTrails service.
    showTrails.setTrail(trail);
    var id = trail.unique_id;
    //redirect to /trail and pass in the trail's unique_id as parameter
    $state.go('trail', { trailId: id});

    
  }

  //initialize user's favorite trails list
  myFav.getFavList();
   
})
