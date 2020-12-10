const express = require('express');
const router = express.Router();



router.get('admin/liste', (req, res, next) => {

    if (req.isAuthenticated()) {
        res.render('admin/liste', {
            username: req.user.username ,
            isAuthenticated: req.isAuthenticated()
        })
    } else {
        res.render('admin/login', {
            username: null,
            isAuthenticated: false
        })
    }
})

router.get('admin/creation', (req, res, next) => {

    if (req.isAuthenticated()) {
        res.render('admin/creation', {
            username: req.user.username ,
            isAuthenticated: req.isAuthenticated()
        })
    } else {
        res.render('admin/login', {
            username: null,
            isAuthenticated: false
        })
    }
})


module.exports = router;