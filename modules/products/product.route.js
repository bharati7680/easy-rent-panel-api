var express = require('express');
var router = express.Router();

const productValidator = require('./product.validator')


const productController = require('./product.controller')

router.get('/', productController.getProductList)
router.get('/:id', productController.getProductDetails)


router.post('/', productValidator.validateProduct, productController.addProduct)
router.patch('/:id', productValidator.validateProduct,  productController.updateProduct)
//router.delete('/:id', productController.deleteEmployee)


module.exports = router;