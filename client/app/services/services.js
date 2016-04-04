angular.module('trailApp.services', [])

.factory('showTopNav', function($location) {

  var navToggle = function() {
    console.log('working')
    var showTopNav = {};
    if ($location.$$path === '/home') {
      
      showTopNav.showTopNav = false;
      console.log('showTopNav:', showTopNav.showTopNav)
    } else {
      showTopNav.showTopNav = true;
      console.log('showNav:', showTopNav.showTopNav)
    }
    return showTopNav;
  };

  return {

    navToggle: navToggle
  }
})
.factory('showTrails', function($http) {
  // var items = {
  //   "city": "Chelan",
  //   "state": "washington"
    
  // };
  function extract(result) {
      console.log("extracted result: ", result);
      return result.data;
    }
  var postLocation = function(params) {
    console.log('postLocation: ', params)
    $http({
      method: 'GET', 
      url: '/api/alltrails',
      params: params
    })
    .then(extract)
    .catch(function(err) { console.log('postLocation error: ', err)})
  }

  return {
    postLocation: postLocation
  }

})
.service('imageService',['$q','$http',function($q,$http){
        this.loadImages = function(){
            return $http.jsonp("https://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=JSON_CALLBACK");
        };
}])

// factory:
// var getTrails = function(params){
//     return $http({
//       method: 'GET',
//       url: '/api/trails',
//       params: params
//     })
// .then(function(result){
// return result
// })




