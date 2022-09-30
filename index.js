/*---------SETTINGS------------------------------*/
import mongo from "./config/mongo.js"
import express from "express"
import hbs from "express-handlebars"
import fetch from "node-fetch"
import { engine } from 'express-handlebars';
import usersRt from "./routes/usersRT.js";

const PORT = 3000
const app = express()
const url = "https://www.breakingbadapi.com/api/characters"

app.engine('hbs', hbs.engine({ extname: "hbs"}));
app.set('view engine', 'hbs');
app.set('views', './views');
app.use(express.static("public"))

/*-----------------------------------------------------*/

app.get('/', (req, res) => {
    res.render('home')
});

app.get('/foro', (req, res) => {
    res.render('foro')
})

// app.get('/registrate', (req, res) => {
//     res.render('registrate')
// })

app.get('/contactanos', (req, res) => {
    res.render('contactanos')
})

app.use('/', usersRt)




















app.listen(PORT, (err) => {
    err ? console.log(`Error: ${err}`)
    :
    console.log(`Server running on http://localhost:${PORT}`)})