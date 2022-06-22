const Joi =  require('joi') 

function validateUserAddon(req, res, next){
    const schema = Joi.object({
        id: Joi.required().messages({"any.required": "id is required"}),
        charge_per_day: Joi.number().required().messages({
            "any.required": "user_product charges is required",
            "number.base": "user_product charges must be number"
        }),
        image_url: Joi.required(),
        user_id: Joi.required(),
        product_id: Joi.required(),
        visibility: Joi.required()
    })

    let validationResult = schema.validate(req.body)
    
    if(validationResult.error) {
        let message = validationResult.error.details[0].message
        res.send({
            error: true,
            message: message
        })
        return
    } else {
        next()
    }
}

module.exports = {
    validateUserAddon
}