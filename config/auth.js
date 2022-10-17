import express from "express" 
import session from "express-session";
const auth = (req, res, next) => {
    if(req.session.user){
       next()
    } else {
       res.render('home', {message: 'No estás logueado'})
    }
}

export default auth