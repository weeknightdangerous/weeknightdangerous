var trailsApp = angular.module('trailApp.myFav', [])

.controller('myFavCtrl', function(addFav) {
  var myFav = this;

  myFav.getFavList = function() {
    return addFav.getFav()
      .then(function(result) {
        console.log('getFavList client result:', result);
        myFav.data = result;
      })
      .catch(function(err) {
        console.error('getFavList client error:', err);
      })
  }

  //initialize user's favorite trails list
  myFav.getFavList();
   
})
