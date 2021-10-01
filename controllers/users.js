const express = require('express');
const User = require('../models/User');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const users = express.Router();
const config = require('../config/database');
// const { createUserToken } = require('../middleware/auth')


// sign up
// POST /signup
users.post('/signup', (req, res, next) => {
    {

        // bcrypt
        //     //hash 10 => number of rounds going code the password
        //     .hash(req.body.password, 10)
        //     .then(hash =>
        //     //return an object with the username and password hashed
        //     ({
            //         username: req.body.username,
            //         password: hash,
            //     })
            //     )
            //     //create user with the username and password hashed
            //     .then(user => User.create(user))
            //     //will send the new user object with 201 status
            //     //but withouth the hashed password
            //     .then(user => res.status(201).json(user))
            //     //pass any error aling
            //     .catch(next);
    }
        let newUser = new User({
          username: req.body.username,
          password: req.body.password
        });

        User.addUser(newUser, (err, user) => {
            if (err) {
              console.error(err);
            res.json({ success: false, msg: 'Failed to register user' });
          } else {
            res.json({ success: true, msg: 'User registered' });
        }
    });
});

// sign in
// POST /signin
users.post('/signin', (req, res, next) => {
    {
        // User.findOne({ username: req.body.username })
        // //pass the user to create a user token
        // .then(user => createUserToken(req, user))
        // //we'll recieve either a error or a toke that we'll send to the client
        // .then((token) => res.json({ token }))
        // //in case of error our error handle will take care of him
        // .catch(next);
    }
        const username = req.body.username;
        const password = req.body.password;

        User.getUserByUsername(username, (err, user) => {
          if (err) throw err;
          if (!user) {
            return res.json({ success: false, msg: 'User not found' });
          }

          User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              const token = jwt.sign({ data: user }, config.secret, {
                expiresIn: 86400 // 24 hours
              });

              res.json({
                success: true,
                token: `Bearer ${token}`,
                user: {
                  id: user._id,
                  username: user.username,
                }
              });
            } else {
              return res.json({ success: false, msg: 'Wrong password' });
            }
        });
    });
});

module.exports = users;