angular.module('trailApp.services', ['ngCookies'])

.factory('showTrails', function($http) {
  var showTrails = this;
  //showTrails.trail = {};
  showTrails.trailId = 0;
  showTrails.list = {};
  showTrails.location;

  var userLocation = function(params) {
    showTrails.location = params;
   // console.log('userLocation service: ', showTrails.location);

  }

  var getTrails = function() {
    // console.log('getLocation service location:', showTrails.location)
    return $http({
      method: 'GET', 
      url: '/api/trails/alltrails',
      params: showTrails.location
    })
    .then(function(result) {
      showTrails.list.data = result.data;
      showTrails.list.location = showTrails.location;
      // console.log("getLocation result: ", showTrails.list)
      return showTrails.list;
    })
    .catch(function(err) { console.log('postLocation error: ', err)})
  };

  var getTrailId = function (trailId) {
    showTrails.trailId = trailId;
    // console.log('showTrails.trailId:', showTrails.trailId)
  };


   //to make showTrail available to the trailProfile controller
  var getTrail = function () {
    return showTrails.trail;
  }

  //to store the trail info in showTrail from the trailslist controller
  var setTrail = function(trail) {
    showTrails.trail = trail;
    return showTrails.trail;
  }

  var getTrailList = function () {

  }

  return {
    userLocation: userLocation,
    getTrails: getTrails,
    getTrail: getTrail,
    getTrailId: getTrailId,
    setTrail: setTrail
  }
})


.factory('Auth', function($cookies) {
  var cookie;
  var isUser = false;

  var checkUser = function () {
    cookie = $cookies.get('trailrpark');
    
    if (cookie !== undefined) {
      isUser = true;
      cookie = JSON.parse(cookie);
    }

    return isUser;
  };

  var getUser = function () {
    if (cookie !== undefined) {
      return cookie.username;
   }
  };
  var getImage = function () {
    if (cookie !== undefined) {
      return cookie.image;
   }
  };

  var removeUser = function () {
    $cookies.remove("trailrpark");
    return isUser = false;

  }

  return {
    checkUser: checkUser,
    getUser: getUser,
    getImage: getImage,
    removeUser: removeUser
  };  
})

.factory('commentForm', function($http) {

  var postComments = function(comment, trailId) {
    // console.log('postComments is working', trailId, comment)
    return $http({
      method: 'POST',
      url: '/comment',
      data: {comment: comment, trailId: trailId},
      headers: {'Content-Type': 'application/json'}
    })
    .then(function (result) {
      // console.log('comment service:', result);
      return result;
    })
    .catch(function (err) {
      console.error('comments service Error: ', err);
    })    
  };

  var getComments = function(trailId) {
    // console.log('getComments trailId: ', trailId);
    return $http({
      method: 'POST',
      url: '/commentList',
      data: {trailId: trailId},
      headers: {'Content-Type': 'application/json'}
    })
    .then(function (result) {
      // console.log('get comment service:', result.data);
      return result.data;
    })
    .catch(function (err) {
      console.error('get comments service Error: ', err);
    })    
    
  }

  return {
    postComments: postComments,
    getComments: getComments
  } 

})

.factory('addFav', function($http, $state) {

  var postFav = function() {
   var trailId = $state.params.trailId;
    return $http({
      method: 'POST',
      url: '/addFav',
      data: {trailId: trailId},
      headers: {'Content-Type': 'application/json'}
    })
    .then(function (result) {
      console.log('addFav service result:', result);
      return result;
    })
    .catch(function (err) {
      console.error('addFav service Error:', err);
    })
  };

  var getFav = function() {
    console.log('services getFav is working')
    return $http({
      method: 'GET',
      url: '/myfavs',
      headers: {'Content-Type': 'application/json'}
    })
    .then(function (result) {
      console.log('getFav service result:', result);
      return result;
    })
    .catch(function (err) {
      console.error('getFav service error', err);
    })
  };

  return {
    postFav: postFav,
    getFav: getFav
  }

})

.factory('imageService',['$q','$http',function($q,$http){
  //this factory is used by multiple controllers!

  //a collection of random locations for the homepage bg display
  //moab
  //grand teton nat'l park
  //yosemite
  //big sur
  var randomGeos = [{
      "lat": 47.9691,
      "lon": -123.4983,
      "dist": 5000
    },
    {
      "lat": 43.7904,
      "lon": -110.6818,
      "dist": 5000
    },
    {
      "lat": 37.748543,
      "lon": -119.588576,
      "dist": 5000
    },
    {
      "lat": 36.3615,
      "lon": -121.8563,
      "dist": 5000
    }
  ];
  //pick a random location
  var homeLoc = randomGeos[Math.floor(Math.random()*randomGeos.length)];
  var images = {}
  var imageServices = {};
  //get home images
  imageServices.homeImages = function(){
    //console.log('fired home images')
      images = $http({
        method: 'GET', 
        url: '/api/insta/geo',
        params: homeLoc
      })
  };
  //get city/state images
  imageServices.locImages = function(placename){
    //console.log('fired locImages')
      images = $http({
        method: 'GET', 
        url: '/api/geo/loc',
        params: placename
      })
  };
  //get trail images
  imageServices.trailImages = function(geo){
    //console.log('fired home images')
      images = $http({
        method: 'GET', 
        url: '/api/insta/geo',
        params: geo
      })
  };
  imageServices.getImages = function(){
    //console.log('fired get images', images)
    return images;  
  }
  return imageServices;
}])

.directive('starRating', function () {
    return {
        restrict: 'A',
        template: '<ul class="rating">' +
            '<li ng-repeat="star in stars" ng-class="star">' +
            '\u2605' +
            '</li>' +
            '</ul>',
        scope: {
            ratingValue: '=',
            max: '='
        },
        link: function (scope, elem, attrs) {
            scope.stars = [];
            for (var i = 0; i < scope.max; i++) {
                scope.stars.push({
                    filled: i < scope.ratingValue
                });
            }
        }
    }
});



