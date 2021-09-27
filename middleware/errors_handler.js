const mongoose = require('mongoose');


class BadParamsError extends Error {
    constructor() {
        super();
        this.name = 'BadParamsError';
        this.statusCode = 422;
        this.message = 'A required parameter was omitted or invalid'
    }
}

class InvalidIdError extends Error {
    constructor() {
        super();
        this.name = 'InvalidError';
        this.statusCode = 422;
        this.message = 'Invalid id';
    }
}



const handleValidateId = (req, res, next) => {
    const validID = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!validID) {
        throw new DocumentNotFoundError();
    } else {
        next();
    }
}

const handleValidationErrors = (error, req, res, next) => {
    if (error.name.match(/Valid/) || error.name === 'MongoError') {
        throw new BadParamsError();
    } else {
        next(error);
    }
}

const handleErrors = ((error, req, res, res) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal Server Error';
    res.status(statusCode).send(message);
});

module.exports = {
    handleValidateId,
    handleValidationErrors,
    handleErrors,

}