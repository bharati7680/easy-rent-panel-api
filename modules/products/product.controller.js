const knex = require('../../config/knex')
const Joi = require('joi');

async function getProductList(req, res) {

    try {
        let productList = await knex.select('*').from('Products')
        res.send(productList)
    } catch (error) {   
        res.send({
            error: true,
            msg: "Something went wrong"
        })

    }
}

async function addProduct(req, res) {

    let name = req.body.name
    let charge_per_day = req.body.charge_per_day
    let image_url = req.body.image_url
    let visible = req.body.visible

    let product = {
        pro_name: name,
        charge_per_day: charge_per_day,
        image_url: image_url,
        visible: visible
    }

    let result = await knex('Products').insert(product)

    res.send({result: result})
}

async function updateProduct(req, res) {

    console.log(req.body)

   


    let id = parseInt(req.params.id)
    let name = req.body.name
    let charge_per_day = req.body.charge_per_day
    let image_url = req.body.image_url
    let visible = req.body.visible


    let product = {
        name: name,
        charge_per_day: charge_per_day,
        image_url: image_url,
        visible: visible
    }

    let result = await knex('Products').update(product).where("id", id)

    res.send({
        "result": result
    })
}

async function getProductDetails(req, res) {
    let id = parseInt(req.params.id)

    let result = await knex('Products').select("*").where("id", id)

    res.send({result: result})
}

// async function deleteEmployee(req, res) {

//     let id = parseInt(req.params.id)

//     let result = await knex('Employee').delete().where('emp_id', id)

//     res.send({result: result})

// }

module.exports = {
    getProductList,
    addProduct,
    updateProduct,
    getProductDetails,
    //deleteEmployee
}