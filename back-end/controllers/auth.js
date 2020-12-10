
const express = require('express');
const router = express.Router();

module.exports = function (passport, User) {
    
router.post('/admin/login', passport.authenticate('local', {
        successRedirect: '/admin/liste',
        failureRedirect: '/admin/login'
    }))
    
    return router
}    
