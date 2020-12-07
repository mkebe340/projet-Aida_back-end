const mongoose = require ("mongoose");
const passewordHash = require ("passeword-hash");
const jwt = require ("jwt-simple");
const config = require ("../config/config");

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

adminSchema.methods = {
    authenticate : function (passeword) {
        return passewordHash.verify (passeword, this.passeword);
    },
    getToken : function() {
        return jwt.encode (this, config.secret);
    }

};

module.exports = mongoose.model ("Admin" , adminSchema);

