/*---------SETTINGS------------------------------*/
import mongo from "./config/mongo.js"
import express from "express"
import hbs from "express-handlebars"
import fetch from "node-fetch"
import { engine } from 'express-handlebars';
import usersRt from "./routes/usersRT.js";
import profileRt from "./routes/profileRt.js";
import session from "express-session";
import path from "path";
import User from "./schemas/userSchemas.js";

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
app.use(express.static(path.join('public')));

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


app.post('/foro', auth, (req, res) => {
    res.render('foro', {user: req.session.user.userName, id:req.session.user.id})
})

app.get('/foro', auth, (req, res) => {
    res.render('foro', {user: req.session.user.userName})
})


app.get('/contactanos', (req, res) => {
    res.render('contactanos')
})

app.use('/', usersRt)





















app.listen(PORT, (err) => {
    err ? console.log(`Error: ${err}`)
    :
    console.log(`Server running on http://localhost:${PORT}`)})


