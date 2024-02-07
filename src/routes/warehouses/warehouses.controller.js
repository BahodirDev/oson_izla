const { validationResult } = require('express-validator');
const {
    EnableDisableWareHousesModel,
    deleteWareHouseImagesModel,
    restoreWareHousesModel,
    deleteWareHousesModel,
    patchWareHousesModel,
    postWareHousesModel,
    getWareHousesModel,
} = require('./warehouses.model');
const { checkWarehouses } = require('../../utils/checkInput');
const { NotFoundError, InternalServerError } = require('../../utils/HttpErrors');
const { StatusCode } = require('../../enums/statusCodeEnum');



async function getWareHousesController(req, res, next) {
    try {
        const data = await getWareHousesModel(req);
        res.status(StatusCode.success).json(data)
    } catch (error) {
        next(error)
    }
}
async function postWareHousesController(req, res, next) {
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
async function patchWareHousesController(req, res, next) {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            res.status(StatusCode.badRequest).json({ error: error.array() })
        }
        await checkWarehouses(req?.body);
        const data = await patchWareHousesModel(req);
        if (!data) throw new NotFoundError("this warehouse is not defined")
        res.status(StatusCode.created).json(data)
    } catch (error) {
        next(error);
    }
}
async function deleteWareHouseImagesController(req, res, next) {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            res.status(StatusCode.badRequest).json({ error: error.array() })
        }
        const data = await deleteWareHouseImagesModel(req);
        if (!data) throw new NotFoundError("this warehouse is not defined");
        res.status(StatusCode.success).json(data)
    } catch (error) {
        next(error);
    }
}
async function deleteWareHousesController(req, res, next) {
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
async function restoreWareHouseImagesController(req, res, next) {
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
async function EnableDisableWareHouseImagesController(req, res, next) {
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


module.exports = {
    EnableDisableWareHouseImagesController,
    restoreWareHouseImagesController,
    deleteWareHouseImagesController,
    deleteWareHousesController,
    patchWareHousesController,
    postWareHousesController,
    getWareHousesController,
};