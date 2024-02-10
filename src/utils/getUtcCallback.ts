import { NextFunction, Request, Response } from "express";
import { UTC } from "../enums/utcEnum";



function getUtcCallback(req: Request, res: Response, next: NextFunction) {
    // let clientTimezoneOffset: number | string | string[] = req.headers['timezone'] ?? UTC.utc;
    let clientTimezoneOffset: number = UTC.utc;
    let clientTimezone;

    // Ensure clientTimezoneOffset is a number
    if (typeof clientTimezoneOffset === 'string') {
        clientTimezoneOffset = parseFloat(clientTimezoneOffset);
    }

    if (clientTimezoneOffset === 0) {
        clientTimezone = 'UTC'
    } else {
        const sign = clientTimezoneOffset <= 0 ? '+' : '-';
        const hours = Math.abs(Math.floor(clientTimezoneOffset));
        const minutes = Math.abs(clientTimezoneOffset % 1 * 60);
        clientTimezone = `UTC${sign}${hours}:${minutes}`;
    }

    req.utc = clientTimezone;

    next();
}

export { getUtcCallback };
