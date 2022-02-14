var express = require('express');
var app = express.Router();

const front_Url = require("../config.json").front_url;

const resetPasswordLink = front_Url + "/change-password?user=";

const nodemailer = require("nodemailer");

const jwt = require("jsonwebtoken");

// Reset password route

/**
 * @swagger
 * /reset-password:
 *   post:
 *     produces:
 *       - text/plain
 *     consumes:
 *       - application/json
 *     tags:
 *       - Authentication
 *     parameters:
 *       - in: body
 *         name: userInfo
 *         schema:
 *           type: object
 *           required:
 *             - email
 *           properties:
 *             email:
 *               type: string
 *               example: zinatiix@gmail.com
 *     responses:
 *       201:
 *         description: OK (sent mail)
 *       404:
 *         description: Not Found
 */
app.post("/", (req, res) => {
    let email = req.body.email;

    let sql = `SELECT * FROM users WHERE email="${email}"`;
    con.query(sql, (err, result, fields) => {
        if (err) return res.status(500).send(err);

        if (result.length == 0) return res.status(404).send({msg:"User not found"});

        let checkedUser = result[0];

        // Generate token
        let user = { email: email };
        let token = jwt.sign(user, process.env.MAIL_TOKEN_SECRET);

        // Insert token in database
        sql = `UPDATE users SET reset_password_token="${token}" WHERE id=${checkedUser.id}`;
        con.query(sql, (err, result, fields) => {
            if (err) return res.status(500).send(err);

            if (result) {
                //Send mail
                let transporter = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                        user: "yowl.epitech.2022@gmail.com",
                        pass: "Wy58^r8uD3+#%4_D4xg3SnuCC*=%jLkP"
                    }
                })

                let link = resetPasswordLink + token;

                const options = {
                    from: "yowl.epitech.2022@gmail.com",
                    to: email,
                    subject: "Yowl - password recovery",
                    html: `<body style="font-family: sans-serif; text-align: center; background-color: #eee">
                    <div style="background-color: #fff; border-radius: 3px; position: absolute;
                    top: 50%;
                    -ms-transform: translateY(-50%);
                    transform: translate(-50%,-50%); padding: 30px 0px; left: 50%;">
                      <img style="width: 10%;" src="https://cdn.quentinrobert.fr/yowl/Logo_Yowl.png" />
                        <h3 style="margin-top: 20px;">Hello</h3>
                      <p style="min-width: 400px; margin: 0 auto; margin-bottom: 20px;">
                      Somebody, hopefully you, has recently requested to change your password for your Yowl account.<br>
                      <br>
                      If you did not perform this request, you can simply ignore this email.<br>
                      <br>
                      Otherwise, click the button below to complete the process.
                      </p>
                  
                      <a href="${link}" style="background-color: #F6A433; color : #fff; padding: 10px 7px; text-decoration: none; border-radius: 0.375rem;">Reset password</a>
                    </div>
                      
                  </body>`
                }

                transporter.sendMail(options, (err, info) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send(err);
                        return;
                    }

                    console.log(info);
                    res.status(201).send({msg: "The mail was successfully sent (if you can't see it, it is probably in your spams)."});
                    return
                })
            }
        })

        return;
    });

    return;
})

module.exports = app;