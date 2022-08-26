// Update with your config settings.
require('dotenv').config("/.env");

module.exports = {

  database: {
    client: 'mysql',
    connection: {
      host : process.env.DBHOST || '127.0.0.1',
      user : process.env.DBUSER || 'root',
      password : process.env.DBPASS || '',
      database : process.env.DBNAME || ''
    }
  }

};
