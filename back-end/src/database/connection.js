require("dotenv").config();

const environment = process.env.ENVIRONMENT;
const configuration = require('../../knexfile')[environment];
const connection = require('knex')(configuration);  

module.exports = connection;
