import { Router } from 'express';
let router: Router = Router();
import { wareHousePostValidator, wareHousePatchValidator } from "../../validators/wareHouse.validator"
import { 
    EnableDisableWareHouseImagesController,
    restoreWareHouseImagesController,
    deleteWareHouseImagesController, 
    deleteWareHousesController, 
    patchWareHousesController, 
    postWareHousesController, 
    getWareHousesController, 
} from './warehouses.controller'



router.get('/warehouses/list', getWareHousesController);
router.post('/warehouses/post', wareHousePostValidator, postWareHousesController);
router.patch('/warehouses/patch/:id', wareHousePatchValidator, patchWareHousesController);
router.patch('/warehouses/img-del/:id', wareHousePatchValidator, deleteWareHouseImagesController);
router.patch('/warehouses/restore/:id', wareHousePatchValidator, restoreWareHouseImagesController);
router.patch('/warehouses/enable/:id', wareHousePatchValidator, EnableDisableWareHouseImagesController);
router.delete('/warehouses/delete/:id', wareHousePatchValidator, deleteWareHousesController);



export { router as wareHouseRouter };