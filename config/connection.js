// Require the sequelize library
const Sequelize = require("sequelize");
// allow the file to .env file which contains the credentials
require('dotenv').config();
// creates the variable for sequelize
let sequelize;
// this will use the port of JAWSDB_URL, which is the extension on Heroku
if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
    // If it is on a local machine, it will use a localhost with port 3306
} else {
    sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
        host: '127.0.0.1',
        dialect: 'mysql',
        port: 3306
    })
}

module.exports = sequelize;