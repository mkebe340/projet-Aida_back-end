const Admin = require("../../schema/adminSchema.js");
const passwordHash = require("password-hash");

async function login(req, res) {
    const { password, email } = req.body;
    if (!email || !password) {
        //si absence ou invalidité de mail ou password
        return res.status(400).json({
            text: "Demande invalide"
        });
    }
    // on verifie si l'utilisateur existe dans la DB
    try {
        const findUser = await Admin.findOne({ email });

        if (!findUser)
            return res.status(400).json({
                text: "identifiant incorrect"
            });

        if (!findUser.authenticate(password))
            return res.status(401).json({
                text: "mot de passe incorrect"
            });


        return res.status(200).json({
            token: findUser.getToken(),
            text: "Authentification OK",
        });

    } catch (error) {
        return res.status(500).json({ error });

    }
}

