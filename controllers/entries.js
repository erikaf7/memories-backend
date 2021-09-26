const express = require('express');
const entries = express.Router();

//import database
const Entry = require('../models/Entry');

//index
entries.get('/', (req, res, next) => {
    Entry.find({})
        .then(entries => res.status(200).send(entries))
        .catch(next)
})

//show
entries.get('/:id', (req, res, next) => {
    Entry.findById(req.params.id)
        .then(foundEntry => res.status(200).send(foundEntry))
        .catch(next)
})

//create
entries.post('/', (req, res, next) => {
    Entry.create(req.body)
        .then(entry => res.status(200).send(entry))
        .catch(next);
})

//delete
entries.delete('/:id', (req, res, next) => {
    Entry.findOneAndDelete(
        { _id: req.params.id },
    )
        .then(deletedEntry => res.status(200).send(deletedEntry))
        .catch(next)
})

//update
entries.put('/:id', (req, res, next) => {
    Entry.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
    )
        .then(updatedEntry => res.status(200).send(updatedEntry))
        .catch(next)
})

module.exports = entries;