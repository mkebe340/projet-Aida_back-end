const express = require('express');
const multer = require('multer');
const router = express.Router();

<<<<<<< HEAD

const uploader = require ('../config/fileUploader.js');
=======
>>>>>>> c2dc6a147b0369498954bac207a9360ad5d219be

const uploader = require ('../config/fileUploader.js');


<<<<<<< HEAD
=======
module.exports = function (passport, Posts) {

>>>>>>> c2dc6a147b0369498954bac207a9360ad5d219be
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
