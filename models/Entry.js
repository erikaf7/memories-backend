const mongoose = require('mongoose');

const EntrySchema = new mongoose.Schema({
    title: { type: String, require: true },
    img: { type: String, default: '', require: true },
    description: { type: String },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        refer: 'User',
        required: true,
    }
})

const Entry = mongoose.model('Entry', EntrySchema)

module.exports = Entry;