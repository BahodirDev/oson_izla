const { validationResult } = require('express-validator');
const {
    patchWareHousesModel,
    postWareHousesModel,
    getWareHousesModel
} = require('./warehouses.model');
const { checkWarehouses } = require('../../utils/checkInput');
const { BadUserInput } = require('../../utils/HttpErrors');



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

        if (!data) throw new BadUserInput("this warehouse is not defined")
        res.status(201).json(data)
    } catch (error) {
        next(error);
    }
}

module.exports = {
    patchWareHousesController,
    postWareHousesController,
    getWareHousesController,
};