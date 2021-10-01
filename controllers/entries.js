const express = require('express');
const entries = express.Router();

//import database
const Entry = require('../models/Entry');

//requiere middleware
const { handleValidateId, handleRecordExists, handleValidateOwnership } = require('../middleware/errors_handler');
const { requireToken } = require('../middleware/auth');

//index
entries.get('/', handleValidateId, (req, res, next) => {
    Entry.find({})
        .populate('owner', 'username -_id')
        .then(entries => res.status(200).send(entries))
        .catch(next)
})

//show
entries.get('/:id', handleValidateId, (req, res, next) => {
    Entry.findById(req.params.id)
        .populate('owner')
        .then(foundEntry => res.status(200).send(foundEntry))
        .catch(next)
})

//create
entries.post('/', requireToken, (req, res, next) => {
    Entry.create({...req.body, owner: req.user._id })
        .then((entry) => res.status(200).send(entry))
        .catch(next);
})

//delete
entries.delete('/:id', handleValidateId, (req, res, next) => {
    Entry.findById(req.params.id)
        .then(handleRecordExists)
        .then((entry) => handleValidateOwnership(req, job))
        .then((job) => job.remove())
        .then(()  => {res.sendStatus(204) })
        .catch(next)
})

//update
entries.put('/:id', handleValidateId,(req, res, next) => {
    Entry.findById(req.params.id)
        .then(handleRecordExists)
        .then((entry) => handleValidateOwnership(req, entry))
        .then((entry) => entry.set(req.body).save())
        .then((entry) => { res.json(entry) })
        .catch(next)
})

module.exports = entries;