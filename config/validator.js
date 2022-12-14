import validator from "express-validator"
import User from '../schemas/userSchemas.js'
const { body, validationResult } = validator 

const validationRulesEdit = [
    body('firstName').notEmpty().withMessage('*Este campo no puede quedar vacío*')
    .isLength({min: 3, max: 15}).withMessage('*Su nombre debe tener entre 3 y 15 carácteres*'),
    body('lastName').notEmpty().withMessage('*Este campo no puede quedar vacío*')
    .isLength({min: 2, max: 15}).withMessage('*Su apellido debe tener entre 2 y 15 carácteres*'),
    body('email').notEmpty().isEmail().withMessage('*Ingrese un mail válido*'),
    body('userName').notEmpty().withMessage('*Este campo no puede quedar vacío*'),

   async (req, res, next) => {
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            const arrWarnings = errors.array()
            console.log(arrWarnings);

const firstNameError = arrWarnings.find(firstNameError => firstNameError.param ==='firstName')
const lastNameError = arrWarnings.find(lastNameError => lastNameError.param ==='lastName')
const emailError = arrWarnings.find(emailError => emailError.param === 'email')
const userNameError = arrWarnings.find(userNameError => userNameError.param ==='userName')



            const user = req.body
            res.render('editProfile', {user, arrWarnings, firstNameError, lastNameError, emailError, userNameError })
        } 
        else return next()
    }
]


const validationRulesRegister = [
    body('firstName').notEmpty().withMessage('*Este campo no puede quedar vacío*')
    .isLength({min: 3, max: 15}).withMessage('*Su nombre debe tener entre 3 y 15 carácteres*'),
    body('lastName').notEmpty().withMessage('*Este campo no puede quedar vacío*')
    .isLength({min: 2, max: 15}).withMessage('*Su apellido debe tener entre 2 y 15 carácteres*'),
    body('email').notEmpty().withMessage('*Este campo no puede quedar vacío*')
    .isEmail().withMessage('*Ingrese un mail válido*'),
    body('userName').notEmpty().withMessage('*Este campo no puede quedar vacío*'),
    body('pass').notEmpty().withMessage('*Este campo no puede quedar vacío*')
    .isLength({min: 5, max: 15}).withMessage('*Su contraseña debe tener entre 5 y 15 carácteres*'),

   async (req, res, next) => {
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            const arrWarnings = errors.array()
            console.log(arrWarnings);

const firstNameError = arrWarnings.find(firstNameError => firstNameError.param ==='firstName')
const lastNameError = arrWarnings.find(lastNameError => lastNameError.param ==='lastName')
const emailError = arrWarnings.find(emailError => emailError.param === 'email')
const userNameError = arrWarnings.find(userNameError => userNameError.param ==='userName')
const passError = arrWarnings.find(passError => passError.param ==='pass')



            const user = req.body
            res.render('registrate', {user, arrWarnings, firstNameError, lastNameError, emailError, userNameError, passError })
        } 
        else return next()
}
]

export { validationRulesEdit, validationRulesRegister }