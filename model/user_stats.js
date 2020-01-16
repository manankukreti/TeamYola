const mongoose = require("mongoose");

const statsScheme = mongoose.Schema({
    username: String,
    total_matches: Number,
    total_wins: Number,
    total_loss: Number,
    total_ties: Number,
    total_score: Number,
    total_design_score: Number,
    total_ux_score: Number,
    total_code_score: Number,
    tasks_completed: Number
});

module.exports = mongoose.model("UserStats", statsScheme);
