angular.module('trailApp.bkgd', [])

.controller('bkgdCtrl', ['$scope','imageService', function ($scope,imageService) {
  $scope.pics = {};
    
  //get our initianl images
  imageService.getImages()
  .then(function(data){
    $scope.pics = data;
  });

  //then watch the images for changes
  $scope.$watch(function(){
    return imageService.getImages(); // This returns a promise
  }, function(images, oldImages){
    if(images !== oldImages){ // According to your implementation, your images promise changes reference
      images.then(function(data){
        $scope.pics = data;
        console.log('here is our data:',$scope.pics);
      });
    }
  });
}]);
