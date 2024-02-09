import { validationResult } from "express-validator"
import {
    EnableDisableWareHousesModel,
    deleteWareHouseImagesModel,
    restoreWareHousesModel,
    deleteWareHousesModel,
    patchWareHousesModel,
    postWareHousesModel,
    getWareHousesModel,
} from './warehouses.model'
import { checkWarehouses } from "../../utils/checkInput"
import { InternalServerError, NotFoundError } from "../../utils/HttpErrors"
import StatusCode from "../../enums/statusCodeEnum"
import { NextFunction, Request, Response } from 'express';



async function getWareHousesController(req: Request, res: Response, next: NextFunction) {
    try {
        const data = await getWareHousesModel(req);
        res.status(StatusCode.success).json(data)
    } catch (error) {
        next(error)
    }
}
async function postWareHousesController(req: Request, res: Response, next: NextFunction) {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            res.status(StatusCode.badRequest).json({ error: error.array() })
        }
        await checkWarehouses(req.body);
        const data = await postWareHousesModel(req);
        if (!data) {
            throw new InternalServerError("Error in adding new warehouse")
        }
        res.status(StatusCode.created).json(data)
    } catch (error) {
        next(error)
    }
}
async function patchWareHousesController(req: Request, res: Response, next: NextFunction) {
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
async function deleteWareHouseImagesController(req: Request, res: Response, next: NextFunction) {
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
async function deleteWareHousesController(req: Request, res: Response, next: NextFunction) {
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
async function restoreWareHouseImagesController(req: Request, res: Response, next: NextFunction) {
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
async function EnableDisableWareHouseImagesController(req: Request, res: Response, next: NextFunction) {
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


export {
    EnableDisableWareHouseImagesController,
    restoreWareHouseImagesController,
    deleteWareHouseImagesController,
    deleteWareHousesController,
    patchWareHousesController,
    postWareHousesController,
    getWareHousesController,
};