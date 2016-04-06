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
