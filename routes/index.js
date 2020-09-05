const express = require('express');
const routes = express.Router();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const user = require('./../models/models.js');
const story = require('./../models/stories.js');

routes.use(bodyparser.urlencoded({ extended : true }));

routes.use(cookieParser('secret'));
routes.use(session({
    secret : 'secret',
    resave: true,
    saveUninitialized: true,
    maxAge: 3600000
}));

routes.use(passport.initialize());
routes.use(passport.session());

routes.use(flash());

//global variable
routes.use(function(req, res, next){
    res.locals.success_message = req.flash('success-message');
    res.locals.error_message = req.flash('error-message');
    res.locals.error = req.flash('error');
    next();
});

//authenticated user or not
const checkAuthenticated = function(req, res, next){
    if(req.isAuthenticated()){
        res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, post-check=0, pre-check=0');
        return next();
    }else{
        res.redirect('/login');
    }
}

mongoose.connect('mongodb+srv://sourabh:Champion9!@cluster0-zh23d.mongodb.net/userDB?retryWrites=true&w=majority', {
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).then(() => console.log("Database connected successfully"));

routes.get('/', (req, res) => {
    res.render('index');
});

routes.post('/register', (req, res) => {
    var { email, username, password, confirmpassword } = req.body;
    var err;
    if(!email || !username || !password || !confirmpassword){
        err = "Kindly fill all the required fields...";
        res.render('index', { 'err': err });
        return;
    }
    if(password != confirmpassword){
        err = "Passwords don't match";
        res.render('index', { 'err': err, 'email': email, 'username':username });
        return;
    }
    if(typeof(err) == 'undefined'){
        user.findOne({ email: email}, function(err, data){
            if(err) throw err;
            if(data){
                console.log("User exist");
                err = "User already exist with this email";
                res.render('index', { 'err': err, 'email': email, 'username':username });
            }else{
                bcrypt.genSalt(10, (err, salt) => {
                    if(err) throw err;
                    bcrypt.hash(password, salt, (err, hash) => {
                        if(err) throw err;
                        password = hash; story1 = false;
                        user({
                            email, 
                            username,
                            password,
                            story1
                        }).save(err, data => {
                            if(err) throw err;
                            req.flash('success-message', 'Registered Successfully. Login to continue..');
                            res.redirect('/login');
                        })
                    });
                });
            }
        });
    }
});

//authentication strategy 
var localStrategy = require('passport-local').Strategy;
passport.use(new localStrategy({ usernameField: 'email' }, (email, password, done) => {
    user.findOne({ email : email }, (err, data) => {
        if(err) throw err;
        if(!data){
            return done(null, false, { message: "User doesn't exists..."});
        }
        bcrypt.compare(password, data.password, (err, match) => {
            if(err){
                return done(null, false);
            }
            if(!match){
                return done(null, false, { message: "Password doesn't match..."});
            }
            if(match){
                return done(null, data);
            }
        });
    });
})); 

passport.serializeUser(function(user, cb){
    cb(null, user.id);
});

passport.deserializeUser(function(id, cb){
    user.findById(id, (err, user) => {
        cb(err, user);
    });
});

//authentication strategy end

routes.get('/login', (req, res) => {
    res.render('login');
});

routes.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        failureRedirect: '/login',
        successRedirect: '/success',
        failureFlash: true
    })(req, res, next);
});

routes.get('/success', checkAuthenticated, (req, res) => {
    res.render('success', { 'user' : req.user });
});

routes.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});

routes.post('/addmsg', checkAuthenticated, (req, res) => {
    user.findOneAndUpdate(
        { email: req.user.email },
        { $push : {
            messages: req.body['msg']
        }}, (err, suc) => {
            if(err) throw err;
            if(suc) console.log("Added Successfully...");
        }
    );
    res.redirect('/success');
});

routes.get('/story1', checkAuthenticated, (req, res) => {
    // console.log("Inside story1, ad going to render storey 1 ejs");
    console.log("The email is before : ", req.user);
    console.log("The total: ", story);
    if(req.user.story1 == false){
        user.findOneAndUpdate(
            { email : req.user.email },
            { $set: {
                story1: true
            }}, (err, suc) => {
                if(err) throw err;
                if(suc) console.log("Changed value to true successfully");
            }
        );
    }
    console.log("The email is after : ", req.user);
    // user.findOne({ email: email})
    res.render('story1');
});

module.exports = routes;