angular.module('trailApp.profile', [])


.controller('profileCtrl', function( showTrails, addFav, imageService, $scope, $state, uiGmapGoogleMapApi) {
   
  var profile = this;
  
  profile.data = {};
  profile.slides= {};
  profile.loading = true;
  profile.showModal = false;
  profile.toggleModal = function(){
      profile.showModal = !profile.showModal;
      console.log('toggled');
  };

    //get trail info from the stored value in showTrails service by using showTrails.getTrail(); 
    profile.getTrail = function() {
      profile.data = showTrails.getTrail();
     };

    profile.addFav = function() {
      return addFav.postFav()
        .then(function (result) {
          console.log('addFavClient result:', result);
        })
        .catch(function (err) {
          console.error('addFavClient error:', err);
        })
    };

    profile.addMap = function() {
      return initMap();
    } ;

    function initMap() {
     

      uiGmapGoogleMapApi.then(function(maps) {
        $scope.map = {
          center: {
                  latitude: 56.162939,
                  longitude: 10.203921
          },
          zoom: 8
      };
      });
    }
    
    //initialize the trail data
    profile.getTrail();
    profile.addMap();

    //grab our images
    imageService.getImages()
    .then(function(data){
      profile.slides = data;
      profile.loading = false;
    });

})
