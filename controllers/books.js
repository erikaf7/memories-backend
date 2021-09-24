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
    Book.findById(req.params.id)
        .then(foundBook => res.status(200).send(foundBook))
        .catch(next)
})

//create
books.post('/', (req, res, next) => {
    Book.create(req.body)
        .then(book => res.status(200).send(book))
        .catch(next);
})

//delete
books.delete('/:id', (req, res, next) => {
    Book.findOneAndDelete(
        { _id: req.params.id },
    )
        .then(deletedBook => res.status(200).send(deletedBook))
        .catch(next)
})

//update
books.put('/:id', (req, res, next) => {
    Book.findOneAndUpdate(
        { _id: req.params.id },
        req.body, 
        { new: true }
    )
        .then(updatedBook => res.status(200).send(updatedBook))
        .catch(next)
})

module.exports = books;