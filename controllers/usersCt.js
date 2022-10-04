  import securePass from '../helpers/pass.js'
  import express from "express"
  import User from '../schemas/userSchemas.js'
  const router = express.Router()
  router.use(express.urlencoded())


    function getRegistrateForm(req, res, next)  {
        res.render('registrate')
    }
    
    async function sendRegistratreForm (req, res, next) {
        const { firstName, lastName, email, userName, pass } = req.body
        const password = await securePass.encrypt(pass);

        const newUser = new User({
            firstName, lastName, email, userName, password
        })
        newUser.save((err)=>{
            if(!err){
                req.session.user = `${firstName} ${lastName}`
                res.redirect('/foro')
            } else{
                console.log(err.message);
            }
        })
    }

//login
async function sendLoginForm(req, res, next) {
 const { userName, pass } = req.body
 const user = await User.find().where({ userName })
 if(!user.length){
    return res.render('loginForm', {message: 'Usuario o contraseña incorrecta'})
 };
 
if(await securePass.decrypt(pass, user[0].password)){
    const usr = {
        id: user[0]._id,
        firstName: user[0].firstName,
        lastName: user[0].lastName,
        userName: user[0].userName
    }

    req.session.user =  `${usr.userName}`
    res.redirect('/foro')
} else return res.render('loginForm', {message: 'Usuario o contraseña incorrecta'})
}

function getLoginForm(req, res) {
    res.render('loginForm')
}

//logout
    function logout(req, res){
            req.session.destroy()
            res.redirect('/')
    }
    
    const usersFunction = {getRegistrateForm, sendRegistratreForm, sendLoginForm, getLoginForm, logout }



export default usersFunction