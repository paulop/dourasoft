// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'mini_sis',
      user: 'postgres',
      password: '' //senha 
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: `${__dirname}/src/database/migrations`
    }
  },

};
