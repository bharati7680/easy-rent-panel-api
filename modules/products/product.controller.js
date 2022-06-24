const knex = require('../../config/knex')
const Joi = require('joi');

async function getProductList(req, res) {

    try {
        let productList = await knex.select('*').from('Products')

        const resData = {
            msg: "",
            data: {
                product: productList
            }
        }
    
        res.send(resData)

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

    try {
        let result = await knex('Products').insert(product)

        const resData = {
            msg: "Product added successfully",
            data: {
                product: result
            }
        }
    
        res.send(resData)

    } catch (error) {   
        res.send({
            error: true,
            msg: "Something went wrong"
        })

    }

}

async function updateProduct(req, res) {

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

    try{
        let result = await knex('Products').update(product).where("id", id)

        const resData = {
            msg: "Product updated successfully",
            data: {
                product: result
            }
        }
    
        res.send(resData)

    } catch (error) {   
        res.send({
            error: true,
            msg: "Something went wrong"
        })

    }

    }

async function getProductDetails(req, res) {
    let id = parseInt(req.params.id)

    try{

    let result = await knex('Products').select("*").where("id", id).first()

    const resData = {
        msg: "",
        data: {
            product: result
        }
    } 
    res.send(resData)

    } catch (error) {   
        res.send({
            error: true,
            msg: "Something went wrong"
        })

}
    
}

async function addProductAddonMapping(req, res) {
    
    let product_id = req.params.id
    let addon_id = req.body.addon_id
    

    let productaddonmapping = {
    
        product_id: product_id,
        addon_id: addon_id
    }   

    let existingMapping = await knex('AddonProductMapping').select("*").where("product_id", product_id).andWhere("addon_id", addon_id).first()

    if (existingMapping){
        res.status(400).send({
            msg:"addon is already mapped"
        })
        return;
    }

    let result = await knex('AddonProductMapping').insert(productaddonmapping)

    res.send({result: result})

}





async function deleteAddonProductMapping(req, res) {

    let product_id = parseInt(req.params.id)

    let addon_id = req.body.addon_id



    let result = await knex('AddonProductMapping').delete().where('product_id', product_id).andWhere("addon_id", addon_id)

    res.send({result: result})

}

module.exports = {
    getProductList,
    addProduct,
    updateProduct,
    getProductDetails,
    addProductAddonMapping,  
    deleteAddonProductMapping
}