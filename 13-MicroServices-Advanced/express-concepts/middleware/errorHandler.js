// custom error class 
class APIError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.name = 'APIError';
    }
}

const asyncErrorHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
}

const globalErrorHandler = (err, req, res, next) => {
    console.error(err.stack); // log the error stack trace

    //handle custom API errors
    if (err instanceof APIError) {
        return res.status(err.statusCode).json({
            error: err.name,
            message: err.message,
        });
    }

    //handle some mongoose errors       
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            error: err.name,
            message: err.message,
        });
    }
    if (err.name === 'CastError') {
        return res.status(400).json({
            error: err.name,
            message: err.message,
        });
    }

    //handle other errors
    return res.status(500).json({
        error: 'InternalServerError',
        message: 'An unexpected error occurred',
    });
}

module.exports = {
    asyncErrorHandler,
    globalErrorHandler,
    APIError
}