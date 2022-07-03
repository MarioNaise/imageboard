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
                    ORDER BY id DESC;`);
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
