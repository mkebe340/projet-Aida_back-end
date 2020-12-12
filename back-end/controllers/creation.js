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


    router.post('/uploads', upload.single('image'), async (req, res) => {
        try {
            const resultat = await Posts.create({
                titre: req.body.titre,
                description: req.body.description,
                texte: req.body.texte,
                imageUrl: `http://localhost:3000/uploads/${req.file.filename}`
            }).exec()
            res.send(resultat);
            console.log (req.file)
        } catch(err) {
            res.status(500).send(err);
        }
    });

    return router
};