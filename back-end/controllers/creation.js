const express = require('express');
const multer = require('multer');
const router = express.Router();


const uploader = require ('../config/fileUploader.js');


module.exports = function (passport, Posts) {

    router.get('/admin/liste', async (req, res, next) => {
        try {
            const posts = await Posts.find({}).lean().exec()
            console.log(liste)
            res.render('admin/liste', {
                posts,
                isAuthenticated: req.isAuthenticated(),
                username: req.isAuthenticated() ? req.user.username: null
            })
        } catch(err) {
            res.status(500).send(err)
        }
        
    })


    router.post('/admin/creation', uploader.single('image'), async (req, res) => {
        try { 
            const resultat = await Posts.create({
                type: req.body.type,
                titre: req.body.titre,
                description: req.body.description,
                texte: req.body.texte,
                imageUrl: `http://localhost:3000/uploads/${req.file.filename}`
            }).exec()
            res.send(resultat);
            console.log(req.file)
        } catch (err) {
            res.status(500).send(err);

        }
    });





    // Récupération des posts (articles) dans la db
    router.get('/admin/liste', (req, res, next) => {
        postModel.find()
            .then(posts => {
                res.render('admin/liste', {
                    posts
                })
            })
            .catch(dbErr => next(dbErr));
    });

    // Récupération des posts à modifier
    router.get('/admin/liste/modification/:id', (req, res, next) => {
        postModel.findById(req.param.id)
            .then(post => res.render("/admin/creation/modification", {
                posts
            }))
            .catch(dbErr => next(dbErr));
    });

    return router
};