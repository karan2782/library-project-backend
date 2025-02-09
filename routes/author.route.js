const express = require('express')
const { Author } = require('../models/author.model')
require('dotenv').config()

const authorRouter = express.Router()

authorRouter.post("/authors", async(req, res)=>{
    const {name, biography, dateOfBirth, nationality} = req.body 
    try {
        const author = new Author({name, biography, dateOfBirth:new Date(dateOfBirth), nationality})
        await author.save()
        return res.status(201).json({message:"Author created successfully", author})
    } catch (error) {
        res.status(500).json({message:`Error in creating the author ${error}`})
    }
})

authorRouter.get("/authors", async(req, res)=>{
    try {
        const authors = await Author.find()
        res.status(200).json({authors})
    } catch (error) {
        res.status(500).json({message:`Author not found ${error}`})
    }
})


authorRouter.get("/authors/:id", async(req, res)=>{
    const {id} = req.params
    try {
        const author = await Author.findOne({_id:id})
        res.status(200).json({author})
    }catch(error){
        res.status(500).json({message:`Error in founding a author: ${error}`})
    }
})


authorRouter.patch("/authors/:id", async(req, res)=>{
    const {id} = req.params
    const payload = req.body
    try {
        const author = await Author.findByIdAndUpdate({_id:id}, payload)
        res.status(200).json({message:"Author details updated successfully"})
    }catch(error){
        res.status(500).json({message:`Error in updating a author: ${error}`})
    }
})

authorRouter.delete("/authors/:id", async(req, res)=>{
    const {id} = req.params
    try {
        const author = await Author.findByIdAndDelete({_id:id})
        res.status(200).json({message:"Author deleted successfully"})
    }catch(error){
        res.status(500).json({message:`Error in deleting a author: ${error}`})
    }
})




module.exports = {authorRouter}