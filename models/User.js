const mongoose = require('mongoose');

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
    {
        timestamps: true,
        toJSON: {
            virtual: true,
            //ret is the returne mongoose doc
            transform: (_doc, ret) => {
                //deleten and keeping the password out of the returned document
                delete ret.password;
                return ret;
            }
        }
    }
)


module.exports = mongoose.model('User', userSchema);