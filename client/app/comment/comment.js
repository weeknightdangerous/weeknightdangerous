angular.module('trailApp.comment', [])

    .controller('commentsCtrl', function($scope) {
      console.log('comment controller is working')
      $scope.comments = {};

      $scope.update = function() {
        
      };

    });