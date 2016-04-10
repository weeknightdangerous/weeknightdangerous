var starApp = angular.module('trailApp.rating', [])

.controller('StarCtrl', ['$scope', function ($scope) {
    $scope.ratings = [{
    current: 3,
    max: 5
    }];
}]);

/*directive for star, u2605 in template is unicode for star*/
.directive('starRating', function () {
    return {
        restrict: 'A',
        template: '<ul class="rating">' +
            '<li ng-repeat="star in stars" ng-class="star">' +
            '\u2605' +
            '</li>' +
            '</ul>',
        scope: {
            ratingValue: '=',
            max: '='
        },
        link: function (scope, elem, attrs) {
            scope.stars = [];
            for (var i = 0; i < scope.max; i++) {
                scope.stars.push({
                    filled: i < scope.ratingValue
                });
            }
        }
    }
});

