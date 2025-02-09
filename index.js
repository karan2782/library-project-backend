const express = require('express')
const { connection } = require('./config/connection')
const { userRouter } = require('./routes/user.route')
const { authorRouter } = require('./routes/author.route')
const { bookRouter } = require('./routes/book.route')
require('dotenv').config()


const app = express()

app.use(express.json())

app.use("/api/auth", userRouter)
app.use("/api", authorRouter)
app.use("/api", bookRouter)

app.get("/", (req, res) => {
    res.send("Hello, I am a home")
})

app.listen(process.env.PORT, () => {
    connection()
    console.log(`Server is running on port: ${process.env.PORT}`)
})


