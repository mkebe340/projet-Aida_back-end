const express = require('express');
const router = express.Router();
const uploader = require('../config/fileUploader')

router.get('/admin/signup', (req, res, next) => {
    res.render('admin/signup');
})

router.get('/admin/login', (req, res, next) => {
    res.render('admin/login',{
        title: "Connexion au tableau de bord"
    });
})

router.get('/admin/creation', (req, res, next) => {
    res.render('admin/creation',{
        title: "Mon éditeur d'articles"
    });
})


// route protégé par authorization par session
router.get('/admin/liste', (req, res, next) => {
    // La méthode isAuthenticated est fournie par passport,
    // elle aura une valeur de true si la session est active
    if (req.isAuthenticated()) {
        // Si l'utilisateur est authentifié, nous avons accès à l'objet req.user passé par les middlewares de passport antérieur
        console.log('in /admin/liste', req.user)
        return res.render('admin/liste',{
            title: "Liste des publications"
        })
    }
    // Si l'utilisateur n'est pas authentifié, on le redirige vers la page d'admin
    res.render('admin/login');
})

router.get('/admin/login', (req, res, next) => {
    res.render('admin/login',{
        title: "Connexion au tableau de bord"
    });
})

module.exports = router;