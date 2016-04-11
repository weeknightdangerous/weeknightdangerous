angular.module('trailApp', [
  'ui.bootstrap',
  'trailApp.services',
  'trailApp.directives',
  'trailApp.intro',
  'trailApp.topNav',
  'trailApp.bkgd',
  'trailApp.profile',
  'trailApp.myFav',
  'trailApp.comment',
  'trailApp.trailsList',
  'ngCookies',
  'ui.router',
  'ngAnimate',
  'ngMap'
  ])

// .config(function(uiGmapGoogleMapApiProvider) {
//     uiGmapGoogleMapApiProvider.configure({
//         //    key: 'your api key',
//         v: '3.20', //defaults to latest 3.X anyhow
//         libraries: 'weather,geometry,visualization'
//     });
// })

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
      .state("trailsList", {
        url: '/trailsList',
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

angular.module('trailApp.services', ['ngCookies'])

.factory('showTrails', function($http) {
  var showTrails = this;
  //showTrails.trail = {};
  showTrails.trailId = 0;
  showTrails.list = {};
  showTrails.location;

  var userLocation = function(params) {
    showTrails.location = params;
    console.log('userLocation service: ', showTrails.location);

  }

  var getTrails = function() {
    console.log('getLocation service location:', showTrails.location)
    return $http({
      method: 'GET', 
      url: '/api/trails/alltrails',
      params: showTrails.location
    })
    .then(function(result) {
      showTrails.list.data = result.data;
      showTrails.list.location = showTrails.location;
      console.log("getLocation result: ", showTrails.list)
      return showTrails.list;
    })
    .catch(function(err) { console.log('postLocation error: ', err)})
  };

  var getTrailId = function (trailId) {
    showTrails.trailId = trailId;
    console.log('showTrails.trailId:', showTrails.trailId)
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

  var getComments = function(trailId) {
    console.log('getComments trailId: ', trailId);
    return $http({
      method: 'POST',
      url: '/commentList',
      data: {trailId: trailId},
      headers: {'Content-Type': 'application/json'}
    })
    .then(function (result) {
      console.log('get comment service:', result.data);
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




angular.module('trailApp.intro', [])

.controller('introCtrl', function($window, showTrails, imageService) {
  // run the images service so the background can load
  imageService.homeImages();

  var intro = this;
  var location = intro.location;

  intro.sendLocation = function(location) {
    console.log('intro sendLocation: ', location)
    showTrails.userLocation(location);
    $window.location.href = '/#/trailsList'
  }
  intro.showlist = false;
  intro.data = [];

  //to get all the trails based on user's selected city and state (collected in the location object that's passed in)
  intro.getList = function(location) {
    
    //console.log('showlist is working: ', location)
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
  // intro.getTrail = function(trail) {
  //   //console.log('trail Info:',trail)
  //   var trailGeo = {
  //     "lat": trail.lat,
  //     "lon": trail.lon,
  //     "dist": '1000'
  //   };
  //   //console.log('geo loc for trail:', trailGeo);
  //   imageService.trailImages(trailGeo);
    
  //   // call the service function that will store the trail in showTrails service.
  //   showTrails.setTrail(trail);
  //   var id = trail.unique_id;
  //   //redirect to /trail and pass in the trail's unique_id as parameter
  //   $state.go('trail', { trailId: id});
    
  // }
  

});

var trailsApp = angular.module('trailApp.topNav', [])

.controller('topNav', function($window, Auth) {
	var nav = this;
  nav.user,
  nav.image;
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

  nav.getUser = function () {
    nav.user = Auth.getUser();
    nav.image = Auth.getImage();
  }

  //initialize user information
  nav.getUser();

})

angular.module('trailApp.bkgd', [])

.controller('bkgdCtrl', ['$scope','imageService', function ($scope,imageService) {
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
        //console.log('here is our data:',$scope.pics);
      });
    }
  });
}]);

angular.module('trailApp.profile', ['ui.bootstrap'])


.controller('profileCtrl', function( $uibModal,showTrails, addFav, imageService, $scope, $state, NgMap) {
  //our map
  NgMap.getMap().then(function(map) {
    console.log(map.getCenter());
    console.log('markers', map.markers);
    console.log('shapes', map.shapes);
  });
  
  var profile = this;
  
  profile.data = {};
  profile.slides= {};
  profile.loading = true;
  profile.myFavAdd = true;
  profile.showModal = false;

  //click image, show modal
  profile.open = function (slide) {
    profile.selected = slide
    $uibModal.open({
      template: '<my-modal modal="modal">' +
        '<div class="modal-body">' + 
          '<img class="img-responsive" src="{{ viewer.slide.image.high_res.url }}">' +
          '<a class="user-link" target="blank" href="{{viewer.slide.link}}">' +
            '<img class="img-circle profile gram-user" src="{{viewer.slide.user.profile_pic}}">' +
          '</a>' +
        '</div>' +
      '</my-modal>',
      controller: 'ModalInstanceCtrl as viewer',
      resolve: {
        items: function(){
          console.log(profile.selected)
          return profile.selected;
        }
      }
    })
  };

  profile.rating;

  $scope.ratings = [{
        current: profile.rating,
        max: 5
  }];

    //get trail info from the stored value in showTrails service by using showTrails.getTrail(); 
    profile.getTrail = function() {
      profile.data = showTrails.getTrail();
      profile.rating = profile.data.rating;
     };

    profile.addFav = function() {
      return addFav.postFav()
        .then(function (result) {
          console.log('addFavClient result:', result);
          profile.myFavAdd = false;
        })
        .catch(function (err) {
          console.error('addFavClient error:', err);
        })
    };

    profile.addMap = function() {
      
    } ;

    
    //initialize the trail data
    profile.getTrail();


  //grab our images
  imageService.getImages()
  .then(function(data){
    profile.slides = data;
    profile.loading = false;
  });

})
.controller('ModalInstanceCtrl', function ($uibModalInstance, items) {

    var viewer = this;

    //I want to get the vehicle data pass to populate the form myModalContent.html
    viewer.slide = items;
})

angular.module('trailApp.comment', [])

  .controller('commentsCtrl', function(Auth, commentForm, $stateParams, $state) {
    var comments = this;
    comments.user = false;
    comments.data = [];
    comments.username;
    var trailId = $state.params.trailId;

    comments.isUser = function() {
      comments.user = Auth.checkUser();
      comments.username= Auth.getUser();
  
      console.log('comments.user:', comments.user);
      
    }

    comments.getComments = function() {
      console.log('stateParams', $stateParams);
      console.log('state.params',$state.params);
      return commentForm.getComments(trailId)
        .then(function (result) {
          console.log('getComments result client:', result)
          return comments.data = result;
        })
        .catch(function (err) {
          console.error('get comments client:', err);
        })
    }

    comments.update = function(comment, isValid) {
      // console.log('isValid', isValid)
      if (isValid) {
        return commentForm.postComments(comment,trailId)
          .then(function (result) {
            console.log('post comments client result:', result);
            comments.getComments();  
            comments.text = '';
          })
          .catch(function (err) {
            console.error('post comments client Error:', err);
          })
      }
    };
    //initialize user status: if user is signed in when this page is rendered
    comments.isUser();
    comments.getComments();

  });
angular.module('trailApp.trailsList', [])

.controller('TrailsListCtrl', function (showTrails, imageService, $state, $scope) {
	var trails = this;

	trails.data = [];
  trails.city;
  trails.state;
  trails.noTrials= false;

  $scope.ratings = [{
        current: 0,
        max: 5
  }];

  //to get all the trails based on user's selected city and state (collected in the location object that's passed in)
  trails.getList = function() {
    trails.loader=true;
   
      return showTrails.getTrails()
      .then(function (result) {
        console.log('trailsList ctrl result:', result.data)

        if (result.data.length === 0) {
          trails.noTrials = true;
        }
        trails.data = result.data;
        var location = result.location;
        trails.loader=false;
        //make sure the trailList header will have capitalized city and state regardless of user input.
        trails.city = capitalize(location.city);
        trails.state = capitalize(location.state);
        //get placename for bg

        var placename = {placename: trails.city + ',' + trails.state};
        imageService.locImages(placename);
        //end placename for bg


      })
      .catch(function(err) {
        console.log('getLocation err: ', err);
      })
  };

  //to get the trail information from the one user clicks on through ng-click and send to the showTrails service
  trails.getTrail = function(trail) {
    // call the service function that will store the trail in showTrails service.
    var trailGeo = {
      "lat": trail.lat,
      "lon": trail.lon,
      "dist": '1000'
    };
    //console.log('geo loc for trail:', trailGeo);
    imageService.trailImages(trailGeo);

    showTrails.setTrail(trail);
    var id = trail.unique_id;
    //redirect to /trail and pass in the trail's unique_id as parameter
    $state.go('trail', { trailId: id});

  }

  //helper function to make sure the city and state inputed by the user are capitalized
  function capitalize (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  trails.getList()

});

var trailsApp = angular.module('trailApp.myFav', [])

.controller('myFavCtrl', function(addFav, showTrails, $state, $scope, imageService) {
  var myFav = this;
  myFav.data;

  $scope.ratings = [{
        current: 0,
        max: 5
  }];

  myFav.getFavList = function() {
    console.log('myFave.getFavList is working')
    myFav.loader=true;
    // var data = showTrails.getTrail();
    // console.log('data', data);

    addFav.getFav()
      .then(function(result) {
        console.log('getFavList client result:', result.data);
        myFav.loader=false;
        myFav.data = result.data;
        console.log('myFav.data:', myFav.data)
      })
      .catch(function(err) {
        console.error('getFavList client error:', err);
      })
  };

  //to get the trail information from the one user clicks on through ng-click and send to the showTrails service
  myFav.getTrail = function(trail) {
    // call the service function that will store the trail in showTrails service.
    console.log('myFav.getTrail trail:', trail)
    showTrails.setTrail(trail);
    var id = trail.unique_id;
    //redirect to /trail and pass in the trail's unique_id as parameter
    $state.go('trail', { trailId: id});

    
  }

  //initialize user's favorite trails list
  myFav.getFavList();

  imageService.getImages()
  .then(function(data){
    $scope.pics = data;
  });
   
})

angular.module('trailApp.directives', [])
.directive('gramModal', function () {
    
});