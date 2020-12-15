const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

// Configuration Mongoose model for user
const schema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true
    }
});

schema.plugin(passportLocalMongoose, { usernameField: 'email' });

const User = new mongoose.model('User', schema);

module.exports = User

