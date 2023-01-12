const {create,readAll,read}= require('../controllers/category')
const { authenticateJWT } = require('../middleware/authenticator')

const router=require('express').Router()
// const { signupController,signinController } = require('../controllers/auth')
// const {signupValidator,signinValidator,validatorResult}=require('../middleware/validator')
// router.post('/signup',signupValidator,validatorResult,signupController)
// router.post('/signin',signinValidator,validatorResult,signinController)


router.post('/',authenticateJWT,create)
router.get('/',readAll)
router.get('/:id',read)
module.exports=router