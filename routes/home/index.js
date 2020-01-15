const express = require('express')
const router = express.Router();
const Account = require('../../model/account');

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    else{
        return res.redirect('/login');
    }
}


router.get('/', (req, res) =>{
    if(req.isAuthenticated()){

        Account.findOne({username:req.user.username}, (err, doc) =>{

            res.render('authorizedViews/home', {
                name: doc.name
            });
        });

        //res.render('authorizedViews/home');
    }
    else{
        req.flash('error', "You need to login first.");
        res.redirect('/');
    }
});


module.exports = router;