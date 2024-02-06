const { validationResult } = require('express-validator');
const {
    deleteWareHouseImagesModel,
    deleteWareHousesModel,
    patchWareHousesModel,
    postWareHousesModel,
    getWareHousesModel,
} = require('./warehouses.model');
const { checkWarehouses } = require('../../utils/checkInput');
const { NotFoundError, InternalServerError } = require('../../utils/HttpErrors');



async function getWareHousesController(req, res, next) {
    try {
        const data = await getWareHousesModel(req);
        res.status(200).json(data)
    } catch (error) {
        next(error)
    }
}
async function postWareHousesController(req, res, next) {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            res.status(400).json({ error: error.array() })
        }
        await checkWarehouses(req.body);
        const data = await postWareHousesModel(req);
        if (!data) {
            throw new InternalServerError("Error in adding new warehouse")
        }
        res.status(201).json(data)
    } catch (error) {
        next(error)
    }
}
async function patchWareHousesController(req, res, next) {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            res.status(400).json({ error: error.array() })
        }
        await checkWarehouses(req?.body);
        const data = await patchWareHousesModel(req);
        if (!data) throw new NotFoundError("this warehouse is not defined")
        res.status(201).json(data)
    } catch (error) {
        next(error);
    }
}
async function deleteWareHouseImagesController(req, res, next) {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            res.status(400).json({ error: error.array() })
        }
        const data = await deleteWareHouseImagesModel(req);
        if (!data) throw new NotFoundError("this warehouse is not defined");
        res.status(201).json(data)
    } catch (error) {
        next(error);
    }
}
async function deleteWareHousesController(req, res, next) {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            res.status(400).json({ error: error.array() })
        }
        const data = await deleteWareHousesModel(req);
        if (!data) throw new NotFoundError("this warehouse is not defined");
        res.status(200).json(data)
    } catch (error) {
        next(error);
    }
}


module.exports = {
    deleteWareHouseImagesController,
    deleteWareHousesController,
    patchWareHousesController,
    postWareHousesController,
    getWareHousesController,
};