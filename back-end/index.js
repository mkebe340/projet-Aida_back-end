//importing
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')



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
.then (() => {
    console.log ("connecté à mongoDB")
})
// catch les erreurs
.catch ((err) => {
    console.log ("erreur DB");
    console.log(err);
});
//body-parser
const urlencodedParser = bodyParser.urlencoded ({
    extended: true
});
app.use (urlencodedParser);
app.use (bodyParser.json())
// config. des CORS
app.use (function(req, res, next) {
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type"
    );
    res.setHeader("Access-Control-ALlow-Origin","*");
    res.setHeader(
        "Access-COntrol-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});
//middleware


//api routes
app.get('/home', (req, res) => {
    res.send('test home page')
})

/* dashboard routes*/
app.get('/login', (req, res) => {
    res.send('login')
})

app.get('/signup', (req, res) => {
    res.send('signup')
})

app.get('/admin', (req, res) => {
   res.send('admin')
    if(req.isAuthenticated()){
        res.send('admin')
    } else{
        res.send('login')
    }
})

app.get('/logout', (req, res) => {
    console.log('logout')
    res.send('logout')
})
//config. du router
const router = express.Router();
app.use("/admin", router);
require(__dirname + "/controllers/adminController")(router);

//listent
app.listen(port, () => {
    console.log('Server started on port: ' + port);
  });