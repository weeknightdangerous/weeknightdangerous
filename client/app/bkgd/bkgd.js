angular.module('trailApp.bkgd', [])

.controller('bkgdCtrl', ['$scope','imageService', 'angularGridInstance', function ($scope,imageService, angularGridInstance) {
  var getHomeImages = function(){
    imageService.homeImages().then(function(grams){
      $scope.pics = grams.data;           
    });
  }
  getHomeImages();
  var getResultImages = function(placename){
    imageService.locImages(placename).then(function(grams){
      $scope.pics = grams.data;           
    });
  }
}]);

    // $scope.pics = {};
    // $scope.displayGrams = function(){
    //     //console.log('here are the grams');
    //     showImages.getImages()
    //     .then(function(pics){
    //         console.log('here are the grams',pics);
    //         $scope.pics = pics;
    //     })
    // }
    // $scope.displayGrams();