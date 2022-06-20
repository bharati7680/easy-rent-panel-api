const jwt = require('jsonwebtoken')
const config = require('../config/config')

async function authCheck(req, res, next) {

    try {
        const payload = jwt.verify(
            req.headers.token,
            config.JWT_SECRET
        )
        req.user = payload
        next()
    } catch (error) {
        res.send({
            error: true,
            message: "Invalid token"
        })
    }
}

module.exports = {
    authCheck
}