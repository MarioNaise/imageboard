const express = require("express");
const app = express();
const db = require("./db");
const multer = require("multer");
const uidSafe = require("uid-safe");
const s3 = require("./s3");
const path = require("path");

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
app.use(express.static("./public"));

app.use("/images", express.static("./uploads"));
// app.use("/images", express.static(path.resolve(__dirname, "uploads")));

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

app.get("/images/:imageId", (req, res) => {
    db.getSingleImage(req.params.imageId)
        .then((result) => {
            res.json(result.rows[0]);
        })
        .catch((err) => {
            console.log("err in getSingleImage: ", err);
        });
});

app.get("/loadImages/:id", (req, res) => {
    db.loadImages(req.params.id)
        .then((result) => {
            // console.log(result.rows);
            res.json(result.rows);
        })
        .catch((err) => {
            console.log("err in loadImages: ", err);
        });
});

app.get("/lowestId", (req, res) => {
    db.lowestId()
        .then((result) => {
            res.json(result.rows);
        })
        .catch((err) => {
            console.log("err in loadImages: ", err);
        });
});

app.get("/comments/:id", (req, res) => {
    db.getComments(req.params.id)
        .then((result) => {
            res.json(result.rows);
        })
        .catch((err) => {
            console.log("err in getComments: ", err);
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
            // console.log("file: ", file);
            callback(null, randomString + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage,
    limits: {
        fileSize: 2097152,
    },
});

app.post("/upload", uploader.single("image"), s3.upload, (req, res) => {
    console.log("UPLOAD");
    let newImage;
    // console.log("req.file in server.js: ", req.file);
    db.uploadImage(
        "https://s3.amazonaws.com/spicedling/" + req.file.filename,
        req.body.user,
        req.body.title,
        req.body.description
    )
        .then((result) => {
            // console.log("result server.js ", result.rows[0]);
            newImage = result.rows[0];
            res.json({
                newImage,
            });
        })
        .catch((err) => {
            console.log("err in uploadImage", err);
        });

    // if (!req.body.title) {
    //     res.json({ error: "Missing field title!" });
    //     return;
    // }

    // res.json({ success: true });

    // res.json({
    //     tempAnswer: true,
    // });
});

app.post("/insertComment", (req, res) => {
    db.insertComment(req.body.image_id, req.body.username, req.body.comment)
        .then((result) => {
            newComment = result.rows[0];
            res.json({
                newComment,
            });
        })
        .catch((err) => {
            console.log("err in insertComment", err);
        });
});

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
app.listen(8080, () => console.log(`Server listening on PORT 8080...`));
