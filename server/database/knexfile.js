var path = require('path')

//direct connection from local postgres to heroku
//heroku pg:push dev DATABASE_URL --app trailrpark

module.exports = {
	development: {
		client: 'postgresql',
		connection: {
			database : 'decfjf795ca6f2',
      user: 'rotmbgwgdroduf',
      password: 'EDLnPqifIiYE_-RtdaD8LEbAfp',
      host: 'ec2-23-21-255-14.compute-1.amazonaws.com',
      port: 5432,
      ssl: true
		}
	}
}

