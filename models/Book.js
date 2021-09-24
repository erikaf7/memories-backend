const mongoose = require('mongoose');

const BookSchema = new BookSchema({
    title: { type: String, require: true },
    img: { type: String, default: '', require: true },
    description: { type: String}

})

module.exports = mongoose;