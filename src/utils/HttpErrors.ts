import StatusCode from "../enums/statusCodeEnum"

class BadUserInput extends Error {
    code: number
    stack?: string | undefined;
    constructor(message: string, stack: string = "logger") {
        super(message)
        this.name = "BadUserInput";
        this.code = StatusCode.badRequest;
        this.stack = stack;
    }
}

class InternalServerError extends Error {
    code: number;
    constructor(message: string, stack: string = "logger") {
        super(message)
        this.name = "InternalServerError";
        this.code = StatusCode.serverError;
        this.stack = stack;
    }
}
class NotFoundError extends Error {
    code: number
    constructor(message: string, stack: string = "logger") {
        super(message)
        this.name = "NotFoundError";
        this.code = StatusCode.notFound;
        this.stack = stack;
    }
}


export { BadUserInput, InternalServerError, NotFoundError };