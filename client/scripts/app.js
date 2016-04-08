angular.module('trailApp', [
  'trailApp.intro',
  'trailApp.services',
  'trailApp.topNav',
  'angularGrid',
  'trailApp.bkgd',
  'trailApp.profile',
  'trailApp.myFav',
  'trailApp.comment',
  'trailApp.trailsList',
  'ngCookies',
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
                controller: 'commentsCtrl',
                controllerAs: 'comments'
              }
        }

      })
      .state("myFav", {
        url:'/myFav',
        views: {

              'trail': {
                templateUrl: 'app/myFav/myFav.html',
                controller: 'myFavCtrl',
                controllerAs: 'myFav'
              },
              'bkgd': { 
                templateUrl: 'app/bkgd/bkgd.html',
                controller: 'bkgdCtrl' 
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



angular.module('trailApp.intro', [])

.controller('introCtrl', function($scope, $location, $state, showTrails, imageService) {
  // run the images service so the background can load
  imageService.homeImages();

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

.controller('topNav', function($window, Auth) {
	var nav = this;
  nav.signInToggle = Auth.checkUser();; 

  nav.signIn = function () {
    $window.location.assign('/authorize_user');
  };

  nav.myFav = function () {
    $window.location.href = '/#/myFav';
  }

  nav.signOut = function () {
    Auth.removeUser();
    console.log('Auth.cookie', Auth.cookie)
    nav.signInToggle = !nav.signInToggle;
    $window.location.href = '/';
  }
})

angular.module('trailApp.bkgd', [])

.controller('bkgdCtrl', ['$scope','imageService', 'angularGridInstance', function ($scope,imageService, angularGridInstance) {
  $scope.pics = {};
    
  //get our initianl images
  imageService.getImages()
  .then(function(data){
    $scope.pics = data;
  });

  //then watch the images for changes
  $scope.$watch(function(){
    return imageService.getImages(); // This returns a promise
  }, function(images, oldImages){
    if(images !== oldImages){ // According to your implementation, your images promise changes reference
      images.then(function(data){
        $scope.pics = data;
        console.log('here is our data:',$scope.pics);
      });
    }
  });
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

.controller('profileCtrl', function(showTrails, addFav, $scope) {
  var profile = this;
  profile.data = {};

    //get trail info from the stored value in showTrails service by using showTrails.getTrail(); 
    profile.getTrail = function() {
      profile.data = showTrails.getTrail();
     };

    profile.addFav = function() {
      return addFav.postFav()
        .then(function (result) {
          console.log('addFavClient result:', result);
        })
        .catch(function (err) {
          console.error('addFavClient error:', err);
        })

    } 
    
    //initialize the trail data
    profile.getTrail();
})

angular.module('trailApp.comment', [])

  .controller('commentsCtrl', function(Auth, commentForm, $location) {
    var comments = this;
    comments.user = false;
    comments.data = [];

    comments.isUser = function() {
      comments.user = Auth.checkUser();
      console.log('comments.user:', comments.user);
      
    }

    comments.getComments = function() {
      return commentForm.getComments()
        .then(function (result) {
          console.log('get comments client: ', result);
          return comments.data = result;
        })
        .catch(function (err) {
          console.error('get comments client:', err);
        })
    }

    comments.update = function(comment) {

      return commentForm.postComments(comment)
        .then(function (result) {
          console.log('post comments client result:', result);
          comments.getComments();  
        })
        .catch(function (err) {
          console.error('post comments client Error:', err);
        })
    
    };
    //initialize user status: if user is signed in when this page is rendered
    comments.isUser();
    comments.getComments();

  });
angular.module('trailApp.trailsList', [])

.controller('TrailsListCtrl', function (showTrails) {
	var trails = this;
	trails.data = showTrails.trails;
	console.log(trails.data);



});

var trailsApp = angular.module('trailApp.myFav', [])

.controller('myFavCtrl', function(addFav, showTrails) {
  var myFav = this;

  myFav.getFavList = function() {
    console.log('myFave.getFavList is working')
    var data = showTrails.getTrail();
    console.log('data', data);

    return addFav.getFav()
      .then(function(result) {
        console.log('getFavList client result:', result);
        myFav.data = result;
      })
      .catch(function(err) {
        console.error('getFavList client error:', err);
      })
  }

  //to get the trail information from the one user clicks on through ng-click and send to the showTrails service
  myFav.getTrail = function(trail) {
    // call the service function that will store the trail in showTrails service.
    showTrails.setTrail(trail);
    var id = trail.unique_id;
    //redirect to /trail and pass in the trail's unique_id as parameter
    $state.go('trail', { trailId: id});

    
  }

  //initialize user's favorite trails list
  myFav.getFavList();
   
})
