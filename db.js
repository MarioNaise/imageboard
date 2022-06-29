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
