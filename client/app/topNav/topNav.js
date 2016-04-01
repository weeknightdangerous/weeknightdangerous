var trailsApp = angular.module('trailApp.topNav', [])

.controller('topNav', function($scope, showTopNav) {
	$scope.showTopNav = showTopNav.navToggle();
	console.log('topNav', $scope.showTopNav)
})
