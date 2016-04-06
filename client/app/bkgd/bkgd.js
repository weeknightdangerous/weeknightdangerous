angular.module('trailApp.bkgd', [])

.controller('bkgdCtrl', function ($scope,imageService,instagram,angularGridInstance) {
  var bkgd = this;

  //initial call to get the data, turned off during dev to avoid OAuthRateLimitException
  //bkgd.getInstagram();
   
   //old library demo example:
   imageService.loadImages().then(function(data){
        data.data.items.forEach(function(obj){
            var desc = obj.description,
                width = desc.match(/width="(.*?)"/)[1],
                height = desc.match(/height="(.*?)"/)[1];
            
            obj.actualHeight  = height;
            obj.actualWidth = width;
        });
       $scope.pics = data.data.items;
       
    });;

});

   //
   // Old library demo example: 
   //
   // imageService.loadImages().then(function(data){
   //      console.log('imageService:', data)
   //      data.data.items.forEach(function(obj){
   //          var desc = obj.description,
   //              width = desc.match(/width="(.*?)"/)[1],
   //              height = desc.match(/height="(.*?)"/)[1];
            
   //          obj.actualHeight  = height;
   //          obj.actualWidth = width;
   //      });
   //     $scope.pics = data.data.items;
       
   //  });;

.controller('bkgdCtrl', ['$scope','imageService', 'angularGridInstance', function ($scope,imageService,angularGridInstance) {
       imageService.loadImages().then(function(grams){
           $scope.pics = grams.data;           
        });;
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
