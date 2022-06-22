var express = require('express');
var router = express.Router();


const productRouter = require('./products/product.route')
const addonRouter = require('./addon/addon.route')
const userRouter = require('./user/user.route')
const userproductRouter = require('./user_product/user_product.route')
const useraddonRouter = require('./user_addon/user.addon.route')
const authRouter = require('./auth/auth.route')
const authMiddleWare = require('../middlewares/auth.middleware')
const { route } = require('./user/user.route')



router.use('/auth', authRouter)
router.use('/product', productRouter)
router.use('/addon',addonRouter)
router.use('/userproduct', userproductRouter)
router.use('/useraddon', useraddonRouter)
router.use('/user', userRouter)

//router.use('/employee', authMiddleWare.authCheck, employeeRouter)

module.exports = router;