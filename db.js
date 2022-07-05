const spicedPg = require("spiced-pg");
const database = "images";
const username = "postgres";
const password = "postgres";

const db = spicedPg(
    process.env.DATABASE_URL ||
        `postgres:${username}:${password}@localhost:5432/${database}`
);

module.exports.getImages = () => {
    return db.query(`SELECT * FROM images
                    ORDER BY id DESC
                    LIMIT 9;`);
};

module.exports.uploadImage = (url, username, title, description) => {
    const q = `INSERT INTO images (url, username, title, description)
                VALUES ($1, $2, $3, $4)
                RETURNING *`;
    const param = [url, username, title, description];
    return db.query(q, param);
};

module.exports.getSingleImage = (id) => {
    return db.query(
        `SELECT * FROM images
        WHERE id = $1`,
        [id]
    );
};

module.exports.loadImages = (id) => {
    return db.query(
        `SELECT url, title, id, (
                    SELECT id FROM images
                    ORDER BY id ASC
                    LIMIT 1)
                    AS "lowestId"
                    FROM images
                    WHERE id < $1
                    ORDER BY id DESC
                    LIMIT 10;`,
        [id]
    );
};

module.exports.lowestId = () => {
    return db.query(`SELECT id FROM images
                    ORDER BY id ASC
                    LIMIT 1;`);
};

module.exports.insertComment = (id, username, comment) => {
    const q = `INSERT INTO comments (img_id, username, comment)
                VALUES ($1, $2, $3)
                RETURNING *;`;
    const params = [id, username, comment];
    return db.query(q, params);
};

module.exports.getComments = (id) => {
    return db.query(
        `SELECT * FROM comments
        WHERE img_id = $1
        ORDER BY id DESC;`,
        [id]
    );
};
