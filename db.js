const Pool = require("pg").Pool;

const pool = new Pool({
    user: "mgjjxcsj",
    password: "uRqrrkmkPiJcvwoKeX3Qvfe2ZKNoebDw",
    host: "babar.db.elephantsql.com",
    port: 5432,
    database: "mgjjxcsj" 
});

module.exports = pool;