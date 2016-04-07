angular.module('trailApp.services', [])

.factory('showTrails', function($http) {
  var showTrails = this;
  showTrails.trail = {};
  showTrails.trailId = 0;

  var getLocation = function(params) {
    return $http({
      method: 'GET', 
      url: '/api/trails/alltrails',
      params: params
    })
    .then(function(result) {
      console.log("getLocation result: ", result.data)
      return result.data;
    })
    .catch(function(err) { console.log('postLocation error: ', err)})
  };

  var getTrailId = function (trailId) {
    showTrails.trailId = trailId;
    console.log('showTrails.trailId:', showTrails.trailId)
  };

  var getTrail = function(trailId) {
    return $http({
      method: 'GET',
      url: '/api/trails/trail',
      params: trailId
    })
    .then(function(result) {
      console.log('getTrail result: ', result.data); 
      showTrails.trail = result.data;
      console.log("showTrails.trail", showTrails.trail)
      return result.data;
    })
  };



  return {
    getLocation: getLocation,
    getTrail: getTrail,
    getTrailId: getTrailId
  }
})

.factory('imageService',['$q','$http',function($q,$http){
  //moab
  //grand teton nat'l park
  //yosemite
  //big sur
  var randomGeos = [{
                      "lat": 47.9691,
                      "lon": -123.4983
                    },
                    {
                      "lat": 43.7904,
                      "lon": -110.6818
                    },
                    {
                      "lat": 37.748543,
                      "lon": -119.588576
                    },
                    {
                      "lat": 36.3615,
                      "lon": -121.8563
                    }];
  var homeLoc = randomGeos[Math.floor(Math.random()*randomGeos.length)];
  var images = {}
  var imageServices = {};
  imageServices.homeImages = function(){
    console.log('fired home images')
      images = $http({
        method: 'GET', 
        url: '/api/insta/geo',
        params: homeLoc
      })
  };
  imageServices.locImages = function(placename){
    console.log('fired locImages')
      images = $http({
        method: 'GET', 
        url: '/api/geo/loc',
        params: placename
      })
  };
  imageServices.getImages = function(){
    console.log('fired get images', images)
    return images;  
  }
  return imageServices;
}]);




// .factory('showImages', function($http){
//   var getImages = function(){
//     return $http({
//       method: 'GET', 
//       url: '/api/insta/geo',
//       params: {"lat":'38.5733',"lon":'-109.5498'}
//     }).then(function(result){
//       return result;
//       console.log(result);
//     })
//   }
//   return {
//     getImages: getImages
//   }
// })


