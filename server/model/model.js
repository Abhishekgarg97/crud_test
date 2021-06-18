const mongoose = require("mongoose");

var schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    contact: {
        type: String,
        required: true,
    },
    gender: String,
    designation: String,
    file: String,
});

const userdb = mongoose.model("userdb", schema);

module.exports = userdb;
