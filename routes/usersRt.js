import express from "express" 
const usersRt = express.Router()
import users from '../controllers/usersCt.js'
usersRt.use(express.urlencoded())

usersRt.get('/registrate', users.getRegistrateForm );
usersRt.post('/registrate', users.sendRegistratreForm );




export default usersRt