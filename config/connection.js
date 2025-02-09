const mongoose = require('mongoose')
require('dotenv').config()

const connection = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected to db successfully");
        
    } catch (error) {
        console.log(`Error in connected to db : ${error}`);
        
    }
}

module.exports = {connection}