const knex = require('../../config/knex')
const Joi = require('joi');

async function getAddonList(req, res) {

    try {
        let addonList = await knex.select('*').from('Addons')
        res.send(addonList)
    } catch (error) {   
        res.send({
            error: true,
            msg: "Something went wrong"
        })
    }
}

async function addAddon(req, res) {

    let name = req.body.name
    let charge_per_day = req.body.charge_per_day
    let image_url = req.body.image_url
    let visible = req.body.visible

    let addon = {
        pro_name: name,
        charge_per_day: charge_per_day,
        image_url: image_url,
        visible: visible
    }

    let result = await knex('Addons').insert(addon)

    res.send({result: result})
}

async function updateAddon(req, res) {

    console.log(req.body)

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
    }


    let id = parseInt(req.params.id)
    let name = req.body.name
    let charge_per_day = req.body.charge_per_day
    let image_url = req.body.image_url
    let visible = req.body.visible


    let addon = {
        name: name,
        charge_per_day: charge_per_day,
        image_url: image_url,
        visible: visible
    }

    let result = await knex('Addons').update(addon).where("id", id)

    res.send({
        "result": result
    })
}

async function getAddonDetails(req, res) {
    let id = parseInt(req.params.id)

    let result = await knex('Addons').select("*").where("id", id)

    res.send({result: result})
}

// async function deleteEmployee(req, res) {

//     let id = parseInt(req.params.id)

//     let result = await knex('Employee').delete().where('emp_id', id)

//     res.send({result: result})

// }

module.exports = {
    getAddonList,
    addAddon,
    updateAddon,
    getAddonDetails,
    //deleteEmployee
}