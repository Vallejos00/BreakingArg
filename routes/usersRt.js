import express from "express" 
const usersRt = express.Router()
import usersFunction from '../controllers/usersCt.js'
import auth from '../config/auth.js'
import validationRules from '../config/validator.js'
usersRt.use(express.urlencoded())

//registro
usersRt.get('/registrate', usersFunction.getRegistrateForm );
usersRt.post('/registrate', usersFunction.sendRegistratreForm );
//login
usersRt.post('/loginForm', usersFunction.sendLoginForm);
usersRt.get('/loginForm', usersFunction.getLoginForm);
//foro
usersRt.get('/foro', auth, usersFunction.getForo)

//edit
usersRt.get('/miPerfil', auth, usersFunction.getProfile)
usersRt.get('/miPerfil/editProfile', auth, usersFunction.profileForm)
usersRt.post('/miPerfil/editProfile', validationRules, usersFunction.editProfile)
//delete
usersRt.post('/miPerfil/delete', auth, usersFunction.deleteUser)
//contactanos
usersRt.get('/contactanos', auth, usersFunction.getContactanos)
usersRt.post('/contactanos', auth, usersFunction.contactanos)
//logout
usersRt.get('/logout', usersFunction.logout);




export default usersRt