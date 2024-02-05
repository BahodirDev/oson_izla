const Router = require('express').Router();
const { BadUserInput } = require('../../utils/HttpErrors');
const { uploadImgWithValidation, validateFileSize, uploadImgWithValidation2 } = require('../../utils/inputFormatter');
const { wareHousePostValidator, wareHousePatchValidator } = require('../../validators/wareHouse.validator');


const {
    patchWareHousesController,
    postWareHousesController,
    getWareHousesController,
} = require('./warehouses.controller');

Router.get('/warehouses/list', getWareHousesController);
Router.post('/warehouses/post', wareHousePostValidator, postWareHousesController);
// Router.patch('/warehouses/patch/:id', uploadImgWithValidation.single('img'), validateFileSize, wareHousePatchValidator, patchWareHousesController);



module.exports = Router;