const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const path = require("path");
const connectDB = require("./server/database/connection");
const route = express.Router();
const app = express();

dotenv.config({ path: "config.env" });

const PORT = process.env.PORT || 8080;

// upload()
var multer = require("multer");
const fs = require("fs");
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        var dir = "./uploads";
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        callback(null, dir);
    },
    filename: function (req, file, callback) {
        callback(null, Date.now() + file.originalname);
    },
});

const fileFilter = (req, file, callback) => {
    if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "application/pdf" ||
        file.mimetype === "application/msword" ||
        file.mimetype === "image/png"
    ) {
        callback(null, true);
    } else {
        callback(null, false);
    }
};

// var upload = multer({
//     storage: storage,
//     limits: {
//         fileSize: 1024 * 1024 * 5,
//     },
//     fileFilter: fileFilter,
// });
// route.get("/", function (req, res) {
//     res.sendFile(__dirname + "/index.ejs");
// });
// route.post("/api/users", upload.single("image"), function (req, res, next) {
//     const filename = req.file.filename;
//     res.json({
//         message: "Image Uploaded Successfully",
//         filename: filename,
//     });
// });

//ending

//log requests
app.use(morgan("tiny"));

//mongodb connection
connectDB();
//parse requests  to body parser
app.use(bodyparser.urlencoded({ extended: true }));

//set view engine
app.set("view engine", "ejs");
// app.set("views",path.resolve())

//load assets
app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
app.use("/img", express.static(path.resolve(__dirname, "assets/img")));
app.use("/js", express.static(path.resolve(__dirname, "assets/js")));

//load routes
app.use("/", require("./server/routes/router"));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = route;
