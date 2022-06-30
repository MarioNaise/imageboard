const express = require("express");
const app = express();
const db = require("./db");
const multer = require("multer");
const uidSafe = require("uid-safe");

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
app.use(express.static("./public"));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
app.get("/images", (req, res) => {
    // console.log("/cities route has been hit");
    db.getImages()
        .then((result) => {
            // console.log(result.rows);
            res.json(result.rows);
        })
        .catch((err) => {
            console.log("err in getImages: ", err);
        });
});

app.get("*", (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, "uploads");
    },
    filename(req, file, callback) {
        // work here
        // -create random file name
        // -pick up the filename extenstion and save it too
        const randomFileName = uidSafe(24).then((randomString) => {
            // keep original file extension
            console.log("file: ", file);
            callback(null, `${randomString}.jpg`);
        });
    },
});

const uploader = multer({
    storage,
    limits: {
        fileSize: 2097152,
    },
});

app.post("/upload", uploader.single("image"), (req, res) => {
    console.log("UPLOAD");
    console.log("req.body: ", req.body);

    if (!req.body.title) {
        res.json({ error: "Missing field title!" });
        return;
    }

    res.json({ success: true });
});

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
app.listen(8080, () => console.log(`Server listening on PORT 8080...`));
