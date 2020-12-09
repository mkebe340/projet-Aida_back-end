//importing
const express = require("express");
const exphbs = require("express-handlebars");
const expressSession = require("express-session");
const MongoStore = require("connect-mongo")(expressSession);
const bodyParser = require ("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const cors = require ("cors")

//models
const Admin = require("./schema/adminSchema");
const Posts = require("./schema/postsSchema");


// routes declare

const adminRoute = require('./controllers/auth.js')

//app config
const app = express();
const port = 3000;

//DB config 
const connection_url = "mongodb://localhost:27017/test"

mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
    // afficher quand la DB est connecté
    .then(() => {
        console.log("connecté à mongoDB")
    })
    // catch les erreurs
    .catch((err) => {
        console.log("erreur DB");
        console.log(err);
    });

// express config

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configuration de la session (cookie) pour l'auth
app.use(
    expressSession({
        secret: "aidablogprojetkonexio20",
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({ mongooseConnection: mongoose.connection })
    })
);

// Initialisation de passport pour l'authentification et l'authorization des routes
app.use(passport.initialize());
app.use(passport.session());

//body-parser
const urlencodedParser = bodyParser.urlencoded({
    extended: true
});
app.use(urlencodedParser);
app.use(bodyParser.json())

// config. des CORS
app.use(cors());

//middleware

// authentification avec mail et password
passport.use(new LocalStrategy(async function (username, password, done) {
    try {
        // trouver dans la DB
        const user = await Admin.findOne({ username }).lean().exec();
        if (!user) {
            return done(null, false, { message: 'This user was not found'});
        }
        // password est le même que celui dans la DB
        if (user.password !== password) {
            return done(null, false, { message: 'The password is incorrect'});
        }
        // 3- Si tout est ok, renvoie l'utilisateur
        done(null, user);
    } catch(err) {
        console.log('[Error in local strat]', err)
        done(err);
    }
}));

passport.serializeUser(function(user, done) {
    // J'enregistre l'id mongoose, mais ça aurait très bien pu être un email
    // Il nous faut simplement un attribut unique qui nous permet d'identifier l'utilisateur
    done(null, user._id)
});

passport.deserializeUser(async function(id, done) {
    // Ici je récupère l'id qui a été renseigné dans le serialize user
    try {
        const user = await User.findById(id).exec()
        done(null, user);
    } catch(err) {
        done(err);
    }
});
// exo le bon plan
// declaration de toutes les routes de l'api
// app.use('admin/login', adminRoute(passport, User));
// app.use('/products', productRoute(passport, Product));
// app.use('/profile', profileRoute(passport, Product));
//app.use('/', viewRoute);


// routes hdlbs dashboard 

app.get('admin/login', function (req, res) {
    res.render('admin/login');
});

app.get('/admin/liste', (req, res) => {
    if (req.isAuthenticated()) {
        res.render('admin/liste')
    } else {
        res.render('admin/login')
    }
});

app.get('/admin/creation', (req, res) => {
    if (req.isAuthenticated()) {
        res.render('admin/creation')
    } else {
        res.render('admin/login')
    }
});

app.get('admin/logout', (req, res) => {
    console.log('logout')
    res.redirect('admin/login')
})

//listen
app.listen(port, () => {
    console.log('Server started on port: ' + port);
});