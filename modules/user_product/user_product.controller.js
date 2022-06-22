const knex = require('../../config/knex')
const Joi = require('joi')

async function getUserProductList(req, res) {

    try {
        let userproductList = await knex.select('*').from('UserProduct')
        res.send(userproductList)
    } catch (error) {   
        res.send({
            error: true,
            msg: "Something went wrong"
        })

    }
}

async function addUserProduct(req, res) {

    let charge_per_day = req.body.charge_per_day
    let image_url = req.body.image_url
    let user_id = req.body.user_id
    let product_id = req.body.product_id
    let visibility = req.body.visibility

    let userproduct = {

        charge_per_day: charge_per_day,
        image_url: image_url,
        user_id: user_id,
        product_id,
        visibility: visibility
    }

    let result = await knex('UserProduct').insert(userproduct)

    res.send({result: result})
}

async function updateUserProduct(req, res) {

    let id = parseInt(req.params.id)
    let charge_per_day = req.body.charge_per_day
    let image_url = req.body.image_url
    let user_id = req.body.user_id
    let product_id = req.body.product_id
    let visibility = req.body.visibility


    let userproduct = {
        charge_per_day: charge_per_day,
        image_url: image_url,
        user_id: user_id,
        product_id: product_id,
        visibility: visibility
    }

    let result = await knex('UserProduct').update(userproduct).where("id", id)

    res.send({
        "result": result
    })
}

async function getUserProductDetails(req, res) {
    let id = parseInt(req.params.id)

    let result = await knex('UserProduct').select("*").where("id", id)

    res.send({result: result}) 
}


module.exports = {
    getUserProductList,
    addUserProduct,
    updateUserProduct,
    getUserProductDetails         
}