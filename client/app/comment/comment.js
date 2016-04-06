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