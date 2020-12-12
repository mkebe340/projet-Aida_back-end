const cloudinary = require('cloudinary');
const multer = require('multer');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});
const storage = cloudinaryStorage({
    cloudinary,
    folder: 'aidaBlog'
    
});
const fileUploader = multer({
    storage
});

module.exports = fileUploader;