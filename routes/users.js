var express = require('express');
var router = express.Router();
var passport = require('passport');
var models = require('../models/index');

// Creating new page
router.get('/signup', function(req, res, next) {
    res.render('signup', { title: 'Create Account' });
});

/* create user */
router.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/welcome', // redirect to the secure profile section
    failureRedirect : '/', // redirect back to the signup page if there is an error
}));

/*function(req, res) {
 console.log("adding new user");
 models.User.create({
 username: req.body.username,
 password: req.body.password,
 first_name: req.body.first_name,
 last_name: req.body.last_name,
 passport_no: req.body.passport_no,
 birth_date: req.body.date_of_birth,
 email: req.body.email,
 phone_num: req.body.phone_num,
 type: 'USER'
 }).then(function(user) {
 res.json(user);
 });
 });*/

/* list view */
router.all('/list', function(req, res) {

});

/* remove view */
router.all('/{id}/remove', function(req, res) {

});

/* update view */
router.all('/{id}/update', function(req, res) {

});

/* detail view */
router.all('/{id}', function(req, res) {

});

router.post('/login', passport.authenticate('local-login', {
    successRedirect : '/welcome', // redirect to the secure profile section
    failureRedirect : '/', // redirect back to the signup page if there is an error
    failureFlash : true
}));

module.exports = router;
