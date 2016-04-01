var config = require("./knexfile.js");
var env = 'development';
var knex = require('knex')(config[env])

module.exports = knex;

knex.schema.hasTable('users').then(function(exists){
	if (!exists) {
    knex.schema.createTable('users', function(table){
      table.increments('uid').primary();
      table.string('username', 255)
    }).then(function(){
      console.log("Created users table")
    })
  }
});

knex.schema.hasTable('favs').then(function(exists){
  if (!exists) {
    knex.schema.createTable('favs', function(table){
      table.increments('id').primary();
      table.integer('user_id')
        .references('uid')
        .inTable('users');
    }).then(function(){
      console.log("Created favs table")
    })
  }
});

knex.schema.hasTable('sessions').then(function(exists){
  if (!exists) {
    knex.schema.createTable('sessions', function(table){
      table.increments('id').primary();
      table.integer('user_id')
        .references('uid')
        .inTable('users');
      table.string('access_token', 255);
      table.string('session_id', 255);
    }).then(function(){
      console.log("Created sessions table")
    })
  }
});