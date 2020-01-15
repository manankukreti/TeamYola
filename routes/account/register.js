const express = require('express')
const router = express.Router();


const Account = require('../../model/account.js');
const bcrypt = require('bcryptjs');



router.get('/', (req, res) =>{
    res.render('register.ejs');
});

router.post('/', async (req, res) =>{

    try{

        Account.findOne({username: req.body.username}, (err, docs) =>{
            
            if(err){
                res.render('register.ejs', {errorMessage:'Unknown error.'});
            }
            
            if(docs){
                res.render('register.ejs', {errorMessage:'Username not available'});
            }
        });

        let hashedPass = await bcrypt.hash(req.body.password, 10);

        const account = new Account({
            name: req.body.name,
            username: req.body.username,
            password:hashedPass
        });
        const newAccount = await account.save();
        res.redirect('/'); 
    }
    catch(error){
        console.log(error);
    }
    
});

module.exports = router;