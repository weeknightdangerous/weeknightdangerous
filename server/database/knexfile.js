var path = require('path');
var config = require('../config')

//direct connection from local postgres to heroku
//heroku pg:push dev DATABASE_URL --app trailrpark

module.exports = {
	development: {
		client: 'postgresql',
		connection: {
			database : 'dev'
		}
	},
  production: {
    client: 'postgresql',
    connection: {
      database : config.DB.DATABASE,
      user: config.DB.USER,
      password: config.DB.PASSWORD,
      host: config.DB.HOST,
      port: config.DB.PORT,
      ssl: true
    }
  }
}

