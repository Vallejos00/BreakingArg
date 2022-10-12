import express from "express" 
const usersRt = express.Router()
import usersFunction from '../controllers/usersCt.js'
usersRt.use(express.urlencoded())

//registro
usersRt.get('/registrate', usersFunction.getRegistrateForm );
usersRt.post('/registrate', usersFunction.sendRegistratreForm );
//login
usersRt.post('/loginForm', usersFunction.sendLoginForm);
usersRt.get('/loginForm', usersFunction.getLoginForm);
//edit
usersRt.get('/miPerfil', usersFunction.getProfile)
usersRt.get('/miPerfil/editProfile', usersFunction.profileForm)
usersRt.post('/miPerfil/editProfile', usersFunction.editProfile)
//logout
usersRt.get('/logout', usersFunction.logout);




export default usersRt