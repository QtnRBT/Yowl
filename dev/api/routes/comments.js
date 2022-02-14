var express = require('express');
var app = express.Router();

const api_url = require("../config.json").api_url;

const jwt = require("jsonwebtoken");
const axios = require("axios");

const verifyIdentity = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.status(400).send({ msg: "Please provide a token" });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(401).send({ msg: "This token is not valid." });

        req.user = user;
        next();
    })
}

function haveIReacted(commentId, userId, typeOfReaction) {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM ${typeOfReaction} WHERE comment=${commentId} AND user=${userId}`;
        con.query(sql, (err, result, fields) => {
            if (err) return reject(err);
            if (result.length == 0) return resolve(false);

            return resolve(true);
        });
    })
}

function getCommentsUpvotes(commentId) {
    return new Promise((resolve, reject) => {
        let sql = `SELECT id FROM \`comment-upvotes\` WHERE comment=${commentId}`;
        con.query(sql, (err, result, fields) => {
            if (err) return reject(err);
            resolve(result.length);
        })
    })
}

function getCommentsDownvotes(commentId) {
    return new Promise((resolve, reject) => {
        let sql = `SELECT id FROM \`comment-downvotes\` WHERE comment=${commentId}`;
        con.query(sql, (err, result, fields) => {
            if (err) return reject(err);
            resolve(result.length);
        })
    })
}

/**
 * @swagger
 * /comments/{id}:
 *   post:
 *     tags: 
 *       - Comments
 *     description: Adds a comment to a post
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     security:
 *       - JWT Token: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *       - in: body
 *         name: commentInfo
 *         schema:
 *           type: object
 *           properties:
 *             opinion:
 *               type: string
 *     responses:
 *       200:
 *         description: The post with the new comment inside
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not found
 */
app.post("/:id", verifyIdentity, (req, res) => {
    let post_id = req.params.id;
    axios.get(`${api_url}/posts/${post_id}`)
        .then(response => {
            let post = response.data;

            let user = req.user.id;
            let aupinard = req.body.opinion;

            let comment = {
                post: post_id,
                user: user,
                opinion: aupinard
            }

            post.comments.push(comment);

            let sql = `INSERT INTO comments (post, user, opinion) VALUES (${post_id}, ${user}, "${aupinard}")`;
            con.query(sql, (err, result, fields) => {
                if (err) return res.status(500).send(err);

                if (result) {
                    return res.status(201).send(post);
                }
            });
            return;
        })
        .catch(err => {
            console.log(err);
            if (err.response.status == 404) {
                return res.status(404).send({ msg: "Not found" });
            }
        })
    return;
})

app.get(`/upvoted/:id`, verifyIdentity, (req, res) => {
    let sql = `SELECT * FROM \`comment-upvotes\` WHERE comment=${req.params.id} AND user=${req.user.id}`
    con.query(sql, (err, result, fields) => {
        if (err) return res.status(500).send(err);
        if (result.length == 0) return res.status(200).send(false);
        return res.status(200).send(true);
    });
})

app.get(`/downvoted/:id`, verifyIdentity, (req, res) => {
    let sql = `SELECT * FROM \`comment-downvotes\` WHERE comment=${req.params.id} AND user=${req.user.id}`
    con.query(sql, (err, result, fields) => {
        if (err) return res.status(500).send(err);
        if (result.length == 0) return res.status(200).send(false);
        return res.status(200).send(true);
    });
})

/**
 * @swagger
 * /comments/{id}:
 *   get:
 *     tags:
 *       - Comments
 *     description: Gets comment's info by its id
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: All the comments's info
 *       404:
 *         description: Not found
 */
app.get("/:id", (req, res) => {
    let sql = `SELECT * FROM comments WHERE comments.id=${req.params.id}`;
    con.query(sql, async (err, result, fields) => {
        if (err) return res.status(500).send(err);
        if (result) {
            if (result.length == 0) return res.status(404).send({ msg: "Not found" });

            let comment = result[0];

            comment.upvotes = await getCommentsUpvotes(req.params.id);
            comment.downvotes = await getCommentsDownvotes(req.params.id);

            return res.status(200).send(result[0]);
        }
    })

    return;
})

/**
 * @swagger
 * /comments/p/{id}:
 *   get:
 *     tags:
 *       - Comments
 *     description: Gets all the comments from a post
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: All the comments
 *       404:
 *         description: Not found
 */
app.get("/p/:id", (req, res) => {
    let sql = `SELECT * FROM comments WHERE post=${req.params.id}`;

    con.query(sql, async (err, result, fields) => {
        if (err) return res.status(500).send(err);

        if (result) {

            let newComments = result.map(async comment => {
                let upvotes = await getCommentsUpvotes(comment.id);
                let downvotes = await getCommentsDownvotes(comment.id);

                comment.upvotes = upvotes;
                comment.downvotes = downvotes;
                return comment;
            });


            let comments = await Promise.all(newComments);
            return res.status(200).send(comments);
        }
    });
    return
});

app.post("/upvote/:id", verifyIdentity, async (req, res) => {
    try {

        let reacted = await haveIReacted(req.params.id, req.user.id, "`comment-upvotes`");

        // If no upvote, add, and remove downvote if there is
        if (!reacted) {
            let sql = `INSERT INTO \`comment-upvotes\` (user, comment) VALUES (${req.user.id}, ${req.params.id})`;

            con.query(sql, async (err, result, fields) => {
                if (err) return res.status(500).send(err);

                sql = `SET foreign_key_checks = 0; DELETE FROM \`comment-downvotes\` WHERE comment=${req.params.id} AND user=${req.user.id}; SET foreign_key_checks = 1`;
                con.query(sql, (err, result, fields) => {
                    if (err) return res.status(500).send(err);
                })

                let response = await axios.get(`${api_url}/comments/${req.params.id}`);
                let comment = response.data;
                return res.status(200).send({ downvote: false, upvote: true });
            });
            return;
        }

        // If upvote, remove
        let sql = `SET foreign_key_checks = 0; DELETE FROM \`comment-upvotes\` WHERE comment=${req.params.id} AND user=${req.user.id}; SET foreign_key_checks = 1`;

        con.query(sql, async (err, result, fields) => {
            if (err) return res.status(500).send(err);

            let response = await axios.get(`${api_url}/comments/${req.params.id}`);
            let comment = response.data;
            return res.status(200).send({ downvote: false, upvote: false });
        })

    } catch (error) {

        if (error.response && error.response.status == 404) return res.status(404).send({ msg: "Comment not found" });
        if (error.response) return res.status(error.response.status).send(error.response);

        return res.status(500).send(error);

    }
})

app.post("/downvote/:id", verifyIdentity, async (req, res) => {
    try {

        let response = await axios.get(`${api_url}/comments/${req.params.id}`);

        let reacted = await haveIReacted(req.params.id, req.user.id, "`comment-downvotes`");

        // If no upvote, add, and remove downvote if there is
        if (!reacted) {
            let sql = `INSERT INTO \`comment-downvotes\` (user, comment) VALUES (${req.user.id}, ${req.params.id})`;

            con.query(sql, async (err, result, fields) => {
                if (err) return res.status(500).send(err);

                sql = `SET foreign_key_checks = 0; DELETE FROM \`comment-upvotes\` WHERE comment=${req.params.id} AND user=${req.user.id}; SET foreign_key_checks = 1`;
                con.query(sql, (err, result, fields) => {
                    if (err) return res.status(500).send(err);
                })

                let response = await axios.get(`${api_url}/comments/${req.params.id}`);
                let comment = response.data;
                return res.status(200).send({ downvote: true, upvote: false });
            });
            return;
        }

        // If upvote, remove
        let sql = `SET foreign_key_checks = 0; DELETE FROM \`comment-downvotes\` WHERE comment=${req.params.id} AND user=${req.user.id}; SET foreign_key_checks = 1`;

        con.query(sql, async (err, result, fields) => {
            if (err) return res.status(500).send(err);

            let response = await axios.get(`${api_url}/comments/${req.params.id}`);
            let comment = response.data;
            return res.status(200).send({ downvote: false, upvote: false });
        })

    } catch (error) {

        if (error.response && error.response.status == 404) return res.status(404).send({ msg: "Comment not found" });
        if (error.response) return res.status(error.response.status).send(error.response);

        return res.status(500).send(error);

    }
})

module.exports = app;