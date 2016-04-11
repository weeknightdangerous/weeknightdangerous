var path = require('path')
module.exports = {
	development: {
		client: 'postgresql',
		connection: {
			database : process.env.DATABASE_URL || 'dev',
		}
	}
}