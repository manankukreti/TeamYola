const express = require("express");
const router = express.Router();
const Account = require("../../model/account.js");
const UserStats = require("../../model/user_stats.js");
const bcrypt = require("bcryptjs");

router.get("/", (req, res) => {
    res.render("register.ejs");
});

router.post("/", async (req, res) => {
    try {
        Account.findOne({ username: req.body.username }, (err, docs) => {
            if (err) {
                res.render("register.ejs", { errorMessage: "Unknown error." });
            }

            if (docs) {
                res.render("register.ejs", {
                    errorMessage: "Username not available"
                });
            }
        });

        let hashedPass = await bcrypt.hash(req.body.password, 10);

        const account = new Account({
            name: req.body.name,
            username: req.body.username,
            password: hashedPass,
            position: "CEO",
            role: "admin",
            about: "empty"
        });
        const newAccount = await account.save();

        const stats = new UserStats({
            username: req.body.username,
            total_matches: 0,
            total_wins: 0,
            total_loss: 0,
            total_ties: 0,
            total_score: 0,
            total_design_score: 0,
            total_ux_score: 0,
            total_code_score: 0,
            tasks_completed: 0
        });

        const newStats = await stats.save();

        res.redirect("/");
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
