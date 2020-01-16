const express = require("express");
const router = express.Router();
const Account = require("../../model/account");
const UserStats = require("../../model/user_stats");

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        return res.redirect("/login");
    }
}

router.get("/", (req, res) => {
    if (req.isAuthenticated()) {
        Account.findOne({ username: req.user.username }, (err, account) => {
            UserStats.findOne({ username: req.user.username }, (err, stats) => {

                let design = stats.total_design_score;
                let ux = stats.total_ux_score;
                let code = stats.total_code_score;
                let winRate = stats.total_wins,
                

                if (!stats.total_matches == 0) {
                    design /= stats.total_matches;
                    ux /= stats.total_matches;
                    code /= stats.total_matches;
                    winRate /= stats.total_matches
                }

                res.render("authorizedViews/home", {
                    user: account.username,
                    name: account.name,
                    position: account.position,
                    totalMatches: stats.total_matches,
                    totalWins: stats.total_wins,
                    totalLoss: stats.total_loss,
                    totalTies: stats.total_ties,
                    totalScore: stats.total_score,
                    designAvg: design.toFixed(1),
                    uxAvg: ux.toFixed(1),
                    codeAvg: code.toFixed(1)
                });
            });
        });

        //res.render('authorizedViews/home');
    } else {
        req.flash("error", "You need to login first.");
        res.redirect("/");
    }
});

module.exports = router;
