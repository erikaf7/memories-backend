const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


//create secret
const secret = process.env.JWT_SECRET || 'memories';

//create a variable to hold the authenticate method
const requireToken = passport.authenticate('jwt', { session: false });

//validating to create a user token
const createUserToken = (req, user) => {
    //checking if the username is in the database
    if (
        !user || !req.body.passport ||!bcrypt.compareSync(req.body.password, user.password)
    ) {
        //sending a error mensage is one of the conditions is not fulfilled
        const error = new Error('The provider username or password is incorrect');
        error.statusCode = 422;
        throw error;
    }
    //if there is no errors we create and return a token
    return jwt.sign({ id: user._id }, secret, { expiresIn: 40000 });
}

module.exports = { requireToken, createUserToken };