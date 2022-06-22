const knex = require('../../config/knex')
const Joi = require('joi')

async function getUserAddonList(req, res) {

    try {
        let userAddonList = await knex.select('*').from('UserAddon')
        res.send(userAddonList)
    } catch (error) {   
        res.send({
            error: true,
            msg: "Something went wrong"
        })

    }
}

async function addUserAddon(req, res) {

    let charge_per_day = req.body.charge_per_day
    let image_url = req.body.image_url
    let user_id = req.body.user_id
    let product_id = req.body.product_id
    let visibility = req.body.visibility

    let useraddon = {

        charge_per_day: charge_per_day,
        image_url: image_url,
        user_id: user_id,
        product_id,
        visibility: visibility
    }

    let result = await knex('UserAddon').insert(useraddon)

    res.send({result: result})
}

async function updateUserAddon(req, res) {

    let id = parseInt(req.params.id)
    let charge_per_day = req.body.charge_per_day
    let image_url = req.body.image_url
    let user_id = req.body.user_id
    let product_id = req.body.product_id
    let visibility = req.body.visibility


    let useraddon = {
        charge_per_day: charge_per_day,
        image_url: image_url,
        user_id: user_id,
        product_id: product_id,
        visibility: visibility
    }

    let result = await knex('UserAddon').update(useraddon).where("id", id)

    res.send({
        "result": result
    })
}

async function getUserAddonDetails(req, res) {
    let id = parseInt(req.params.id)

    let result = await knex('UserAddon').select("*").where("id", id)

    res.send({result: result})
}


module.exports = {
    getUserAddonList,
    addUserAddon,
    updateUserAddon,
    getUserAddonDetails         
}