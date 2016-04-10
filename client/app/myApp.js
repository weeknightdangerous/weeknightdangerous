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
  'uiGmapgoogle-maps',
  'ngAnimate'
  ])

// .config(function(uiGmapGoogleMapApiProvider) {
//     uiGmapGoogleMapApiProvider.configure({
//         //    key: 'your api key',
//         v: '3.20', //defaults to latest 3.X anyhow
//         libraries: 'weather,geometry,visualization'
//     });
// })

.config(['$stateProvider', '$urlRouterProvider', 'uiGmapGoogleMapApiProvider', function($stateProvider, $urlRouterProvider, $stateparams, uiGmapGoogleMapApiProvider) {
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

      uiGmapGoogleMapApiProvider.configure({
          
            key: 'AIzaSyD9-6X31CFcRUlO_lgt-v5Q184fcCpJd_E',
            v: '3.20', //defaults to latest 3.X anyhow
            libraries: 'weather,geometry,visualization'
    });
}])
