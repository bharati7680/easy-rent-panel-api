var express = require('express');
var router = express.Router();


const userproductValidator = require('./user_product.validator')

const userproductController = require('./user_product.controller')

router.get('/', userproductController.getUserProductList)
router.get('/:id', userproductController.getUserProductDetails)


router.post('/', userproductValidator.validateUserProduct, userproductController.addUserProduct)
router.patch('/:id', userproductValidator.validateUserProduct,  userproductController.updateUserProduct)



module.exports = router;