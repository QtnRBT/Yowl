let mysql = require("mysql2");

let con = mysql.createConnection({
  host: "soemHost",
  database: "yowl",
  user: "someUser",
  password: "somePassword",
  port: "3306",
  multipleStatements: true
});

module.exports = con;
