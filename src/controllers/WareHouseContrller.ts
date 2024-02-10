import { NextFunction, Request, Response } from 'express';
import { getWareHousesModel } from '../routes/warehouses/warehouses.model';
import StatusCode from '../enums/statusCodeEnum';
import { controller, get } from "./decorators"
import { use } from './decorators/use';

@controller('/warehouses')
export class WareHouseController {
    @get('/list')
    async getWarehouses(req: Request, res: Response, next: NextFunction) {
        const data = await getWareHousesModel(req);
        if (data) {
            return res.status(StatusCode.success).json(data)
        }
    }
}