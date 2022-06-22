const Joi =  require('joi') 

function validateUser(req, res, next){
    const schema = Joi.object({
        first_name: Joi.required().messages({"any.required": "first Name is required"}),
        last_name: Joi.required().messages({"any.required": "last name is required",
        }),
        contact: Joi.required(),
        address: Joi.required(),
        email: Joi.required(),
        password: Joi.required()
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
    validateUser
}