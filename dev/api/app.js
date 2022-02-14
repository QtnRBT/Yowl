var createError = require('http-errors');
var express = require('express');
var path = require('path');

require("dotenv").config();

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Yowl API",
      description: "The documentation for our site's API.",
      contact: {
        name: "Quentin ROBERT",
        email: "qtn.rbrt@gmail.com"
      },
      version: process.env.API_VERSION
    },
    servers: ["http://localhost:3000"]
  },
  apis: ["./routes/*.js", "app.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

/**
 * @swagger
 * securityDefinitions:
 *   JWT Token:
 *     type: apiKey
 *     name: Authorization
 *     description: Put "Bearer token" in the input for it to work.
 *     in: header
 *   Password Token:
 *     type: apiKey
 *     name: Password Authorization
 *     description: Put "Bearer token" in the input for it to work.
 *     in: header
 */

const cors = require("cors");

global.con = require("./config/db.js");
con.connect((err) => {
  if (err) throw err;
  console.log("Connected!")
})

function handleDisconnect(client) {
  client.on('error', function (error) {
    if (!error.fatal) return;
    if (error.code !== 'PROTOCOL_CONNECTION_LOST') throw err;

    console.error('> Re-connecting lost MySQL connection: ' + error.stack);

    // NOTE: This assignment is to a variable from an outer scope; this is extremely important
    // If this said `client =` it wouldn't do what you want. The assignment here is implicitly changed
    // to `global.mysqlClient =` in node.
    mysqlClient = mysql.createConnection(client.config);
    handleDisconnect(mysqlClient);
    mysqlClient.connect();
  });
};

handleDisconnect(con);

var bodyParser = require('body-parser')

var fs = require("fs");

var app = express();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname, 'public')));

// Auto import routes
fs.readdirSync("./routes/").forEach(file => {
  file = file.slice(0, file.length - 3);
  let currentRoute = require("./routes/" + file);
  console.log("/" + file);
  app.use("/" + file, currentRoute);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({code: err.status, message: res.locals.message});
});

module.exports = app;