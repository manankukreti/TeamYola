const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
    name: String,
    username: String,
    password: String,
    position: String,
    role: String,
    about: String
});

module.exports = mongoose.model("Account", accountSchema);
