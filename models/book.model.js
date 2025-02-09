// Book Schema:
// title (String, required)
// ISBN (String, unique, required)
// summary (String)
// publicationDate (Date)
// genres (Array of Strings)
// copiesAvailable (Number, default: 1)
// author (Author reference)
// borrowedBy (Array of User references)

const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    ISBN: { type: String, unique: true, required: true },
    summary: { type: String },
    publicationDate: { type: Date },
    genres: [{ type: String }],
    copiesAvailable: { type: Number, default: 1 },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "Author" },
    borrowedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
})

const Book = mongoose.model("Book", bookSchema)

module.exports = { Book }

