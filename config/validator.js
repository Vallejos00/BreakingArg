import validator from "express-validator"
import User from '../schemas/userSchemas.js'
const { body, validationResult } = validator 

const validationRulesEdit = [
    body('firstName').notEmpty(),
    body('lastName').notEmpty(),
    body('email').notEmpty().isEmail().withMessage('*Ingrese un mail válido*'),
    body('userName').notEmpty(),

   async (req, res, next) => {
        const errors = validationResult(req)
        
        if(!errors.isEmpty()){
            const user = await User.findById(req.session.user.id).lean()
           
            console.log(errors);
            res.render('editProfile', {user, gralMessage:'*No puede quedar ningún campo vacío*'})
        } else return next()
    }
]


const validationRulesRegister = [
    body('firstName').notEmpty(),
    body('lastName').notEmpty(),
    body('email').notEmpty(),
    body('userName').notEmpty(),
    body('pass').notEmpty(),

   async (req, res, next) => {
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            
            console.log(errors);
            res.render('registrate', { req, gralMessage:'*No puede quedar ningún campo vacío*'})
        } else return next()
    }
]

export { validationRulesEdit, validationRulesRegister }