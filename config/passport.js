const passport = require('passport')
var LocalStrategy   = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');
var models = require('../models/index');

function findUser(username, callback) {
    try {
        models.User.findOne({
            where: { username: username,}
        }).then(function(user) {
            if (user) {
                return callback(null, user);
            }
            return callback("user not found", null);
        });
    } catch (ex) {
        return callback(ex);
    }
}

module.exports = function() {
    passport.serializeUser(function (user, done) {
        done(null, user.username);
    });

    passport.deserializeUser(function (username, done) {
        findUser(username, done);
    });

    passport.use('local-login', new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback : true
        },
        function (req, username, password, done) {
            try {
                console.log("check username ", username);
                findUser(username, function (err, user) {
                    try {
                        if (err) {
                            console.log("User not found.");
                            return done(null, false, req.flash('info', 'Invalid username.'));
                        }
                        if (!bcrypt.compareSync(password, user.password)) {
                            console.log("Invalid password.");
                            return done(null, false, req.flash('info', 'Invalid password.'));
                        }
                    } catch (ex) {
                        console.log("handle exception", ex);
                        return done(null, false, req.flash('info', 'System error. Please try again.'));
                    }
                    return done(null, user);
                })
            }
            catch (ex) {
                console.log("got exception ", ex);
                done(ex);
            }
        }
    ));

    passport.use('local-signup', new LocalStrategy({
        passReqToCallback: true
    }, function (req, username, password, done) {
        console.log("adding new user");
        models.User.create({
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password),
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            passport_no: req.body.passport_no,
            birth_date: req.body.date_of_birth,
            email: req.body.email,
            phone_num: req.body.phone_num,
            type: 'USER'
        }).then(function (user) {
            return done(null, user);
        }).catch(function (err) {
            console.log("error in creating user ", err);
            return done(err, false);
        });
    }));
}