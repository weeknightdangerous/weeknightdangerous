angular.module('trailApp.services', [])

.factory('showTrails', function($http) {
  //container to store the selected trail
  var showTrail = {};
 
  //http get request to get all the trails that satisfy the params passed in from user input(city, state)
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

  //to make showTrail available to the trailProfile controller
  var getTrail = function () {
    return showTrail;
  }

  //to store the trail info in showTrail from the trailslist controller
  var setTrail = function(trail) {
    showTrail = trail;
    return showTrail;
  }

  return {
    getLocation: getLocation,
    getTrail: getTrail,
    setTrail: setTrail
  }
})

.factory('comments', function () {
  return $http({
    method: 'POST',
    url: '/api'

  })
})

.service('imageService',['$q','$http',function($q,$http){
        this.loadImages = function(){
            return $http.jsonp("https://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=JSON_CALLBACK");
        };
}])



