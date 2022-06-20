const Joi =  require('joi') 

function validateProduct(req, res, next){
    const schema = Joi.object({
        name: Joi.required().messages({"any.required": "Name is required"}),
        charge_per_day: Joi.number().required().messages({
            "any.required": "product charges is required",
            "number.base": "product charges must be number"
        }),
        image_url: Joi.required(),
        visible: Joi.required()
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
    validateProduct
}