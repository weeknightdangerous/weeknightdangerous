angular.module('trailApp.rating', [])
.controller('RatingCtrl', ['$scope', function ($scope) {
  $scope.rate = 3;
  $scope.max = 5;
  $scope.isReadonly = true;
  $scope.ratingStates = [
    {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'}
  ];
})
.directive('rating', function(){
  return {
    restric:'AEC'
    templateUrl: 'rating.html'
  };
});