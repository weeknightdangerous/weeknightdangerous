angular.module('trailApp.profile', ['ui.bootstrap'])


.controller('profileCtrl', function( $uibModal,showTrails, addFav, imageService, $scope, $state) {
   
  var profile = this;
  
  profile.data = {};
  profile.slides= {};
  profile.loading = true;
  profile.myFavAdd = true;
  profile.showModal = false;

  //click image, show modal
  profile.open = function (slide) {
    profile.selected = slide
    $uibModal.open({
      template: '<my-modal modal="modal">' +
        '<div class="modal-body">' + 
          '<img class="img-responsive" src="{{ viewer.slide.image.high_res.url }}">' +
          '<a class="user-link" target="blank" href="{{viewer.slide.link}}">' +
            '<img class="img-circle profile gram-user" src="{{viewer.slide.user.profile_pic}}">' +
          '</a>' +
        '</div>' +
      '</my-modal>',
      controller: 'ModalInstanceCtrl as viewer',
      resolve: {
        items: function(){
          console.log(profile.selected)
          return profile.selected;
        }
      }

  profile.toggleModal = function(){
      profile.showModal = !profile.showModal;
      console.log('toggled');
  };
  profile.rating;

  $scope.ratings = [{
        current: profile.rating,
        max: 5
  }];

    //get trail info from the stored value in showTrails service by using showTrails.getTrail(); 
    profile.getTrail = function() {
      profile.data = showTrails.getTrail();
      profile.rating = profile.data.rating;
     };

    profile.addFav = function() {
      return addFav.postFav()
        .then(function (result) {
          console.log('addFavClient result:', result);
          profile.myFavAdd = false;
        })
        .catch(function (err) {
          console.error('addFavClient error:', err);
        })
    };

    profile.addMap = function() {
      
    } ;

    
    //initialize the trail data
    profile.getTrail();

    //grab our images
    imageService.getImages()
    .then(function(data){
      profile.slides = data;
      profile.loading = false;
    });
  };

})

.controller('ModalInstanceCtrl', function ($uibModalInstance, items) {

    var viewer = this;

    //I want to get the vehicle data pass to populate the form myModalContent.html
    viewer.slide = items;
})

