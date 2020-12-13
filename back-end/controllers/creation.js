const express = require('express');
const multer = require('multer');
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        const { username } = req.body;
        // username_data
        const date = new Date();
        const dateYYYYMMDD = date.toISOString().substring(0, 10);
        console.log('dateYYYYMMDD', dateYYYYMMDD);
        const extension = file.originalname.split('.').pop();
        const filename = `${username}_${dateYYYYMMDD}.${extension}`;
        cb(null, filename);
    }
})

const upload = multer({ storage: storage });


module.exports = function (passport, Posts) {


    router.post('/creation', upload.single('image'), async (req, res) => {
        try {
            const resultat = await Posts.create({
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