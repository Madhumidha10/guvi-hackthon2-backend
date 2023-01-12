 const {createOrder}=require('../controllers/order')

const router=require("express").Router()

router.route('/order/new').post(createOrder)


module.exports=router