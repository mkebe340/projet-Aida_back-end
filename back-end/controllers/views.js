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
    Posts.findById(req.params.id)
        .then(posts => res.render("liste/modification", {
            posts
        }))
        .catch(dbErr => next(dbErr));
});

router.post('/admin/liste/modification/:id', uploader.single('image'), async (req, res) => {
    const posts = req.body;
    if (req.file) posts.image = req.file.secure_url;
    Posts.findByIdAndUpdate(req.params.id, posts)
        .then(dbRes => res.redirect('liste'))
        .catch(dbErr => next(dbErr));
});


router.post('/admin/liste/suppression/:id', (req, res, next) => {
    Posts.findByIdAndDelete(req.params.id)
        .then(posts => {
            res.redirect('liste'
            )
        })
        .catch(dbErr => next(dbErr));
});


router.get('/articles', async (req, res, next) => {
    console.log(posts)
    try {
        const posts = await Posts.find({}).lean().exec()
        console.log("liste")
        res.json(posts)
    } catch (err) {
        console.log("error :", err)

        res.status(500).send(err)
    }

})


module.exports = router;