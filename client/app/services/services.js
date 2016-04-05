angular.module('trailApp.services', [])

.factory('showTrails', function($http) {
  var showTrails = this;
  showTrails.trail = {};
  var trailId;

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
    trailId = trailId;
    console.log('service getrailId:', trailId)
    return trailId
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
    getTrailId: getTrailId,
    trailId: trailId
  }
})

.service('imageService',['$q','$http',function($q,$http){
        this.loadImages = function(){
            return $http.jsonp("https://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=JSON_CALLBACK");
        };
}])



