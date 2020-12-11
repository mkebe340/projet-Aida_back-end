const mongoose = require('mongoose');

// Configuration Mongoose schema
const postSchema = new mongoose.Schema({

    type: {
        type: String,
        enum: ["publication", "portrait", "association"],
        required: true,
    },
    theme: {
        type: String,
    },
    titre: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        max: 100
    },
    texte: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: [String]
    },
    videoUrl: {
        type: [String]
    },
    podcastUrl: {
        type: [String]
    },
});

const Posts = new mongoose.model('Posts', postSchema);

module.exports = Posts