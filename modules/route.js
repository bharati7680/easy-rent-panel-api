var express = require('express');
var router = express.Router();

//const employeeRouter = require('./employee/employee.route')
const productRouter = require('./products/product.route')
const addonRouter = require('./addon/addon.route')
const authRouter = require('./auth/auth.route')
const authMiddleWare = require('../middlewares/auth.middleware');



router.use('/auth', authRouter)
router.use('/product', productRouter)
router.use('/addon',addonRouter)
//router.use('/employee', authMiddleWare.authCheck, employeeRouter)

module.exports = router;