var express = require('express');
const req = require('express/lib/request');
var router = express.Router();


const addonController = require('./addon.controller')

router.get('/', addonController.getAddonList)
router.get('/:id', addonController.getAddonDetails)

router.post('/', addonController.addAddon)
router.patch('/:id', addonController.updateAddon)
//router.delete('/:id', productController.deleteEmployee)


module.exports = router;