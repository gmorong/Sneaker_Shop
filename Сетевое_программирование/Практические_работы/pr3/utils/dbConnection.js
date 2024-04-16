const mysql = require("mysql2");
const dbConnection = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "12_yashin",
});
module.exports = dbConnection.promise();
