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
//middleware


//api routes
app.get('/homepage', (req, res) => {
    res.render('')
})

/* dashboard */
app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/signup', (req, res) => {
    res.render('signup')
})

app.get('/admin', (req, res) => {
   res.render('admin')
    if(req.isAuthenticated()){
        res.render('admin')
    } else{
        res.render('login')
    }
})

app.get('/logout', (req, res) => {
    console.log('logout')
    res.render('logout')
})

//listent

app.listen(port,() => {
    console.log(`Server started on port : ${port}`)
})