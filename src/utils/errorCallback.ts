import { Error, NextFunction, Request, Response, } from "express";

export default (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log('work here');
    
    const statusCode = err.code || 500;
    const message = err.message || 'UNKNOWN_ERROR';
    res.status(statusCode).json({
        error: {
            message,
            statusCode
        }
    });
}
