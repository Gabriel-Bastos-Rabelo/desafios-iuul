const Sequelize = require("sequelize");
const dbConfig = require("../database/index.js");

module.exports = new Sequelize('consultorio', 'postgres', '123', {
    host: 'localhost',
    dialect: 'postgres'
});
