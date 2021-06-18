const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const path = require("path");
const connectDB = require("./server/database/connection");

const app = express();

dotenv.config({ path: "config.env" });

const PORT = process.env.PORT || 8080;

// upload()
var multer = require("multer");
const fs = require("fs");
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var dir = "./uploads";
        if (fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    },
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "application/pdf" ||
        file.mimetype === "application/msword" ||
        file.mimetype === "image/png"
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

var upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
    fileFilter: fileFilter,
});

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
