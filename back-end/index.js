//importing
const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');




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
//body-parser
const urlencodedParser = bodyParser.urlencoded({
    extended: true
});
app.use(urlencodedParser);
app.use(bodyParser.json())

// config. des CORS
app.use(cors);

//middleware

// routes hdlbs dashboard 

app.engine('handlebars', exphbs({
    defaultLayout: false,
    layoutsDir: __dirname + "views"
}));

app.use(express.static('public'))

app.set('view engine', 'handlebars');

app.get('/login', function (req, res) {
    res.render('login');
});

app.get('/posts/liste', (req, res) => {
    res.render('posts/liste')
    if (req.isAuthenticated()) {
        res.render('posts/liste')
    } else {
        res.render('login')
    }
});

app.get('/posts/creation', (req, res) => {
    res.render('posts/creation')
    if (req.isAuthenticated()) {
        res.render('posts/creation')
    } else {
        res.render('login')
    }
});

app.get('/logout', (req, res) => {
    console.log('logout')
    res.redirect('login')
})
//config. du router
const router = express.Router();
app.use("/admin", router);
require(__dirname + "/controllers/adminController")(router);

//listen
app.listen(port, () => {
    console.log('Server started on port: ' + port);
});