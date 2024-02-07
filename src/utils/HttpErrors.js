const { StatusCode } = require("../enums/statusCodeEnum");

class BadUserInput extends Error {
    constructor(message, stack = "logger") {
        super(message)
        this.name = "CustomError";
        this.code = StatusCode.badRequest;
        this.stack = stack;
    }
}

class InternalServerError extends Error {
    constructor(message, stack = "logger") {
        super(message)
        this.name = "InternalServerError";
        this.code = StatusCode.serverError;
        this.stack = stack;
    }
}
class NotFoundError extends Error {
    constructor(message, stack = "logger") {
        super(message)
        this.name = "InternalServerError";
        this.code = StatusCode.notFound;
        this.stack = stack;
    }
}


module.exports = { BadUserInput, InternalServerError, NotFoundError };