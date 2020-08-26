const {Pool} = require('pg')
require('dotenv').config()

//conexão com o banco (pool)
const pool = new Pool({
    user: process.env.USER_DATABASE,
    host: process.env.HOST, //localhost
    database: process.env.DATABASE, //api
    password: process.env.PASSOWRD, //sua senha 
    port: process.env.PORT //5432
})

//verificando se a conexão foi bem sucedida
pool.connect((err) => { if(err) throw err.stack })

module.exports = pool