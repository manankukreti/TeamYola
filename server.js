const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require("passport")
    ,LocalStrategy = require("passport-local").Strategy;
const flash = require("connect-flash");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

//MIDDLEWARE
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(session({
    secret: "thesec",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


//ROUTES
const registerRoute = require('./routes/account/register');
app.use('/register', registerRoute);

const loginRoute = require('./routes/account/login');
app.use('/login', loginRoute);

const homeRoute = require('./routes/home/index');
app.use('/home', homeRoute);


//DB CONNECTION
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/teamyola', {
    useNewUrlParser:true
});
const db = mongoose.connection;
db.on('error', error => console.log(error));
db.once('open', () => console.log("Connected to DB."));


//REQUESTS
app.get('/', (req, res) =>{
    if(req.isAuthenticated()){
        res.redirect('/home');
    }
    else{
        res.render('index.ejs', {errorMessage: req.flash('error')});
    }   
});


app.listen(3000);