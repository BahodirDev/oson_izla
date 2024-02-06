const Router = require('express').Router();
const { wareHousePostValidator, wareHousePatchValidator } = require('../../validators/wareHouse.validator');
const {
    deleteWareHouseImagesController,
    deleteWareHousesController,
    patchWareHousesController,
    postWareHousesController,
    getWareHousesController,
} = require('./warehouses.controller');



Router.get('/warehouses/list', getWareHousesController);
Router.post('/warehouses/post', wareHousePostValidator, postWareHousesController);
Router.patch('/warehouses/patch/:id', wareHousePatchValidator, patchWareHousesController);
Router.delete('/warehouses/delete/:id', wareHousePatchValidator, deleteWareHousesController);
Router.patch('/warehouses/imd-del/:id', wareHousePatchValidator, deleteWareHouseImagesController);



module.exports = Router;