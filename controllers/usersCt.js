  import securePass from '../helpers/pass.js'
  import express from "express"
  const router = express.Router()
  router.use(express.urlencoded())


    function getRegistrateForm(req, res, next)  {
        res.render('registrate')
    }
    
    async function sendRegistratreForm (req, res, next) {
        const { firstName, lastName, email, password } = req.body
        const hashedPass = await securePass.encrypt(password)
        // console.log(req.body);
        res.json({original: password, encriptada: hashedPass });
    }
    
    const users = {getRegistrateForm, sendRegistratreForm }



export default users