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

.factory('comments', function () {
  return $http({
    method: 'POST',
    url: '/api'

  })
})

.service('imageService',['$q','$http',function($q,$http){
  var randomGeo = [
                    {
                      "lat": 38.58201,
                      "lon": -109.41633
                    },
                    {
                    "lat": 37.453605,
                    "lon": -113.225719
                    },
                    {
                    "lat": 37.748543,
                    "lon": -119.588576
                    }
                ];



        this.loadImages = function(){
            return $http({
              method: 'GET', 
              url: '/api/insta/geo',
              params: {"lat":'37.748543',"lon":'-119.588576'}
            })
        };
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


