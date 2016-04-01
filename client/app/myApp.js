angular.module('trailApp', [
  'trailApp.trailsList',
  'ui.router'
  ])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');
  $stateProvider
     .state("home", {
      url: '/home',
      views: {
            'nav': { 
              templateUrl: 'app/nav/nav.html'
              // controller: 'StartGameController' 
            },
            'trailsList': {
              templateUrl: 'app/trailsList/trailsList.html',
              controller: 'TrailsListCtrl'
            }

      }

  })
}])

