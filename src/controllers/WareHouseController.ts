import { NextFunction, Request, Response } from 'express';
import { EnableDisableWareHousesModel, deleteWareHouseImagesModel, deleteWareHousesModel, getWareHousesModel, patchWareHousesModel, postWareHousesModel, restoreWareHousesModel } from '../routes/warehouses/warehouses.model';
import StatusCode from '../enums/statusCodeEnum';
import { controller, validator, del, get, patch, post } from "./decorators"
import { wareHousePatchValidator, wareHousePostValidator } from '../validators/wareHouse.validator';
import { validationResult } from 'express-validator';
import { checkWarehouses, InternalServerError, NotFoundError } from '../utils';




@controller('/warehouses')
export class WareHouseController {
    @get('/list')
    async getWarehouses(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await getWareHousesModel(req);
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
            const data = await postWareHousesModel(req);
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
            const data = await patchWareHousesModel(req);

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
            const data = await deleteWareHouseImagesModel(req);
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
            const data = await deleteWareHousesModel(req);
            if (!data) throw new NotFoundError("this warehouse is not defined");
            res.status(StatusCode.success).json(data)
        } catch (error) {
            next(error);
        }
    }

    @patch("/restore/:id")
    @validator(wareHousePatchValidator)
    async restoreWareHouseImagesController(req: Request, res: Response, next: NextFunction) {
        try {
            const error = validationResult(req);
            if (!error.isEmpty()) {
                res.status(StatusCode.badRequest).json({ error: error.array() })
            }
            const data = await restoreWareHousesModel(req);
            if (!data) throw new NotFoundError("this warehouse is not defined");
            res.status(StatusCode.success).json(data)
        } catch (error) {
            next(error)
        }
    }

    @patch("/enable/:id")
    @validator(wareHousePatchValidator)
    async EnableDisableWareHouseImagesController(req: Request, res: Response, next: NextFunction) {
        try {
            const error = validationResult(req);
            if (!error.isEmpty()) {
                res.status(StatusCode.badRequest).json({ error: error.array() })
            }
            const data = await EnableDisableWareHousesModel(req);
            if (!data) throw new NotFoundError("this warehouse is not defined");
            res.status(StatusCode.success).json(data)
        } catch (error) {
            next(error)
        }
    }
}

