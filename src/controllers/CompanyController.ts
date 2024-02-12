import { NextFunction, Request, Response } from "express";
import { controller, get, post } from "./decorators";
import { CompanyModel } from '../models'
import StatusCode from "../enums/statusCodeEnum";
import { InternalServerError, checkCompanies } from "../utils";
import { validationResult } from "express-validator";
@controller('/companies')
export class Company {
    @get('/list')
    async getComapines(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await CompanyModel.getCompanies(req);
            if (data) {
                res.status(StatusCode.created).json(data)
            }
            throw new InternalServerError("Something went wrong on getting companies")
        } catch (error) {
            next(error)
        }
    }
    @post('/post')
    async postCompanies(req: Request, res: Response, next: NextFunction) {
        try {
            const error = validationResult(req);
            if (!error.isEmpty()) {
                res.status(StatusCode.badRequest).json({ error: error.array() });
                return;
            }
            await checkCompanies(req?.body);
            const data = await CompanyModel.postCompanies(req);

            if (data) {
                return res.status(StatusCode.success).json(data)
            }
        } catch (error) {
            next(error)
        }
    }
}