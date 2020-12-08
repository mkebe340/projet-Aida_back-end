const User = require ("../../schema/adminSchema.js");
const passwordHash = require ("password-hash");

async function signup (req, res) {
    const {passeword, email} = req.body;
    if (!email || !password) {
        //si absence ou invalidité de mail ou password
        return res.status(400).json ({
            text : "Demande invalide"
        });
    }
// création obijet admin + hash mdp
const admin = {
    email,
    password : passwordHash.generate(password)
};
// on verifie si l'utilisateur existe deja dans la DB
try {
    const findUser = await admin.findOne ({
        email
    });
    if (findUser) {
        return res.status(400).json ({
            text : "cet utilisateur existe déjà"
        })
    }
} catch (error) {
    return res.status(500).json({ error});
}
try {
//enregistrement de l'utilisateur en base de données
const userData = new Admin(user);
const userObject = await userData.save();
return res.tatus (200).json ({
    text: "Connexion OK",
    token: userObject.getToken()
});
} catch (error) {
    return res.status(500).json({error});
}
}
