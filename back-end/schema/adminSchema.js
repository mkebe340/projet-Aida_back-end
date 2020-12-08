// import des modules
const mongoose = require ("mongoose");
const passewordHash = require ("passeword-hash");
const jwt = require ("jwt-simple");
const config = require ("../config/config");
// schema admin mongoose
const adminSchema = mongoose.schema ({
    email : {
        type : String,
        lowercase : true,
        trim : true,
        unique : true,
        required : true
    },

    passeword : {
        type : String, 
        required : true
    }
},
    {
        timestamps : { createdAt : "created_at"}
    }
);
// associer chaque objet avec les methodes "authenticate" et "getToken" 
// --> permet de verifier le mdp + genère un jeton d'accès à partir du secret dans config.js
adminSchema.methods = {
    authenticate : function (passeword) {
        return passewordHash.verify (passeword, this.passeword);
    },
    getToken : function() {
        return jwt.encode (this, config.secret);
    }

};
//export
module.exports = mongoose.model ("Admin" , adminSchema)

