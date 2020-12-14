const express = require('express');
const router = express.Router();
const uploader = require('../config/fileUploader')

router.get('/articles', (req, res, next) => {
    res.render('liste');
})