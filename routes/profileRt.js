import express from "express" 
const profileRt = express.Router()
import profileFunction from '../controllers/profileCt.js'
profileRt.use(express.urlencoded())

profileRt.get('/miPerfil', profileFunction.getProfile)
profileRt.get('/miPerfil/editProfile', profileFunction.profileForm)
profileRt.post('/miPerfil/editProfile', profileFunction.editProfile)

export default profileRt