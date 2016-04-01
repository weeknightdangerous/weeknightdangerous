
exports.cleanTrails = function(data){
  var items = [];

  for (var i = 0; i < data.length; i++) {
    var obj = {}
    var item = resp.data[i];
    obj.name = item.name;
    obj.unique_id = item.unique_id;
    obj.directions = item.directions;
    obj.lat = item.lat;
    obj.lon = item.lon;
    for (var j = 0; j < item.activities.length; j++) {
      if(item.activities[j].activity_type_id == params.type){
        obj.url = item.activities[j].url;
        obj.description = item.activities[j].description;
        obj.length = item.activities[j].length;
        obj.thumbnail = item.activities[j].thumbnail;
        obj.rating = item.activities[j].rating;
      }
    }
    items.push(obj);
  }
  //console.log('newArray',items)
  return items;
}