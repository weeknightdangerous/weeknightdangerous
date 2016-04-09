//
//this cleans out the trails json object a bit and removes data we aren't using
//
exports.cleanTrails = function(data, type){
  var items = [];
  //console.log(data)
  for (var i = 0; i < data.length; i++) {
    //console.log(data[i])
    var obj = {}
    var item = data[i];
    
    obj.name = item.name;
    obj.unique_id = item.unique_id;
    obj.directions = item.directions;
    obj.lat = item.lat;
    obj.lon = item.lon;
    obj.thumbnail = 'img/missing_image.jpg';
    for (var j = 0; j < item.activities.length; j++) {
      if(item.activities[j].activity_type_id == type){
        obj.url = item.activities[j].url;
        obj.description = item.activities[j].description;
        obj.length = item.activities[j].length;
        if(item.activities[j].thumbnail){
          obj.thumbnail = item.activities[j].thumbnail;
        }
        obj.rating = item.activities[j].rating;
      }
    }
    items.push(obj);
  }

  return items;
}
//
//this cleans out the instagram json object a bit and removes data we aren't using
//
exports.cleanGrams = function(feed){
  //console.log(feed);
  var grams = [];
  for (var i = 0; i < feed.data.length; i++) {
    var obj = {};
    var item = feed.data[i]

    obj.link = item.link;
    obj.image = {};
    obj.image.low_res = {
      "url":item.images.low_resolution.url,
      "width":item.images.low_resolution.width,
      "height":item.images.low_resolution.height
    };
    obj.image.high_res = {
      "url":item.images.standard_resolution.url,
      "width":item.images.standard_resolution.width,
      "height":item.images.standard_resolution.height
    };
    obj.user ={};
    obj.user.username = item.user.username;
    obj.user.profile_pic = item.user.profile_picture;
    grams.push(obj);
  }
  return grams;
}