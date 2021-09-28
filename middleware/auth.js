const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//create secret
const secret = process.env.JWT_SECRET || 'memories';

//requiere strategy
const { Strategy, ExtractJwt } = require('passport-jwt');


//required options fot passport
const options = {
    //sening as a bearer token
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    //store the secrect
    secrectOrKey: secret,
}

//User model
const User = require('../models/User')

//strategy
const strategy = new Strategy(options, function (jwt_payload, done) {
    //extracted data from token
    User.findById(jwt_payload.id)
        //pass the user doc from mongoose using done
        .then((user) => done(null, user))
        //handke the error if exist using also done
        .catch((err) => done(err));
})

//registering passport using the created strategy
passport.use(strategy);

//initialize the passport
passport.initialize();

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
}

module.exports = { requireToken, createUserToken };