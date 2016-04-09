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
