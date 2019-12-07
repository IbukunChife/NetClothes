const mongoose = require('mongoose');
const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const path = require('path');

//Iniciando e Testando o DB
// const mongo_uri = 'mongodb://localhost:27017/didier';
const mongo_uri = 'mongodb+srv://ibukun_23:a.361051@netclothes-0f1fs.mongodb.net/test?retryWrites=true&w=majority';


mongoose.connect(mongo_uri, {
    useNewUrlParser: true
}, function(err) {
    if (err) {
        throw err;
    } else {
        console.log(`Successfully connected to ATLAS MONGO DB ..... ENJOY!!!!! :)`);
    }
});

const app = express();

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
var User = require('./models/User');


// Configure the local strategy for use by Passport.
passport.use(
    new LocalStrategy({
        usernameField: 'email'
    }, (email, password, done) => {
        // Match user
        User.findOne({
            email: email
        }).then(user => {
            if (!user) {
                return done(null, false, {
                    message: 'That email is not registered'
                });
            }

            // Match password
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, {
                        message: 'Password incorrect'
                    });
                }
            });
        });
    })
);
// Configure Passport authenticated session persistence.
passport.serializeUser(function(user, done) {
    done(null, user.id);
});
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});


app.use(cors({}));


// Initialize Passport and restore authentication state, if any, from the session.
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());



app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/product',express.static(path.resolve(__dirname,'..','uploads')));

app.use(routes);
app.listen(process.env.PORT || 3000);

