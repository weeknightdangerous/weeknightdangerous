angular.module('trailApp.trailsList', [])
.controller('TrailsListCtrl', function ($scope, $http) {
	$scope.data = [
	 {"name": "Schultz Creek",
	             "url": "http://www.singletracks.com/item.php?c=1&i=791",
	             "description": "Great trail, once  you get there. I bit off just a bit too much for my self . 25 miles to be exact. It's a network of trails to get there but once you do the actual Shultz<br />trail is about 6-8 miles of smooth downhill, with great views of the mountains.<br />",
	             "rating": 4.75
	 },
	 {"name": "Little Bear",
	         "url": "http://www.tripleblaze.com/trail.php?c=3&i=2247",
	         "description": "Little Bear features 4 miles of hiking trails near Flagstaff, AZ.",
	         "rating": 3.00
	 },
	 {"name": "Deer Hill Trail #99",
	             "url": "http://www.singletracks.com/item.php?c=1&i=2922",
	             "description": "If you are looking for a gentle trail that meanders between semi-dense forest and wide open country then this one is for you. In addition, you will enjoy spectacular views of the San Francisco Peaks worthy of bringing along your camera: especially during the fall season when the aspen trees on the mountain side explode into a glow of brilliant gold.<br /><br />If you\\'re lucky you may also get a chance to take a snapshot of the abundant wildlife that roam this area. Mule deer and elk are often seen foraging along the trail corridor, especially during the early morning and early evening hours. Also, keep you ears open for Abert squirrels and Steller\\'s jays that often compete to see who can be the loudest, and don\\'t be alarmed to hear the early morning yelps of coyotes as they bid one another good morning.<br /><br />This trail, which is relatively flat, travels north from Little Elden Springs Horse Camp towards Sunset Crater. It was constructed primarily to accommodate equestrians that visit the campground, but by no means does that restrict hikers and mountain bikers from using the trail. In fact, don\\'t be surprised if you see more hikers and mountain bikers on the trail than horses.",
	             "rating": 2.50
	 }
	];	
});
