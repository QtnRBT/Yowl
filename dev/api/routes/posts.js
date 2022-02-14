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

function getNumber(postId, whatToGet) {
    return new Promise((resolve, reject) => {
        let sql = `SELECT id FROM ${whatToGet} WHERE post=${postId}`;
        con.query(sql, (err, result, fields) => {
            if (err) return reject(err);
            resolve(result.length);
        })
    })
}

function getComments(postId) {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM comments WHERE post=${postId}`;
        con.query(sql, (err, result, fields) => {
            if (err) return reject(err);
            resolve(result);
        })
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
 * /posts:
 *   post:
 *     tags: 
 *       - Posts
 *     description: Adds a post
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *       - text/plain
 *     security:
 *       - JWT Token: []
 *     parameters:
 *       - in: body
 *         name: postInfo
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *             opinion:
 *               type: string
 *             category:
 *               type: string
 *             source_url:
 *               type: string
 *     responses:
 *       200:
 *         description: The newly created post
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
// Make a post
app.post("/", verifyIdentity, async (req, res) => {
    let body = req.body;

    if (body.title && body.opinion && body.category && body.source_url) {

        // Variables
        let user_id = req.user.id;
        let title = req.body.title;
        let opinion = req.body.opinion;
        let category = req.body.category;
        let source = req.body.source_url;


        let date = new Date().toISOString().slice(0, 19).replace('T', ' ');

        try {
            let response = await axios.get(`https://api.quentinrobert.fr/metas?url=${source}`);


            let imageLink = response.data.imageLink;
            let site = response.data.site;

            let sql = `INSERT INTO posts (user, title, opinion, category, source, imageLink, site, publishDate) VALUES (${user_id}, "${title}", "${opinion}", "${category}", "${source}", "${imageLink}", "${site}", "${date}")`;

            // Create post
            con.query(sql, (err, result, fields) => {
                if (err) {
                    return res.status(500).send(err);
                }

                if (result) {
                    let post = { id: result.insertId, user_id, title, opinion, category, source, imageLink, site };
                    return res.status(200).send(post);
                }
            });
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }


    } else {
        return res.status(400).send({ msg: "Please make sure your request includes a title, an opinion, a category and a source" });
    }
});

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     tags:
 *       - Posts
 *     description: Gets post's info by its id
 *     produces:
 *       - application/json
 *       - text/plain
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: All the post's info
 *       404:
 *         description: Not found
 */
// Get a specific post from id
app.get("/:id", (req, res) => {
    let sql = `SELECT * FROM posts WHERE id=${req.params.id}`;

    con.query(sql, async (err, result, fields) => {
        if (err) {
            return res.status(500).send(err);
        }

        if (result) {
            if (result.length == 0) return res.status(404).send({ msg: "Post not found" });
            let post = result[0];

            // Getting more info about post
            let likes = await getNumber(post.id, "likes");
            let upVotes = await getNumber(post.id, "upvotes");
            let downVotes = await getNumber(post.id, "downvotes");
            let comments = await getComments(post.id);

            // Adding these info to the post
            post.likes = likes;
            post.upVotes = upVotes;
            post.downVotes = downVotes;

            // Getting likes for all comments
            let commentsPromise = comments.map(async comment => {
                let upvotes = await getCommentsUpvotes(comment.id);
                let downvotes = await getCommentsDownvotes(comment.id);

                comment.upvotes = upvotes;
                comment.downvotes = downvotes;
                return comment;
            });

            // Setting all comments
            post.comments = await Promise.all(commentsPromise);

            return res.status(200).send(post);
        }
    })
});

/**
 * @swagger
 * /posts/cat/{categoryName}:
 *   get:
 *     tags:
 *       - Posts
 *     description: Gets posts from a category
 *     produces:
 *       - application/json
 *       - text/plain
 *     parameters:
 *       - in: path
 *         name: category
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: All the post's info
 *       404:
 *         description: Not found
 */
// Get a specific post from id
app.get("/cat/:category", (req, res) => {
    let sql = `SELECT * FROM posts WHERE category="${req.params.category}"`;

    con.query(sql, async (err, result, fields) => {
        if (err) {
            return res.status(500).send(err);
        }

        if (result) {
            if (result.length == 0) return res.status(404).send({ msg: "Post not found" });

            let posts = result.map(async post => {
                // For every post : get likes, upvotes, downvotes, comments and appends it to the object
                let likes = await getNumber(post.id, "likes");
                let upVotes = await getNumber(post.id, "upvotes");
                let downVotes = await getNumber(post.id, "downvotes");
                let comments = await getComments(post.id);

                let commentsPromise = comments.map(async comment => {
                    let upvotes = await getCommentsUpvotes(comment.id);
                    let downvotes = await getCommentsDownvotes(comment.id);

                    comment.upvotes = upvotes;
                    comment.downvotes = downvotes;
                    return comment;
                });

                post.likes = likes;
                post.upVotes = upVotes;
                post.downVotes = downVotes;
                post.comments = await Promise.all(commentsPromise);
                return post;
            })


            let changedPosts = await Promise.all(posts);
            return res.status(200).send(changedPosts);
        }
    })
})

/**
 * @swagger
 * /posts/p/posted/{id}:
 *   get:
 *     tags:
 *       - Posts (reactions)
 *     description: Gets posts posted by a specific user
 *     produces:
 *       - application/json
 *       - text/plain
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: All the post's info
 *       404:
 *         description: Not found
 */
// Get a specific post from id
app.get(`/p/posted/:id`, (req, res) => {
    let sql = `SELECT * FROM posts WHERE user=${req.params.id}`;
    con.query(sql, async (err, result, fields) => {
        if (err) return res.status(500).send(err);

        if (result) {

            let posts = result.map(async post => {
                // For every post : get likes, upvotes, downvotes, comments and appends it to the object
                let likes = await getNumber(post.id, "likes");
                let upVotes = await getNumber(post.id, "upvotes");
                let downVotes = await getNumber(post.id, "downvotes");
                let comments = await getComments(post.id);

                let commentsPromise = comments.map(async comment => {
                    let upvotes = await getCommentsUpvotes(comment.id);
                    let downvotes = await getCommentsDownvotes(comment.id);

                    comment.upvotes = upvotes;
                    comment.downvotes = downvotes;
                    return comment;
                });

                post.likes = likes;
                post.upVotes = upVotes;
                post.downVotes = downVotes;
                post.comments = await Promise.all(commentsPromise);
                return post;
            })


            let changedPosts = await Promise.all(posts);
            return res.status(200).send(changedPosts);

        }
    })
})


/**
 * @swagger
 * /posts/p/saved/:
 *   get:
 *     security:
 *       - JWT Token: []
 *     tags:
 *       - Posts (reactions)
 *     description: Gets posts saved by a specific user
 *     produces:
 *       - application/json
 *       - text/plain
 *     responses:
 *       200:
 *         description: All the post's info
 *       404:
 *         description: Not found
 */
// Get a specific post from id
app.get(`/p/saved`, verifyIdentity, (req, res) => {
    let sql = `SELECT posts.*, \`saved-posts\`.post FROM posts LEFT JOIN \`saved-posts\` ON posts.id=\`saved-posts\`.post WHERE \`saved-posts\`.user=${req.user.id}`
    con.query(sql, (err, result, fields) => {
        if (err) return res.status(500).send(err);
        if (result) return res.status(200).send(result);
    });
})

/**
 * @swagger
 * /posts/p/upvoted/{id}:
 *   get:
 *     tags:
 *       - Posts (reactions)
 *     description: Gets posts upvoted by a specific user
 *     produces:
 *       - application/json
 *       - text/plain
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: All the post's info
 *       404:
 *         description: Not found
 */
// Get a specific post from id
app.get(`/p/upvoted/:id`, (req, res) => {
    let sql = `SELECT posts.*, upvotes.post FROM posts JOIN upvotes ON posts.id=upvotes.post WHERE upvotes.user=${req.params.id}`
    con.query(sql, (err, result, fields) => {
        if (err) return res.status(500).send(err);
        if (result) return res.status(200).send(result);
    });
})

/**
 * @swagger
 * /posts/p/commented/{id}:
 *   get:
 *     tags:
 *       - Posts (reactions)
 *     description: Gets posts commented by a specific user
 *     produces:
 *       - application/json
 *       - text/plain
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: All the post's info
 *       404:
 *         description: Not found
 */
// Get a specific post from id
app.get(`/p/commented/:id`, (req, res) => {
    let sql = `SELECT posts.*, comments.user,comments.opinion FROM posts JOIN comments ON posts.id=comments.post WHERE comments.user=${req.params.id}`
    con.query(sql, async (err, result, fields) => {
        if (err) return res.status(500).send(err);

        let n = await result.map(r => {
            if(result[result.indexOf(r)-1]) {
                if(result[result.indexOf(r)-1].id == r.id) return null;
                return r;
            }
            return r;
        })

        let y = await n.filter(x => {
            return x !== null && x !== undefined
        })

        if (result) return res.status(200).send(y);
    });
})

/**
 * @swagger
 * /posts/p/downvoted/{id}:
 *   get:
 *     tags:
 *       - Posts (reactions)
 *     description: Gets posts downvoted by a specific user
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
 *         description: All the post's info
 *       404:
 *         description: Not found
 */
// Get a specific post from id
app.get(`/p/downvoted/:id`, (req, res) => {
    let sql = `SELECT posts.*, downvotes.post FROM posts JOIN downvotes ON posts.id=downvotes.post WHERE downvotes.user=${req.params.id}`
    con.query(sql, (err, result, fields) => {
        if (err) return res.status(500).send(err);
        if (result) return res.status(200).send(result);
    });
})


/**
 * @swagger
 * /posts:
 *   get:
 *     tags:
 *       - Posts
 *     description: Gets all the posts
 *     produces:
 *       - application/json
 *       - text/plain
 *     responses:
 *       200:
 *         description: All the posts
 */
// Get all posts
app.get("/", (req, res) => {
    let sql = "SELECT * FROM posts";
    con.query(sql, async (err, result, fields) => {
        if (err) {
            return res.status(500).send(err);
        }

        if (result) {
            let posts = result.map(async post => {
                // For every post : get likes, upvotes, downvotes, comments and appends it to the object
                let likes = await getNumber(post.id, "likes");
                let upVotes = await getNumber(post.id, "upvotes");
                let downVotes = await getNumber(post.id, "downvotes");
                let comments = await getComments(post.id);

                let commentsPromise = comments.map(async comment => {
                    let upvotes = await getCommentsUpvotes(comment.id);
                    let downvotes = await getCommentsDownvotes(comment.id);

                    comment.upvotes = upvotes;
                    comment.downvotes = downvotes;
                    return comment;
                });

                post.likes = likes;
                post.upVotes = upVotes;
                post.downVotes = downVotes;
                post.comments = await Promise.all(commentsPromise);
                return post;
            })

            let changedPosts = await Promise.all(posts);
            res.status(200).send(changedPosts);
            return;
        }
    });
});

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     tags:
 *       - Posts
 *     consumes:
 *       - application/json
 *     produces:
 *       - text/plain
 *     description: Deletes a post
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     security:
 *       - JWT Token: []
 *     responses:
 *       404:
 *         description: Not found
 *       200:
 *         description: OK
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
app.delete("/:id", verifyIdentity, async (req, res) => {
    if (!req.params.id || req.params.id == "null" || req.params.id == "undefined") return res.status(400).send({ msg: "Provide a post id" });
    let user = req.user;
    let sql = `SELECT role FROM users WHERE id=${user.id}`;

    const checkUserRole = async () => {
        return new Promise((resolve, reject) => {
            con.query(sql, (err, result, fields) => {
                if (err) {
                    return reject(err);
                }

                if (result) {
                    resolve(result[0]);
                }
            });
        });
    }

    let userRole = (await checkUserRole()).role;

    sql = `SELECT user FROM posts WHERE id=${req.params.id}`;

    const checkUserId = async () => {
        return new Promise((resolve, reject) => {
            con.query(sql, (err, result, fields) => {
                if (err) return reject(err);

                if (result) {
                    resolve(result[0]);
                }
            });
        });
    }

    let thisid = await checkUserId();

    if (!thisid) return res.status(404).send({ msg: "Post not found." });

    let postUserId = thisid.user;

    if (postUserId == user.id || userRole == "superadmin") {
        // Deleting the post's comments and comments-likes beforehand
        const deleteComments = async () => {
            return new Promise((resolve, reject) => {
                sql = `SET foreign_key_checks = 0; DELETE \`comment-likes\`, comments FROM \`comment-likes\` JOIN comments ON comments.id = \`comment-likes\`.comment WHERE comment=${req.params.id}; SET foreign_key_checks = 1`
                con.query(sql, (err, result, fields) => {
                    if (err) return reject(err);

                    if (fields) {
                        resolve(true);
                    }
                });
            })
        }

        let deletedComments = await deleteComments();

        if (deletedComments) {

            let postId = req.params.id;

            const deletePost = async () => {
                return new Promise((resolve, reject) => {
                    sql = `SET foreign_key_checks = 0; DELETE FROM likes WHERE post=${postId}; DELETE FROM upvotes WHERE post=${postId}; DELETE FROM downvotes WHERE post=${postId}; DELETE FROM \`saved-posts\` WHERE post=${postId}; DELETE FROM posts where id=${postId}; SET foreign_key_checks = 1`
                    con.query(sql, (err, result, fields) => {
                        if (err) return reject(err);

                        if (result) resolve("Post deleted.");
                    });
                })
            }

            res.status(200).send(await deletePost());
        }
    } else {
        return res.status(401).send({ msg: "Unauthorized" });
    }
})

function haveIReacted(postId, userId, typeOfReaction) {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM ${typeOfReaction} WHERE post=${postId} AND user=${userId}`;
        con.query(sql, (err, result, fields) => {
            if (err) return reject(err);
            if (result.length == 0) return resolve(false);

            resolve(true);
        });
    })
}

// Upvote

/**
 * @swagger
 * /posts/{id}/upvote:
 *   post:
 *     produces:
 *       - text/plain
 *     tags:
 *       - Posts (reactions)
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     security:
 *       - JWT Token: []
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not Found
 */
app.post("/:id/upvote", verifyIdentity, async (req, res) => {
    try {

        let response = await axios.get(`${api_url}/posts/${req.params.id}`);

        let reacted = await haveIReacted(req.params.id, req.user.id, "upvotes");

        // If no upvote, add, and remove downvote if there is
        if (!reacted) {
            let sql = `INSERT INTO upvotes (user, post) VALUES (${req.user.id}, ${req.params.id})`;

            con.query(sql, (err, result, fields) => {
                if (err) return res.status(500).send(err);

                sql = `SET foreign_key_checks = 0; DELETE FROM downvotes WHERE post=${req.params.id} AND user=${req.user.id}; SET foreign_key_checks = 1`;
                con.query(sql, (err, result, fields) => {
                    if (err) return res.status(500).send(err);
                })

                return res.status(200).send({ downvote: false, upvote: true });
            });
            return;
        }

        // If upvote, remove
        let sql = `SET foreign_key_checks = 0; DELETE FROM upvotes WHERE post=${req.params.id} AND user=${req.user.id}; SET foreign_key_checks = 1`;

        con.query(sql, (err, result, fields) => {
            if (err) return res.status(500).send(err);

            return res.status(200).send({ downvote: false, upvote: false });
        })

    } catch (error) {

        if (error.response && error.response.status == 404) return res.status(404).send({ msg: "Post not found" });
        if (error.response) return res.status(error.response.status).send(error.response);

        return res.status(500).send(error);

    }

})

// Downvote

/**
 * @swagger
 * /posts/{id}/downvote:
 *   post:
 *     produces:
 *       - text/plain
 *     tags:
 *       - Posts (reactions)
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     security:
 *       - JWT Token: []
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not Found
 */
app.post("/:id/downvote", verifyIdentity, async (req, res) => {
    try {
        let response = await axios.get(`${api_url}/posts/${req.params.id}`);

        let reacted = await haveIReacted(req.params.id, req.user.id, "downvotes");

        // If no downvote, add
        if (!reacted) {
            let sql = `INSERT INTO downvotes (user, post) VALUES (${req.user.id}, ${req.params.id})`;

            con.query(sql, (err, result, fields) => {
                if (err) return res.status(500).send(err);

                sql = `SET foreign_key_checks = 0; DELETE FROM upvotes WHERE post=${req.params.id} AND user=${req.user.id}; SET foreign_key_checks = 1`;
                con.query(sql, (err, result, fields) => {
                    if (err) return res.status(500).send(err);
                })

                return res.status(200).send({ downvote: true, upvote: false });
            });
            return;
        }

        // If downvote, remove
        let sql = `SET foreign_key_checks = 0; DELETE FROM downvotes WHERE post=${req.params.id} AND user=${req.user.id}; SET foreign_key_checks = 1`;

        con.query(sql, (err, result, fields) => {
            if (err) return res.status(500).send(err);

            return res.status(200).send({ downvote: false, upvote: false });
        })

    } catch (error) {

        if (error.response && error.response.status == 404) return res.status(404).send({ msg: "Post not found" });
        if (error.response) return res.status(error.response.status).send(error.response);

        return res.status(500).send(error);

    }

})

// Like post

/**
 * @swagger
 * /posts/{id}/like:
 *   post:
 *     produces:
 *       - text/plain
 *     tags:
 *       - Posts (reactions)
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     security:
 *       - JWT Token: []
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not Found
 */
app.post("/:id/like", verifyIdentity, async (req, res) => {
    try {
        let response = await axios.get(`${api_url}/posts/${req.params.id}`);

        let reacted = await haveIReacted(req.params.id, req.user.id, "likes");

        // If no like, add
        if (!reacted) {
            let sql = `INSERT INTO likes (user, post) VALUES (${req.user.id}, ${req.params.id})`;

            con.query(sql, (err, result, fields) => {
                if (err) return res.status(500).send(err);

                return res.status(200).send({ msg: "Added a like" });
            });
            return;
        }

        // If liked, remove
        let sql = `SET foreign_key_checks = 0; DELETE FROM likes WHERE post=${req.params.id} AND user=${req.user.id}; SET foreign_key_checks = 1`;

        con.query(sql, (err, result, fields) => {
            if (err) return res.status(500).send(err);

            return res.status(200).send({ msg: "Removed like" });
        })

    } catch (error) {

        if (error.response && error.response.status == 404) return res.status(404).send({ msg: "Post not found" });
        if (error.response) return res.status(error.response.status).send(error.response);

        return res.status(500).send(error);

    }

})

// Save post

/**
 * @swagger
 * /posts/{id}/save:
 *   post:
 *     produces:
 *       - text/plain
 *     tags:
 *       - Posts (reactions)
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     security:
 *       - JWT Token: []
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not Found
 */
app.post("/:id/save", verifyIdentity, async (req, res) => {
    try {
        let response = await axios.get(`${api_url}/posts/${req.params.id}`);

        let reacted = await haveIReacted(req.params.id, req.user.id, "`saved-posts`");

        // If no save, add
        if (!reacted) {
            let sql = `INSERT INTO \`saved-posts\` (user, post) VALUES (${req.user.id}, ${req.params.id})`;

            con.query(sql, (err, result, fields) => {
                if (err) return res.status(500).send(err);

                return res.status(200).send(true);
            });
            return;
        }

        // If save, remove
        let sql = `SET foreign_key_checks = 0; DELETE FROM \`saved-posts\` WHERE post=${req.params.id} AND user=${req.user.id}; SET foreign_key_checks = 1`;

        con.query(sql, (err, result, fields) => {
            if (err) return res.status(500).send(err);

            return res.status(200).send(false);
        })

    } catch (error) {

        if (error.response && error.response.status == 404) return res.status(404).send({ msg: "Post not found" });
        if (error.response) return res.status(error.response.status).send(error.response);

        return res.status(500).send(error);

    }

})

// Have i upvoted a post

/**
 * @swagger
 * /posts/{id}/upvoted:
 *   get:
 *     produces:
 *       - text-plain
 *     security:
 *       - JWT Token : []
 *     tags:
 *       - Posts (reactions)
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           required: true
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not Found
 */
app.get("/:id/upvoted", verifyIdentity, async (req, res) => {
    try {
        let response = await axios.get(`${api_url}/posts/${req.params.id}`);

        return res.status(200).send(await haveIReacted(req.params.id, req.user.id, "upvotes"));
    } catch (error) {
        console.log(error);
        if (error.response.status == 404) return res.status(404).send({ msg: "Post not found" });
        return res.status(error.response.status).send(error.response);
    }
})

// Have i downvoted a post

/**
 * @swagger
 * /posts/{id}/downvoted:
 *   get:
 *     produces:
 *       - text-plain
 *     security:
 *       - JWT Token : []
 *     tags:
 *       - Posts (reactions)
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           required: true
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not Found
 */
app.get("/:id/downvoted", verifyIdentity, async (req, res) => {
    try {
        let response = await axios.get(`${api_url}/posts/${req.params.id}`);

        return res.status(200).send(await haveIReacted(req.params.id, req.user.id, "downvotes"));
    } catch (error) {
        console.log(error);
        if (error.response.status == 404) return res.status(404).send({ msg: "Post not found" });
        return res.status(error.response.status).send(error.response);
    }
})

// Have i liked a post

/**
 * @swagger
 * /posts/{id}/liked:
 *   get:
 *     produces:
 *       - text-plain
 *     security:
 *       - JWT Token : []
 *     tags:
 *       - Posts (reactions)
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           required: true
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not Found
 */
app.get("/:id/liked", verifyIdentity, async (req, res) => {
    try {
        let response = await axios.get(`${api_url}/posts/${req.params.id}`);

        return res.status(200).send(await haveIReacted(req.params.id, req.user.id, "likes"));
    } catch (error) {
        console.log(error);
        if (error.response.status == 404) return res.status(404).send({ msg: "Post not found" });
        return res.status(error.response.status).send(error.response);
    }
})

// Have i saved a post

/**
 * @swagger
 * /posts/{id}/saved:
 *   get:
 *     produces:
 *       - text-plain
 *     security:
 *       - JWT Token : []
 *     tags:
 *       - Posts (reactions)
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           required: true
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not Found
 */
app.get("/:id/saved", verifyIdentity, async (req, res) => {
    try {
        let response = await axios.get(`${api_url}/posts/${req.params.id}`);

        return res.status(200).send(await haveIReacted(req.params.id, req.user.id, "`saved-posts`"));
    } catch (error) {
        console.log(error);
        if (error.response.status == 404) return res.status(404).send({ msg: "Post not found" });
        return res.status(error.response.status).send(error.response);
    }
})

module.exports = app;