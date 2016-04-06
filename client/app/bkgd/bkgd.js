angular.module('trailApp.bkgd', [])

.controller('bkgdCtrl', function ($scope,imageService,instagram,angularGridInstance) {
  var bkgd = this;

  bkgd.getInstagram = function () {
    console.log('working?')

    instagram.getInstagram()
    .then(function (result) {
      bkgd.pics = result.map(function(item) {
        return item.image.low_res.url;
      })
      console.log('controller result:', bkgd.pics);
    })
    .catch(function (err) {
      console.log('controller error:', err);
    })
  };       

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