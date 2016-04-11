var config = {};

config.INSTA = {};
config.TRAILS = {};
config.GEO = {};

//Instagram Auth sandbox key
//Retrieve these from: https://www.instagram.com/developer/
config.INSTA.CLIENT_ID = "";
config.INSTA.CLIENT_SECRET ="";
config.REDIRECT_URL ="";

// The following id is not ours and should by no means be used on a public app!
// Currently clientID works for instagram api calls, but this functionality maybe removed
// 
config.INSTA.PIRATE_ID = 'b59fbe4563944b6c88cced13495c0f49';

//Helper geocode key
//Retrieve from https://geocoder.opencagedata.com/
config.GEO.KEY = '';

//Trails api key
//Retriev from https://market.mashape.com/trailapi/trailapi
config.TRAILS.API_KEY = "";


//Production Database Setup
config.DB = {};
config.DB.DATABASE = '';
config.DB.USER = '';
config.DB.PASSWORD = '';
config.DB.HOST = '';
config.DB.PORT = ;


module.exports = config;