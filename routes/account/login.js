const express = require('express')
const router = express.Router();
const Account = require('../../model/account');
const bcrypt = require('bcryptjs');
const passport = require("passport")
    ,LocalStrategy = require("passport-local").Strategy;

passport.use(new LocalStrategy((username, password, done) =>{
    Account.findOne({username:username}, async (err, doc) =>{
        if(err){
            return done(err);
        }    
        if(!doc){
            return done(null, false, {message:'Username not found.'} );
        }

        try{
            if(await bcrypt.compare(password, doc.password)){
                return done(null, {username:username});
            }
            else{
                return done(null, false, {message:'Incorrect password'});
            }
        }
        catch(err){
            console.log(err);
        }        
    });
})); 

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });


router.post('/', passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect:'/',
    failureFlash: true
    }) 
);

module.exports = router;