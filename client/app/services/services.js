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

  // For future use - please do not erase
  // var getTrailId = function (trailId) {
  //   trailId = trailId;
  //   console.log('service getrailId:', trailId)
  //   return trailId
  // };

  // var getTrail = function(trailId) {
  //   console.log("showTrails ID: ", trailId)
  //   return $http({
  //     method: 'GET',
  //     url: '/api/trails/trail',
  //     params: {unique_id: 3470}
  //   })
  //   .then(function(result) {
  //     console.log('showTrails service result: ', result.data); 
  //     showTrails.trail = result.data;
  //     return result.data;
  //   })
  // };



  return {
    getLocation: getLocation,
    getTrail: getTrail,
    setTrail: setTrail
  }
})

.factory('instagram', function($http) {

  var getInstagram = function() {
    console.log('getInstagram service works')
    var params = {lat: '30.182943', lon: '-97.725541'}
    return $http({
      method: 'GET',
      url: '/api/insta/geo',
      params: params
    })
    .then(function (result) {
      console.log('instagram raw: ', result.data);
      return result.data;
    })
    .catch(function (err) {
      console.error('instagram error: ', err);
    })
  }

  return {
    getInstagram: getInstagram
  }
})

.service('imageService',['$q','$http',function($q,$http){
        this.loadImages = function(){
            return $http.jsonp("https://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=JSON_CALLBACK");
        };
}])



