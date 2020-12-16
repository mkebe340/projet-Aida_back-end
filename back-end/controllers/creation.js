const express = require('express');
const multer = require('multer');
const router = express.Router();


const uploader = require('../config/fileUploader.js');


module.exports = function (passport, Posts) {

    router.get('/admin/liste', async (req, res, next) => {
        console.log("TEST admin liste")
        try {
            const posts = await Posts.find({}).lean().exec()
            console.log("liste")
            res.render('admin/liste', {
                posts,
                isAuthenticated: req.isAuthenticated(),
                username: req.isAuthenticated() ? req.user.username : null
            })
        } catch (err) {
            console.log("error :", err)

            res.status(500).send(err)
        }

    })


    router.post('/admin/creation', uploader.single('image'), async (req, res) => {
        try {
            console.log(req.file)
            const resultat = await Posts.create({
                type: req.body.type,
                titre: req.body.titre,
                description: req.body.description,
                texte: req.body.texte,
                imageUrl: req.file.path
            }).exec()
            res.send(resultat);
        
        } catch (err) {
            res.status(500).send(err);

        }
    });


    return router
};