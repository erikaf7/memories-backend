const express = require('express');
const User = require('../models/User');

const users = express.Router();

// sign up
// POST /signup
// users.post('/signup', (req, res, next) => {
//     User.create(req.body)
//         .then((user) => res.status(201).json(user))
//         .catch(())
// });

// sign in 
// POST /signin
users.post('/signin', (req, res, next) => {});

module.exports = users;