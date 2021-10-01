const mongoose = require('mongoose');

class OwnershipError extends Error {
    constructor() {
        super();
        this.name = 'ownerShipError';
        this.statusCode = 401;
        this.message = 'The token provided does not match our records'
    }
}


class BadParamsError extends Error {
    constructor() {
        super();
        this.name = 'BadParamsError';
        this.statusCode = 422;
        this.message = 'A required parameter was omitted or invalid'
    }
}

class BadCredentialsError extends Error {
    constructor() {
        super();
        this.name = 'BadCredentialsError'
        this.statusCode = 422;
        this.message = 'The provided username or password is incorrect';
    }
}

class DocumentNotFoundError extends Error {
    constructor() {
        super();
        this.name = 'DocumentNotFoundError';
        this.statusCode = 404;
        this.message = 'There is no documents related to the ID provided'
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

const handleValidateOwnership = (req, document) => {
    const ownerId = document.owner._id || document.owner;
    //check if the current user is also the owner ofthe document
    if (!req.user._id.equals(ownerId)) {
        throw new OwnerShipError()
    } else {
        return document;
    }
}

const handleRecordExists = (record) => {
    if (!record) {
        throw new DocumentNotFoundError();
    } else {
        return record;
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

const handleErrors = ((error, req, res) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal Server Error';
    res.status(statusCode).send(message);
});

module.exports = {
    handleValidateId,
    handleValidationErrors,
    handleErrors,
    handleRecordExists,
    handleValidateOwnership,

}