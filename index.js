/*---------SETTINGS------------------------------*/
import mongo from "./config/mongo.js"
import express from "express"
import hbs from "express-handlebars"
import fetch from "node-fetch"
import { engine } from 'express-handlebars';
import usersRt from "./routes/usersRT.js";
import session from "express-session";

const PORT = 3000
const app = express()
const url = "https://www.breakingbadapi.com/api/characters"

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}))

app.engine('hbs', hbs.engine({ extname: "hbs"}));
app.set('view engine', 'hbs');
app.set('views', './views');
app.use(express.static("public"))

/*-----------------------------------------------------*/

app.get('/', (req, res) => {
    res.render('home', {user: req.session.user})
});

const auth = (req, res, next) => {
     if(req.session.user){
        next()
     } else {
        res.render('home', {message: 'No estás logueado'})
     }
}

app.get('/miPerfil', auth, (req, res) => {
    res.render('miPerfil', {usr})
})

app.post('/foro', auth, (req, res) => {
    res.render('foro', {user: req.session.user})
})

app.get('/foro', auth, (req, res) => {
    res.render('foro', {user: req.session.user})
})

app.get('/contactanos', (req, res) => {
    res.render('contactanos')
})

app.use('/', usersRt)




















app.listen(PORT, (err) => {
    err ? console.log(`Error: ${err}`)
    :
    console.log(`Server running on http://localhost:${PORT}`)})


