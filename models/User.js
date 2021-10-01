const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database')


const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
    },

    // {
    //     timestamps: true,
    //     toJSON: {
    //         virtual: true,
    //         //ret is the returne mongoose doc
    //         transform: (_doc, ret) => {
    //             //deleten and keeping the password out of the returned document
    //             delete ret.password;
    //             return ret;
    //         }
    //     }
    // }
)

const User = module.exports = mongoose.model('User', userSchema);


module.exports.getUserById = function (id, callback) {
    User.findById(id,callback);
}

module.exports.getUserByUsername = function (username, callback) {
    const query = { username: username };
    User.findOne(query, callback);
}

module.exports.addUser = function (newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    })
}

module.exports.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) throw err
        callback(null, isMatch);
    })
}