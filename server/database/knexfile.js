var path = require('path')
module.exports = {
	development: {
		client: 'postgresql',
		connection: {
			database : process.env.DATABASE_URL || 'dev',
      user: 'rotmbgwgdroduf',
      password: 'EDLnPqifIiYE_-RtdaD8LEbAfp',
      host: 'ec2-23-21-255-14.compute-1.amazonaws.com',
      port: 5432,
      ssl: true
		}
	}
}
