const {sendMessage}= require('../controllers/sendmsg')
const router=require('express').Router()

router.post('/',sendMessage)

module.exports=router