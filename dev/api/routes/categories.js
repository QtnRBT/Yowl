var express = require('express');
var app = express.Router();


/**
 * @swagger
 * /categories:
 *   get:
 *     produces:
 *       - application/json
 *     tags:
 *       - Categories
 *     responses:
 *       200:
 *         description: OK
 *         
 */
app.get("/", (req, res) => {
    let sql = `SELECT * FROM categories ORDER BY id ASC`;
    con.query(sql, (err, result, fields) => {
        if (err) return res.status(500).send(err);

        if (result) {
            res.status(200).send(result);
            return;
        }
    });
    return;
});

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     produces:
 *       - application/json
 *     tags:
 *       - Categories
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required:
 *           - id
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not Found
 *         
 */
app.get("/:id", (req, res) => {
    let sql = `SELECT * FROM categories WHERE id=${req.params.id}`;
    con.query(sql, (err, result, fields) => {
        if (err) return res.status(500).send(err);

        if (result) {
            res.status(200).send(result[0]);
            return;
        }
    });
    return;
})

/**
 * @swagger
 * /categories/c/{name}:
 *   get:
 *     produces:
 *       - application/json
 *     tags:
 *       - Categories
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not Found
 *         
 */
app.get("/c/:name", (req, res) => {
    let sql = `SELECT * FROM categories WHERE name="${req.params.name}"`;
    con.query(sql, (err, result, fields) => {
        if (err) return res.status(500).send(err);

        if (result) {
            res.status(200).send(result[0]);
            return;
        }
    });
    return;
})

module.exports = app;