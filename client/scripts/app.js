angular.module('trailApp', [
  'trailApp.intro',
  'trailApp.services',
  'trailApp.topNav',
  'angularGrid',
  'trailApp.bkgd',
  'trailApp.profile',
  'trailApp.comment',
  'trailApp.trailsList',
  'ui.router',
  'ngAnimate'
  ])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider, $stateparams) {
  $urlRouterProvider.otherwise('/home');
  $stateProvider
     .state("home", {
        url: '/home',
        views: {

              'intro': { 
                templateUrl: 'app/intro/intro.html',
                controller: 'introCtrl',
                controllerAs: 'intro' 
              },
              'bkgd': { 
                templateUrl: 'app/bkgd/bkgd.html',
                controller: 'bkgdCtrl' 
              }
        }
     })
      .state("results", {
        url: '/results',
        views: {
      
              'trailsList': {
                templateUrl: 'app/trailsList/trailsList.html',
                controller: 'TrailsListCtrl',
                controllerAs: 'trails'
              },
              'bkgd': { 
                templateUrl: 'app/bkgd/bkgd.html',
                controller: 'bkgdCtrl' 
              }
        }
      })
      .state("trail", {
        url:'/trail/:trailId',
        views: {

              'trail': {
                templateUrl: 'app/trailProfile/trailProfile.html',
                controller: 'profileCtrl',
                controllerAs: 'profile'
              },
              'comment': {
                templateUrl: 'app/comment/comment.html',
                controller: 'commentsCtrl'
              }
        }

      })
}])

// For future use - please do not erase
// .factory('AttachTokens', function ($window) {
//   // this is an $httpInterceptor
//   // its job is to stop all out going request
//   // then look in local storage and find the user's token
//   // then add it to the header so the server can validate the request
//   var attach = {
//     request: function (object) {
//       var jwt = $window.localStorage.getItem('com.shortly');
//       if (jwt) {
//         object.headers['x-access-token'] = jwt;
//       }
//       object.headers['Allow-Control-Allow-Origin'] = '*';
//       return object;
//     }
//   };
//   return attach;
// })

// .run(function ($rootScope, $location, Auth) {
//   // we listen for when angular is trying to change routes
//   // when it does change routes, we then look for the token in localstorage
//   // and send that token to the server to see if it is a real user or hasn't expired
//   // if it's not valid, we then redirect back to signin/signup
//   $rootScope.$on('$routeChangeStart', function (evt, next, current) {
//     if (next.$$route && next.$$route.authenticate && !Auth.isAuth()) {
//       $location.path('/signin');
//     }
//   });
// });

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

.service('imageService',['$q','$http',function($q,$http){
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

  this.homeImages = function(){
      return $http({
        method: 'GET', 
        url: '/api/insta/geo',
        params: homeLoc
      })
  };
  this.locImages = function(placename){
      console.log('service called', placename)
      return $http({
        method: 'GET', 
        url: '/api/geo/loc',
        params: placename
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



angular.module('trailApp.intro', [])

.controller('introCtrl', function($scope, $location, $state, showTrails, imageService) {
  var intro = this;

  intro.showlist = false;
  intro.data = [];

  //to get all the trails based on user's selected city and state (collected in the location object that's passed in)
  intro.getList = function(location) {
    console.log('showlist is working: ', location)
    //if(isValid) { 
      //make sure the trailList header will have capitalized city and state regardless of user input.
      intro.city = capitalize(location.city);
      intro.state = capitalize(location.state);
      //get placename for bg

      var placename = {placename: intro.city + ',' + intro.state};
      imageService.locImages(placename);
      //end placename for bg

      return showTrails.getLocation(location)
      .then(function (result) {
        //show list and hide intro form
        intro.showList = true;
        intro.data = result;

      })
      .catch(function(err) {
        console.log('getLocation err: ', err);
      })
    //}
  };

  //to get the trail information from the one user clicks on through ng-click and send to the showTrails service
  intro.getTrail = function(trail) {
    // call the service function that will store the trail in showTrails service.
    showTrails.setTrail(trail);
    var id = trail.unique_id;
    //redirect to /trail and pass in the trail's unique_id as parameter
    $state.go('trail', { trailId: id});

    
  }

  //helper function to make sure the city and state inputed by the user are capitalized
  function capitalize (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

});

var trailsApp = angular.module('trailApp.topNav', [])

.controller('topNav', function($window) {
	var nav = this;
  nav.signIn = function() {
    $window.location.assign('/authorize_user');
  };
})

angular.module('trailApp.bkgd', [])

.controller('bkgdCtrl', ['$scope','imageService', 'angularGridInstance', function ($scope,imageService, angularGridInstance) {
  var getHomeImages = function(){
    imageService.homeImages().then(function(grams){
      $scope.pics = grams.data;           
    });
  }
  getHomeImages();
  var getResultImages = function(placename){
    imageService.locImages(placename).then(function(grams){
      $scope.pics = grams.data;           
    });
  }
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
var trailsApp = angular.module('trailApp.profile', [])

.controller('profileCtrl', function(showTrails) {
  var profile = this;
  profile.data = {};

    //get trail info from the stored value in showTrails service by using showTrails.getTrail(); 
    profile.getTrail = function() {
      profile.data = showTrails.getTrail();
     }

    profile.getTrail();

})

angular.module('trailApp.comment', [])

    .controller('commentsCtrl', function($scope) {
      console.log('comment controller is working')
      $scope.comments = {
        user: "testUser",
        text: "Hello world"
      };

      $scope.update = function() {
        console.log('scope.comment:', $scope.comments.user)
      };

    });
angular.module('trailApp.trailsList', [])

.controller('TrailsListCtrl', function (showTrails) {
	var trails = this;
	trails.data = showTrails.trails;
	console.log(trails.data);



});
