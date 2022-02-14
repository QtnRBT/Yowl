var express = require('express');
var app = express.Router();

const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const api_url = require("../config.json").api_url;

const MD5 = require("crypto-js/md5");
const { default: axios } = require('axios');

// Validate email regex
const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

// Get age function
function getAge(birthDateString) {
    console.log(birthDateString);
    var today = new Date();
    var birthDate = new Date(birthDateString);
    console.log(birthDate);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    console.log(age);
    return age;
}

/**
 * @swagger
 * /register:
 *   post:
 *     tags:
 *       - Authentication
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *       - text/plain
 *     parameters:
 *       - in: body
 *         name: user_info
 *         description: All the info about the user you're trying to register
 *         schema:
 *           type: object
 *           required:
 *             - username
 *             - email
 *             - password
 *             - birthdate
 *             - category_1
 *             - category_2
 *             - category_3
 *           properties:
 *             username:
 *               type: string
 *               example: QtnRBT
 *             email:
 *               type: string
 *               example: qtn.rbrt@gmail.com
 *             password:
 *               type: string
 *               example: mySuperSecretPassword
 *             birthdate:
 *               type: string
 *               description: Format yyyy/mm/dd
 *               example: 2003/04/23
 *             category_1:
 *               type: string
 *               example: sport
 *             category_2:
 *               type: string
 *               example: tech
 *             category_3:
 *               type: string
 *               example: food
 *     responses:
 *       200:
 *         description: All the user's info
 *       403:
 *         description: Forbidden
 *       400:
 *         description: Bad request
 *       409:
 *         description: Conflict
 */
app.post("/", (req, res) => {
    let body = req.body;

    // Check if body is complete
    if (body.username && body.email && body.password && body.birthdate && body.category_1 && body.category_2 && body.category_3) {

        // Check email
        if (validateEmail(body.email)) {

            // Check if > 13yo
            if (getAge(req.body.birthdate) > 13) {

                // Hashing password
                bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
                    let username = req.body.username;
                    let email = req.body.email;
                    let password = hash;
                    let birthdate = req.body.birthdate;
                    let category_1 = req.body.category_1;
                    let category_2 = req.body.category_2;
                    let category_3 = req.body.category_3;
                    let avatar_url = `https://secure.gravatar.com/avatar/${MD5(email).toString()}?d=https%3A%2F%2Fcdn.quentinrobert.fr%2Fyowl%2Ficons%2Fdefault-avatar2.png`;

                    let date = new Date().toISOString().slice(0, 19).replace('T', ' ');

                    let role = "user";

                    con.query(`INSERT INTO users (username, email, password, avatar_url, birthdate, category_1, category_2, category_3, role, accountCreation) VALUES ("${username}", "${email}", "${password}", "${avatar_url}", "${birthdate}", "${category_1}", "${category_2}", "${category_3}", "${role}", "${date}")`, async (err, result, fields) => {
                        if (err) {
                            if (err.code == "ER_DUP_ENTRY") {
                                res.status(409).send({msg:"User already exists."});
                                return;
                            }
                            res.status(500).send(err);
                            return;
                        }

                        if (result) {
                            axios.post(`${api_url}/login`, {
                                "identifier": username,
                                "password": body.password
                            }).then(response => {
                                console.log(response);
                                res.status(200).send(response.data);
                                return;
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).send(err);
                                return;
                            })
                        }
                    })

                });

            } else {
                res.status(403).send({msg: "You have to be aged 13 or more to use Yowl."});
                return;
            }

        } else {
            res.status(400).send({msg:"Please verify you entered a correct email."});
            return;
        }

    } else {
        res.status(400).send({msg:"Please verify your request includes a username, an email, a password, a birthdate, a category_1, a category_2 and a category_3"});
        return;
    }
})

module.exports = app;