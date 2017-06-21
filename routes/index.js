var express = require('express');
var passport = require('passport');
var router = express.Router();

router.get('/', function(req, res, next) {
    if ( req.isAuthenticated() ) {
        res.redirect('/welcome');
        return;
    }
    res.render('login', { title: 'Examination', message: req.flash('info') });
});

router.get('/welcome', function(req,res,next) {
    res.render('welcome');
});

module.exports = router;
