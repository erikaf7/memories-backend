const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const users = express.Router();
const { createUserToken } = require('../middleware/auth')


// sign up
// POST /signup
users.post('/signup', (req, res, next) => {
    bcrypt
        //hash 10 => number of rounds going code the password
        .hash(req.body.password, 10)
        .then(hash =>
        //return an object with the username and password hashed
        ({
            username: req.body.username,
            password: hash,
        })
        )
        //create user with the username and password hashed
        .then(user => User.create(user))
        //will send the new user object with 201 status
        //but withouth the hashed password
        .then(user => res.status(201).json(user))
        //pass any error aling
        .catch(next);
});

// sign in
// POST /signin
users.post('/signin', (req, res, next) => {
    User.findOne({ username: req.body.username })
        //pass the user to create a user token
        .then(user => createUserToken(req, user))
        //we'll recieve either a error or a toke that we'll send to the client
        .then((token) => res.json({ token }))
        //in case of error our error handle will take care of him
        .catch(next);
});

module.exports = users;