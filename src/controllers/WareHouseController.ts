import { NextFunction, Request, Response } from 'express';
// import { EnableDisableWareHousesModel, deleteWareHouseImagesModel, deleteWareHousesModel, getWareHousesModel, patchWareHousesModel, postWareHousesModel, restoreWareHousesModel } from '../routes/warehouses/warehouses.model';
import {WareHouseModel} from '../models/WareHouseModel'
import StatusCode from '../enums/statusCodeEnum';
import { controller, validator, del, get, patch, post } from "./decorators"
import { wareHousePatchValidator, wareHousePostValidator, validategetRequestBody } from '../validators/wareHouse.validator';
import { validationResult } from 'express-validator';
import { checkWarehouses, InternalServerError, NotFoundError } from '../utils';




@controller('/warehouses')
export class WareHouseController {
    @get('/list')
    @validator(validategetRequestBody)
    async getWarehouses(req: Request, res: Response, next: NextFunction) {
        try {
            const error = validationResult(req);
            if (!error.isEmpty()) {
                res.status(StatusCode.badRequest).json({ error: error.array() });
                return;
            }
            const data  = await WareHouseModel.getWareHouses(req);
            if (data) {
                return res.status(StatusCode.success).json(data)
            }
            throw new InternalServerError("Something went wrong on getting warehouses")
        } catch (error) {
            next(error)
        }

    }

    @post('/post')
    @validator(wareHousePostValidator)
    async postWareHouses(req: Request, res: Response, next: NextFunction) {
        try {
            const error = validationResult(req);
            if (!error.isEmpty()) {
                res.status(StatusCode.badRequest).json({ error: error.array() });
                return;
            }
            await checkWarehouses(req?.body);
            const data = await WareHouseModel.postWareHouses(req);
            if (data) {
                return res.status(StatusCode.success).json(data)
            }
        } catch (error) {
            next(error)
        }
    }

    @patch('/patch/:id')
    @validator(wareHousePatchValidator)
    async patchWareHousesController(req: Request, res: Response, next: NextFunction) {
        try {
            const error = validationResult(req);
            if (!error.isEmpty()) {
                res.status(StatusCode.badRequest).json({ error: error.array() })
            }
            await checkWarehouses(req?.body);
            const data = await WareHouseModel.patchWareHouses(req);

            if (!data) throw new NotFoundError("this warehouse is not defined")

            res.status(StatusCode.created).json(data)
        } catch (error: any) {
            console.log({ error });

            next(error);
        }
    }

    @patch('/img-del/:id')
    @validator(wareHousePatchValidator)
    async deleteWareHouseImagesController(req: Request, res: Response, next: NextFunction) {
        try {
            const error = validationResult(req);
            if (!error.isEmpty()) {
                res.status(StatusCode.badRequest).json({ error: error.array() })
            }
            const data = await WareHouseModel.deleteWareHouseImages(req);
            if (!data) throw new NotFoundError("this warehouse_img is not defined");
            res.status(StatusCode.success).json(data)
        } catch (error) {
            next(error);
        }
    }

    @del("/delete/:id")
    @validator(wareHousePatchValidator)
    async deleteWareHousesController(req: Request, res: Response, next: NextFunction) {
        try {
            const error = validationResult(req);
            if (!error.isEmpty()) {
                res.status(StatusCode.badRequest).json({ error: error.array() })
            }
            const data = await WareHouseModel.deleteWareHouses(req);
            if (!data) throw new NotFoundError("this warehouse is not defined");
            res.status(StatusCode.success).json(data)
        } catch (error) {
            next(error);
        }
    }

    @patch("/restore/:id")
    @validator(wareHousePatchValidator)
    async restoreWareHouseController(req: Request, res: Response, next: NextFunction) {
        try {
            const error = validationResult(req);
            if (!error.isEmpty()) {
                res.status(StatusCode.badRequest).json({ error: error.array() })
            }
            const data = await WareHouseModel.restoreWareHouse(req);
            if (!data) throw new NotFoundError("this warehouse is not defined");
            res.status(StatusCode.success).json(data)
        } catch (error) {
            next(error)
        }
    }

    @patch("/enable/:id")
    @validator(wareHousePatchValidator)
    async disableEnableWareHouseImagesController(req: Request, res: Response, next: NextFunction) {
        try {
            const error = validationResult(req);
            if (!error.isEmpty()) {
                res.status(StatusCode.badRequest).json({ error: error.array() })
            }
            const data = await WareHouseModel.disableEnableWareHouse(req);
            if (!data) throw new NotFoundError("this warehouse is not defined");
            res.status(StatusCode.success).json(data)
        } catch (error) {
            next(error)
        }
    }
}

