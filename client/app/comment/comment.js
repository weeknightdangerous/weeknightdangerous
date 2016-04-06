angular.module('trailApp.comment', [])

    .controller('commentsCtrl', function($scope) {
      console.log('comment controller is working')
      $scope.comments = {
        user: "testUser",
        text: "Hello world"
      };

      $scope.update = function() {
        console.log('scope.comment:', $scope.comments.user)
      };

    });