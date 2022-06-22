const knex = require('../../config/knex')
const Joi = require('joi')

async function getUserList(req, res) {

    try {
        let userList = await knex.select('*').from('Users')
        res.send(userList)
    } catch (error) {   
        res.send({
            error: true,
            msg: "Something went wrong"
        })

    }
}

async function updateUser(req, res) {

    let id = parseInt(req.params.id)
    let first_name = req.body.first_name
    let last_name = req.body.last_name
    let contact = req.body.contact
    let address = req.body.address
    let email = req.body.email
    let password = req.body.password


    let user = {
       first_name: first_name,
       last_name: last_name,
       contact: contact,
       address: address,
       email: email,
       password: password

    }

    let result = await knex('Users').update(user).where("id", id)

    res.send({
        "result": result
    })
}

async function getUserDetails(req, res) {
    let id = parseInt(req.params.id)

    let result = await knex('Users').select("*").where("id", id)

    res.send({result: result})
}

module.exports = {
    getUserList,
    updateUser,
    getUserDetails
}