angular.module('trailApp', [
  'trailApp.intro',
  'trailApp.services',
  'trailApp.topNav',
  'angularGrid',
  'trailApp.bkgd',
  'trailApp.profile',
  'trailApp.comment',
  //'trailApp.trailsList',
  'ui.router',
  'angular-storage',
  'ngAnimate'
  ])
.config(['$stateProvider', '$urlRouterProvider', 'angular-storage', function($stateProvider, $storeProvider, $urlRouterProvider, $stateparams) {
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
                controller: 'bkgdCtrl',
                controllerAs: 'bkgd' 
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

  $storeProvider
    .setStore('cookieStorage');    
}])

.controller('authCtrl', function (store) {

  var myObj = {
    name: 'mgonto'
  };
  store.set('obj', myObj);
  var myNewObject = store.get('obj');
  angular.equals(myNewObject, myObj);
})

angular.module('app', ['angular-storage'])
  .config(function(storeProvider) {
    // Store defaults to localStorage but we can set sessionStorage or cookieStorage.
    storeProvider.setStore('sessionStorage');
  })
  .controller('Controller', function(store) {

  var myObj = {
    name: 'mgonto'
  };

  // This will be saved in sessionStorage as obj
  store.set('obj', myObj);

  // This will look for obj in sessionStorage
  var myNewObject = store.get('obj');
  console.log('OAuth new object:', myNewObject)

  angular.equals(myNewObject, myObj); // return true
});

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




angular.module('trailApp.intro', [])

.controller('introCtrl', function($location, $state, showTrails) {
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

      return 
      showTrails.getLocation(location)
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

.controller('bkgdCtrl', function ($scope,imageService,instagram,angularGridInstance) {
  var bkgd = this;

  //initial call to get the data, turned off during dev to avoid OAuthRateLimitException
  //bkgd.getInstagram();
   
   //old library demo example:
   imageService.loadImages().then(function(data){
        data.data.items.forEach(function(obj){
            var desc = obj.description,
                width = desc.match(/width="(.*?)"/)[1],
                height = desc.match(/height="(.*?)"/)[1];
            
            obj.actualHeight  = height;
            obj.actualWidth = width;
        });
       $scope.pics = data.data.items;
       
    });;

});

   //
   // Old library demo example: 
   //
   // imageService.loadImages().then(function(data){
   //      console.log('imageService:', data)
   //      data.data.items.forEach(function(obj){
   //          var desc = obj.description,
   //              width = desc.match(/width="(.*?)"/)[1],
   //              height = desc.match(/height="(.*?)"/)[1];
            
   //          obj.actualHeight  = height;
   //          obj.actualWidth = width;
   //      });
   //     $scope.pics = data.data.items;
       
   //  });;
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

    .controller('commentsCtrl', function($scope, comments) {
      console.log('comment controller is working')
      $scope.comments = {
        user: "testUser",
        text: "Hello world"
      };

      $scope.update = function() {
        console.log('scope.comment:', $scope.comments.user)
      };

    });