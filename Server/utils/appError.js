class AppError extends Error {
    constructor(message,statusCode){
        super(message);
        this.statusCode = statusCode.toString().startsWith('4') ? statusCode : 500;
        this.operational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}
module.exports = AppError;