let mysql = require("mysql2");

let con = mysql.createConnection({
  host: "82.66.92.204",
  database: "yowl",
  user: "code",
  password: "@7y97R$x#BZh_f6V5E=3G@Ap!vV9a8Z-",
  port: "3306",
  multipleStatements: true
});

module.exports = con;