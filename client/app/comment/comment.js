angular.module('trailApp.comments', [])
    .controller('commentsCtrl', ['$scope', function($scope) {
      $scope.master = {};

      $scope.update = function(user) {
        
      };

      $scope.reset = function() {
        $scope.user = angular.copy($scope.master);
      };

      $scope.reset();
    }]);