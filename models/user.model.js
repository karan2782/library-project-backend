const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    role: {
        required: true,
        enum: ["Admin", "Member"],
        default: "Member",
        type: String
    },
    name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        unique: true,
        type: String
    },
    borrowBooks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book"
    }]
})

const User = mongoose.model("User", userSchema)

module.exports = {User}

