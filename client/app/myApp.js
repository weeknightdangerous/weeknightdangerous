angular.module('trailApp', [
  'trailApp.nav',
  'trailApp.services',
  'trailsListApp',
  'trailApp.topNav',
  'trailApp.profile',
  'trailApp.comment',
  'ui.router'
  ])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');
  $stateProvider
     .state("home", {
        url: '/home',
        views: {

              'nav': { 
                templateUrl: 'app/nav/nav.html',
                controller: 'navigation' 
              }
        }
     })
      .state("results", {
        url: '/results',
        views: {

              'topNav': { 
                templateUrl: 'app/topNav/topNav.html',
                controller: 'topNav' 
              },

              'trailList': { 
                templateUrl: 'app/trailsList/trailsListApp.html',
                controller: 'test' 
              }
        }
      })
      .state("profile", {
        url: '/profile',
        views: {

              'topNav': { 
                templateUrl: 'app/topNav/topNav.html',
                controller: 'topNav' 
              },
              'profile': {
                templateUrl: 'app/trailProfile/trailProfile.html',
                controller: 'profileCtrl'
              },
              'comment': {
                templateUrl: 'app/comment/comment.html',
                controller: 'commentsCtrl'
              }
        }

      })
}])

// .run(function ($rootScope, $location) {
//   // here inside the run phase of angular, our services and controllers
//   // have just been registered and our app is ready
//   // however, we want to make sure the user is authorized
//   // we listen for when angular is trying to change routes
//   // when it does change routes, we then look for the token in localstorage
//   // and send that token to the server to see if it is a real user or hasn't expired
//   // if it's not valid, we then redirect back to signin/signup
//   $rootScope.$on('$routeChangeStart', function (evt, next, current) {
//     
//   })
//   });
