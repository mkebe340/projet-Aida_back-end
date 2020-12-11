//importing
const express = require("express");
const exphbs = require("express-handlebars");
const expressSession = require("express-session");
const MongoStore = require("connect-mongo")(expressSession);
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const cors = require("cors")

//models
const User = require('./models/user');

// Declare routes
const authRoute = require('./controllers/auth.js')
const viewRoute = require('./controllers/views.js')


//app config
const port = 3000;

//DB config 
const connection_url = "mongodb://localhost:27017/aidaDB"

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

// config. des CORS

const app = express();
// express config
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// session

app.use(
    expressSession({
        secret: "aidablogkonexio20",
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({ mongooseConnection: mongoose.connection })
    })
);

// config passport

app.use(passport.initialize());
app.use(passport.session());

// Strategy pour authentification direct avec email et password
passport.use(new LocalStrategy({
    usernameField: "email",
    passwordField: "password"
}, User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// declaration de toutes les routes de l'api
app.use('/auth', authRoute(passport, User));
app.use('/', viewRoute);

app.listen(port, () => {
    console.log(`Server started on port: ${port}`)
});

