angular.module('trailApp.services', ['ngCookies'])

.factory('showTrails', function($http) {
  var showTrails = this;
  //showTrails.trail = {};
  showTrails.trailId = 0;
  showTrails.list = {}

  var getLocation = function(params) {
    return $http({
      method: 'GET', 
      url: '/api/trails/alltrails',
      params: params
    })
    .then(function(result) {
      console.log("getLocation result: ", result.data)
      showTrails.list = result.data;
      return result.data;
    })
    .catch(function(err) { console.log('postLocation error: ', err)})
  };

  var getTrailId = function (trailId) {
    showTrails.trailId = trailId;
    console.log('showTrails.trailId:', showTrails.trailId)
  };

  // var getTrail = function(trailId) {
  //   return $http({
  //     method: 'GET',
  //     url: '/api/trails/trail',
  //     params: trailId
  //   })
  //   .then(function(result) {
  //     console.log('getTrail result: ', result.data); 
  //     showTrails.trail = result.data;
  //     console.log("showTrails.trail", showTrails.trail)
  //     return result.data;
  //   })
  //};

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
    getLocation: getLocation,
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
    console.log('service cookie: ', cookie)
    if (cookie !== undefined) {
      isUser = true;
    }
    console.log('checkUser service: ', isUser);
    return isUser;
  };

  var removeUser = function () {
    $cookies.remove("trailrpark");
    return isUser = false;

  }

  return {
    checkUser: checkUser,
    removeUser: removeUser
  };  
})

.factory('commentForm', function($http, $state) {
  var trailId = $state.params.trailId;

  var postComments = function(comment) {
    console.log('postComments is working', trailId, comment)
    return $http({
      method: 'POST',
      url: '/comment',
      data: {comment: comment, trailId: trailId},
      headers: {'Content-Type': 'application/json'}
    })
    .then(function (result) {
      console.log('comment service:', result);
      return result;
    })
    .catch(function (err) {
      console.error('comments service Error: ', err);
    })    
  };

  var getComments = function() {
    console.log('getComments trailId: ', trailId);
    return $http({
      method: 'GET',
      url: '/commentList',
      data: {trailId: trailId},
      headers: {'Content-Type': 'application/json'}
    })
    .then(function (result) {
      console.log('get comment service:', result);
      return result;
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
    //console.log('fired home images')
      images = $http({
        method: 'GET', 
        url: '/api/insta/geo',
        params: homeLoc
      })
  };
  imageServices.locImages = function(placename){
    //console.log('fired locImages')
      images = $http({
        method: 'GET', 
        url: '/api/geo/loc',
        params: placename
      })
  };
  imageServices.trailImages = function(geo){
    //console.log('fired home images')
      images = $http({
        method: 'GET', 
        url: '/api/insta/loc',
        params: geo
      })
  };
  imageServices.getImages = function(){
    //console.log('fired get images', images)
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


