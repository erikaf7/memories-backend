const mongoose = require('mongoose');

const EntrySchema = new mongoose.Schema({
    title: { type: String, require: true },
    img: { type: String, default: '', require: true },
    description: { type: String },
})

const Entry = mongoose.model('Entry', EntrySchema)

module.exports = Entry;