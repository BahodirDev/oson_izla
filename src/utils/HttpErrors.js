class BadUserInput extends Error {
    constructor(message, stack = "logger") {
        super(message)
        this.name = "CustomError";
        this.code = 400;
        this.stack = stack;
    }
}

class InternalServerError extends Error {
    constructor(message, stack = "logger") {
        super(message)
        this.name = "InternalServerError";
        this.code = 500;
        this.stack = stack;
    }
}


module.exports = { BadUserInput, InternalServerError };