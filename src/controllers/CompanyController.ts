import { NextFunction, Request, Response } from "express";
import { controller, del, get, patch, post } from "./decorators";
import { CompanyModel } from '../models'
import StatusCode from "../enums/statusCodeEnum";
import { InternalServerError, NotFoundError, checkCompanies } from "../utils";
import { validationResult } from "express-validator";
@controller('/companies')
export class Company {
    @get('/list')
    async getComapines(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await CompanyModel.getCompanies(req);
            if (data) {
                return res.status(StatusCode.created).json(data)
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
                return res.status(StatusCode.created).json(data)
            }
        } catch (error) {
            next(error)
        }
    }
    @patch('/patch/:id')
    async patchCompanies(req: Request, res: Response, next: NextFunction) {
        try {
            const error = validationResult(req);
            if (!error.isEmpty()) {
                res.status(StatusCode.badRequest).json({ error: error.array() });
                return;
            }
            await checkCompanies(req?.body);

            const data = await CompanyModel.patchCompany(req);
            if (!data) throw new NotFoundError("this company is not defined");
            return res.status(StatusCode.created).json(data)

        } catch (error) {
            next(error)
        }
    }
    @patch('/img-del/:id')
    async delCompanyImg(req: Request, res: Response, next: NextFunction) {
        try {
            const error = validationResult(req);
            if (!error.isEmpty()) {
                res.status(StatusCode.badRequest).json({ error: error.array() });
                return;
            }
            await checkCompanies(req?.body);

            const data = await CompanyModel.delCompanyImg(req);

            if (!data) throw new NotFoundError("this company is not defined");
            return res.status(StatusCode.created).json(data)

        } catch (error) {
            next(error)
        }
    }
    @del('/delete/:id')
    async delCompany(req: Request, res: Response, next: NextFunction) {
        try {
            const error = validationResult(req);
            if (!error.isEmpty()) {
                res.status(StatusCode.badRequest).json({ error: error.array() });
                return;
            }
            await checkCompanies(req?.body);

            const data = await CompanyModel.delCompany(req);

            if (!data) throw new NotFoundError("this company is not defined");
            return res.status(StatusCode.created).json(data)

        } catch (error) {
            next(error)
        }
    }
    @patch('/restore/:id')
    async RestoreCompany(req: Request, res: Response, next: NextFunction) {
        try {
            const error = validationResult(req);
            if (!error.isEmpty()) {
                res.status(StatusCode.badRequest).json({ error: error.array() });
                return;
            }
            await checkCompanies(req?.body);

            const data = await CompanyModel.RestoreCompany(req);

            if (!data) throw new NotFoundError("this company is not defined");
            return res.status(StatusCode.created).json(data)

        } catch (error) {
            next(error)
        }
    }
    @patch('/enable/:id')
    async EnableDisableCompany(req: Request, res: Response, next: NextFunction) {
        try {
            const error = validationResult(req);
            if (!error.isEmpty()) {
                res.status(StatusCode.badRequest).json({ error: error.array() });
                return;
            }
            await checkCompanies(req?.body);

            const data = await CompanyModel.EnableDisableCompany(req);

            if (!data) throw new NotFoundError("this company is not defined");
            return res.status(StatusCode.created).json(data)

        } catch (error) {
            next(error)
        }
    }
}