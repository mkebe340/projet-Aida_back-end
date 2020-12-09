const express = require('express');
const router = express.Router();


router.get('admin/liste', (req, res, next) => {

    // 1- Vérifier si l'utilisateur est authentifé ou pas
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

router.get('/signup', (req, res, next) => {
    res.render('signup');
})

router.get('/login', (req, res, next) => {
    res.render('login');
})

// route protégé par authorization par session
router.get('/admin', (req, res, next) => {
    // La méthode isAuthenticated est fournie par passport,
    // elle aura une valeur de true si la session est active
    if (req.isAuthenticated()) {
        // Si l'utilisateur est authentifié, nous avons accès à l'objet req.user passé par les middlewares de passport antérieur
        console.log('in /admin/liste', req.user)
        return res.render('admin/liste', {
            username: req.user.username,
            isAuthenticated: req.isAuthenticated()
        })
    }
    // Si l'utilisateur n'est pas authentifié, on le redirige vers la page d'admin
    res.redirect('admin/login');
})


module.exports = router;