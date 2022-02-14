var express = require('express');
var app = express.Router();

// Get users

/**
 * @swagger
 * /users:
 *   get:
 *     produces:
 *       - application/json
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: OK
 */
app.get('/', (req, res) => {
    let sql = `SELECT * FROM users`;
    con.query(sql, async (err, result, fields) => {
        if(err) return res.status(500).send(err);

        if(result) {

            let clean = result.map(user => {
                delete user.password;
                delete user.reset_password_token;
                return user;
            })

            return res.status(200).send(clean);
        }
    });
    return;
})

// Get user

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not Found
 */
app.get("/:id", (req, res) => {
    let sql = `SELECT * FROM users WHERE id=${req.params.id}`;
    con.query(sql, (err, result, fields) => {
        if(err) return res.status(500).send(err);

        if(result) {
            if(result.length == 0) return res.status(404).send({message: "User not found"});
            let user = result[0];
            delete user.password;
            delete user.reset_password_token;
            return res.status(200).send(user);
        }
    });
    return;
})

module.exports = app;