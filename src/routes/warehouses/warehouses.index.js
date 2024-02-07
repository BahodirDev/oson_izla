const Router = require('express').Router();
const { wareHousePostValidator, wareHousePatchValidator } = require('../../validators/wareHouse.validator');
const {
    EnableDisableWareHouseImagesController,
    restoreWareHouseImagesController,
    deleteWareHouseImagesController,
    deleteWareHousesController,
    patchWareHousesController,
    postWareHousesController,
    getWareHousesController,
} = require('./warehouses.controller');



Router.get('/warehouses/list', getWareHousesController);
Router.post('/warehouses/post', wareHousePostValidator, postWareHousesController);
Router.patch('/warehouses/patch/:id', wareHousePatchValidator, patchWareHousesController);
Router.patch('/warehouses/imd-del/:id', wareHousePatchValidator, deleteWareHouseImagesController);
Router.patch('/warehouses/restore/:id', wareHousePatchValidator, restoreWareHouseImagesController);
Router.patch('/warehouses/enable/:id', wareHousePatchValidator, EnableDisableWareHouseImagesController);
Router.delete('/warehouses/delete/:id', wareHousePatchValidator, deleteWareHousesController);



module.exports = Router;