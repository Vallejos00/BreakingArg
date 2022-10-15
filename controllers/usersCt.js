  import securePass from '../helpers/pass.js'
  import express from "express"
  import User from '../schemas/userSchemas.js'
  import transport from '../config/nodemailer.js'
  import nodemailer from "nodemailer"
  const router = express.Router()
  router.use(express.urlencoded())

//muestro formulario de registro
    function getRegistrateForm(req, res, next)  {
        res.render('registrate')
    }
 //proceso formulario de registro
    async function sendRegistratreForm (req, res, next) {
        const { firstName, lastName, email, userName, pass } = req.body
        const password = await securePass.encrypt(pass);

        const newUser = new User({
            firstName, lastName, email, userName, password
        })
        const usr = {
            id: newUser._id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            userName: newUser.userName,
            password: newUser.password,
            email: newUser.email
        }    
        newUser.save((err)=>{
            if(!err){
                req.session.user = usr
                res.redirect('/foro')
            } else{
                console.log(err.message);
            }
        })
    }

//muestro formulario de login
function getLoginForm(req, res) {
    res.render('loginForm')
}


//proceso formulario de login
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
        userName: user[0].userName,
        password: user[0].password,
        email: user[0].email,
    }

    req.session.user =  usr
    res.redirect('/foro')
} else return res.render('loginForm', {message: 'Usuario o contraseña incorrecta'})
}

//muestro datos de perfil
async function getProfile(req, res){
    const user = await User.findById(req.session.user.id).lean()
    res.render('miPerfil', {user})
 }   
//muestro formulario de edit
 async function profileForm(req, res){
    const user = await User.findById(req.session.user.id).lean()
    res.render('editProfile', {user})
   
 }
//proceso formulario de edit
async function editProfile(req, res){
   try{
       await User.findByIdAndUpdate(req.session.user.id, req.body)
       res.redirect('/miPerfil')
   } catch (err) {
       res.render('editProfile')
   }
}

async function getForo(req, res){
    const user = await User.findById(req.session.user.id).lean()
    res.render('foro', {user})
 }



//logout
    function logout(req, res){
            req.session.destroy()
            res.redirect('/')
    }


//mostrar formulario de contacto
async function getContactanos(req, res){
    const user = await User.findById(req.session.user.id).lean()
    res.render('contactanos', {user})
 }   




//enviar contacto
async function contactanos(req, res) {
    

    const { userName, email, msg } = req.body
    const mailMsg = {
    to: 'contacto@breakingarg.com',
    from: email,
    subjet: 'Mensaje desde "contactanos"',
    html: `Contacto de ${userName}: ${msg}`
   }
    
   const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
       user: "3055524f7a3205",
       pass: "64f85d462bc0f7"
     }
     });

   const sendMailStatus = await transport.sendMail(mailMsg)
   let sendMailFeedback = '';
   if (!sendMailStatus.length) {
    sendMailFeedback = 'El mensaje fue enviado correctamente'
  } 
  
  
  res.render('sendedmsg', {message: sendMailFeedback})

}


    
    const usersFunction = {
        getRegistrateForm, 
        sendRegistratreForm, 
        getProfile,
        profileForm,
        editProfile,
        sendLoginForm, 
        getLoginForm, 
        logout,
        contactanos,
        getContactanos,
        getForo
         }



export default usersFunction