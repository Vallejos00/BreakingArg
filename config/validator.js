import validator from "express-validator"
import User from '../schemas/userSchemas.js'
const { body, validationResult } = validator 

const validationRules = [
    body('firstName').notEmpty(),
    body('lastName').notEmpty(),
    body('email').notEmpty(),
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

export default validationRules;