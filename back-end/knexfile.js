require("dotenv").config();

module.exports = {

  development: {
    client: 'pg',
      connection: {
          host: '127.0.0.1',
          user: process.env.BD_USER,
          password: process.env.BD_PW,
          database: process.env.BD_DATABASE,
      },
      migrations: {
          directory:'./src/database/migrations',
      },
  },

  production: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      database: process.env.BD_DATABASE,
      user:     process.env.BD_USER,
      password: process.env.BD_PW
    },
    migrations: {
      directory:'./src/database/migrations'
    }
  }

};