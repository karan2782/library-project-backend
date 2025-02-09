const express = require('express')
const { Book } = require('../models/book.model')
require("dotenv").config()


const bookRouter = express.Router()


bookRouter.post("/books", async(req, res)=>{
    const {title, ISBN, summary, publicationDate, genres, copiesAvailable, author} = req.body
    try {
        const book = new Book({title, ISBN, summary, publicationDate: new Date(publicationDate), genres, copiesAvailable, author})
        await book.save()
        res.status(201).json({message:"Book created successfully", book})
    } catch (error) {
        res.status(500).json({message:`Error in creating the book: ${error}`})
    }
})


bookRouter.get("/books", async(req, res)=>{
    try {
        const books = await Book.find()
        res.status(200).json({books})
    } catch (error) {
        res.status(500).json({message:`Error in fetching books: ${error}`})
    }
})

bookRouter.get("/books/:id", async(req, res)=>{
    const {id} = req.params
    try {
        const book = await Book.findOne({_id:id})
        res.status(200).json({book})
    } catch (error) {
     res.status(500).json({message:`Error in fetching the book ${error}`})   
    }
})

bookRouter.patch("/books/:id", async(req, res)=>{
    const {id} = req.params
    const payload = req.body
    try {
        const book = await Book.findByIdAndUpdate({_id:id}, payload)
        res.status(200).json({message:"Book updated successfully"})
    } catch (error) {
     res.status(500).json({message:`Error in updating the book ${error}`})   
    }
})

bookRouter.delete("/books/:id", async(req, res)=>{
    const {id} = req.params
    try {
        const book = await Book.findByIdAndDelete({_id:id})
        res.status(200).json({message:"Book deleted successfully"})
    } catch (error) {
     res.status(500).json({message:`Error in deleting the book ${error}`})   
    }
})
module.exports = {bookRouter}