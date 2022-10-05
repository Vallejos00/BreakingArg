import express from "express" 
const usersRt = express.Router()
import usersFunction from '../controllers/usersCt.js'
usersRt.use(express.urlencoded())

usersRt.get('/registrate', usersFunction.getRegistrateForm );
usersRt.post('/registrate', usersFunction.sendRegistratreForm );
usersRt.post('/loginForm', usersFunction.sendLoginForm);
usersRt.get('/loginForm', usersFunction.getLoginForm);
usersRt.get('/logout', usersFunction.logout);




export default usersRt