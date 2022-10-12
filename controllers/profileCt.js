import express from "express"
import User from "../schemas/userSchemas.js"

const router = express.Router()
router.use(express.urlencoded())

 async function getProfile(req, res){
    const user = await User.findById(req.session.user.id).lean()
    res.render('miPerfil', {user})
 }   
//muestro formulario
 async function profileForm(req, res){
    const user = await User.findById(req.session.user.id).lean()
    res.render('editProfile', {user})
   
 }
//proceso formulario
async function editProfile(req, res){
   try{
       await User.findByIdAndUpdate(req.session.user.id, req.body)
       res.redirect('/foro/miPerfil')
   } catch (err) {
       res.render('editProfile')
   }
}

// async function newProfile(req, res){
//    const user = await User.findById(req.session.user.id).lean()
//    res.render('foro', {user})
//  }




 const profileFunction = {
    getProfile,
    profileForm,
    editProfile,
    
 }

 export default profileFunction