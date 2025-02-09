const jwt = require('jsonwebtoken')
require('dotenv').config()

const auth = async(req, res, next) =>{
    if(!req.headers.authorization){
        return res.status(500).json({message:"Token not found"})
    }
    try {
        const token = req.headers.authorization.split(" ")[1]
        const decoded = jwt.decode(token, process.env.SECRET_KEY)
        console.log("token decoded",decoded);
        req.user = decoded.userId
        next()
    } catch (error) {
        return res.status(500).json({message:`Error ${error}`})
    }
}

module.exports = {auth}