
const express = require('express');
const router = express.Router();

module.exports = function (passport, User) {
    
router.post('admin/login', passport.authenticate('local', {
        successRedirect: 'admin/liste',
        failureRedirect: 'admin/login'
    }))

    router.get('/logout', (req, res, next) => {
        req.logout();
        res.redirect('admin/login');
    })
    
    return router
}    
