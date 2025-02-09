const express = require('express')
const bcrypt = require('bcrypt')
const { User } = require('../models/user.model')
const jwt = require('jsonwebtoken')
const { auth } = require('../middleware/auth.middleware')
const { role } = require('../middleware/role.middleware')
require('dotenv').config()

const userRouter = express.Router()

userRouter.post("/register", async (req, res) => {
    const { username, password, role, name, email } = req.body
    try {
        bcrypt.hash(password, 3, async (err, hashed) => {
            if (err) {
                return res.status(500).json({ message: `Error in hashing the password ${err}` })
            }
            const user = new User({ username, password: hashed, role, name, email })
            await user.save()
            return res.status(201).json({ message: "User created successfully", user })
        })
    } catch (error) {
        return res.status(500).json({ message: `Error in creating the user: ${error}` })
    }
})

userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email: email })
        if (!user) { return res.status(500).json({ message: "User not found, Please register!" }) }

        bcrypt.compare(password, user.password, (err, result) => {
            if(err){
                return res.status(500).json({message:`Wrong password: ${err}`})
            }

            const token = jwt.sign({userId:user._id}, process.env.SECRET_KEY) 
            res.status(200).json({message:"User logged in successfully", token})

        })
    } catch (error) {
        res.status(500).json({message:`Error in login ${error}`})
    }
})

userRouter.get("/users" ,auth, role , async(req, res)=>{
    try {
        const users = await User.find()
        return res.status(200).json({users})
    } catch (error) {
        res.status(500).json({message:`Error in fetching users: ${error}`})
    }
})


userRouter.get("/users/:id", auth, async(req, res)=>{
    const {id} = req.params     
    try {
        const user = await User.findOne({_id:id})
        res.status(200).json({user})
    } catch (error) {
        res.status(500).json({message:`User not found: ${error}`})
    }
})


userRouter.patch("/users/:id", auth, async(req, res)=>{
    const {id} = req.params
    const payload = req.body     
    try {
        const user = await User.findByIdAndUpdate({_id:id}, payload)
        res.status(200).json({message:"User updated successfully"})
    } catch (error) {
        res.status(500).json({message:`User not updated: ${error}`})
    }
})

userRouter.delete("/users/:id", auth, async(req, res)=>{
    const {id} = req.params 
    try {
        const user = await User.findByIdAndDelete({_id:id})
        res.status(200).json({message:"User deleted successfully"})
    } catch (error) {
        res.status(500).json({message:`User not deleted: ${error}`})
    }
})



module.exports = { userRouter }