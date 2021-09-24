const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: { type: String, require: true },
    img: { type: String, default: '', require: true },
    description: { type: String },
})

const Book = mongoose.model('Book', BookSchema)

module.exports = Book;