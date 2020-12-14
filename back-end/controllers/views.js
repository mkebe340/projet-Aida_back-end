const express = require('express');
const router = express.Router();
const uploader = require('../config/fileUploader')

router.get('/admin/signup', (req, res, next) => {
    res.render('admin/signup');
})

router.get('/admin/login', (req, res, next) => {
    res.render('admin/login', {
        title: "Connexion au tableau de bord"
    });
})

router.get('/admin/creation', (req, res, next) => {
    res.render('admin/creation', {
        title: "Mon éditeur d'articles"
    });
})


// route protégé par authorization par session
//router.get('/admin/liste', (req, res, next) => {
    // La méthode isAuthenticated est fournie par passport,
    // elle aura une valeur de true si la session est active
    //console.log("coucou")
    //if (req.isAuthenticated()) {
        // Si l'utilisateur est authentifié, nous avons accès à l'objet req.user passé par les middlewares de passport antérieur
        //console.log('in /admin/liste', req.user)
        //res.render('admin/liste', {
            //title: "Liste des publications"
        //})
    //} 
    // Si l'utilisateur n'est pas authentifié, on le redirige vers la page d'admin
    //res.render('admin/login');
//})

router.get('/admin/login', (req, res, next) => {
    res.render('admin/login', {
        title: "Connexion au tableau de bord"
    });
})



// Récupération des posts (articles) dans la db

 // Récupération des posts à modifier
 router.get('/admin/liste/modification/:id', (req, res, next) => {
    postModel.findById(req.params.id)
    .then(post => res.render("/admin/creation/modification", {
    post
    }))
    .catch(dbErr => next(dbErr));
    });

    router.post('/admin/liste/modification/:id', uploader.single('image'), async (req, res) => {
        const post = req.body;
    if (req.file) post.image = req.file.secure_url;
    postModel.findByIdAndUpdate(req.params.id, post)
        .then(dbRes => res.redirect('/admin/liste'))
        .catch(dbErr => next(dbErr));
    });


router.get('/admin/liste/suppression/:id', (req, res, next) => {
    postModel.findByIdAndDelete(req.params.id)
    .then(posts => {
    res.redirect('/admin/liste'
    )
    })
    .catch(dbErr => next(dbErr));
    });
    
   
    
module.exports = router;