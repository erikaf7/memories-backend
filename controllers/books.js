const express = require('express');
const books = express.Router();

//import database
const Book = require('../models/Book');

//index
books.get('/', (req, res, next) => {
    Book.find({})
    .then(books => res.status(200).send(books))
    .catch(next)
})

//show
books.get('/:id', (req, res, next) => {
    //code here
})

//create
books.post('/', (req, res, next) => {
    //code here
})

//delete
books.delete('/:id', (req, res, next) => {
    //code here
})

//update
books.put('/:id', (req, res, next) => {
    //code here
})

module.exports = books;