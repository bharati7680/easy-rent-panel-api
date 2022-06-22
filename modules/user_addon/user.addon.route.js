var express = require('express');
var router = express.Router();


const userAddonValidator = require('./user_addon.validator')

const userAddonController = require('./user_addon.controller')

router.get('/', userAddonController.getUserAddonList)
router.get('/:id', userAddonController.getUserAddonDetails)


router.post('/', userAddonValidator.validateUserAddon, userAddonController.addUserAddon)
router.patch('/:id', userAddonValidator.validateUserAddon,  userAddonController.updateUserAddon)



module.exports = router;