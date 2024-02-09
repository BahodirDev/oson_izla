"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWareHousesController = exports.postWareHousesController = exports.patchWareHousesController = exports.deleteWareHousesController = exports.deleteWareHouseImagesController = exports.restoreWareHouseImagesController = exports.EnableDisableWareHouseImagesController = void 0;
const express_validator_1 = require("express-validator");
const warehouses_model_1 = require("./warehouses.model");
const checkInput_1 = require("../../utils/checkInput");
const HttpErrors_1 = require("../../utils/HttpErrors");
const statusCodeEnum_1 = __importDefault(require("../../enums/statusCodeEnum"));
function getWareHousesController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield (0, warehouses_model_1.getWareHousesModel)(req);
            res.status(statusCodeEnum_1.default.success).json(data);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getWareHousesController = getWareHousesController;
function postWareHousesController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const error = (0, express_validator_1.validationResult)(req);
            if (!error.isEmpty()) {
                res.status(statusCodeEnum_1.default.badRequest).json({ error: error.array() });
            }
            yield (0, checkInput_1.checkWarehouses)(req.body);
            const data = yield (0, warehouses_model_1.postWareHousesModel)(req);
            if (!data) {
                throw new HttpErrors_1.InternalServerError("Error in adding new warehouse");
            }
            res.status(statusCodeEnum_1.default.created).json(data);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.postWareHousesController = postWareHousesController;
function patchWareHousesController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const error = (0, express_validator_1.validationResult)(req);
            if (!error.isEmpty()) {
                res.status(statusCodeEnum_1.default.badRequest).json({ error: error.array() });
            }
            yield (0, checkInput_1.checkWarehouses)(req === null || req === void 0 ? void 0 : req.body);
            const data = yield (0, warehouses_model_1.patchWareHousesModel)(req);
            if (!data)
                throw new HttpErrors_1.NotFoundError("this warehouse is not defined");
            res.status(statusCodeEnum_1.default.created).json(data);
        }
        catch (error) {
            console.log({ error });
            next(error);
        }
    });
}
exports.patchWareHousesController = patchWareHousesController;
function deleteWareHouseImagesController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const error = (0, express_validator_1.validationResult)(req);
            if (!error.isEmpty()) {
                res.status(statusCodeEnum_1.default.badRequest).json({ error: error.array() });
            }
            const data = yield (0, warehouses_model_1.deleteWareHouseImagesModel)(req);
            if (!data)
                throw new HttpErrors_1.NotFoundError("this warehouse_img is not defined");
            res.status(statusCodeEnum_1.default.success).json(data);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.deleteWareHouseImagesController = deleteWareHouseImagesController;
function deleteWareHousesController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const error = (0, express_validator_1.validationResult)(req);
            if (!error.isEmpty()) {
                res.status(statusCodeEnum_1.default.badRequest).json({ error: error.array() });
            }
            const data = yield (0, warehouses_model_1.deleteWareHousesModel)(req);
            if (!data)
                throw new HttpErrors_1.NotFoundError("this warehouse is not defined");
            res.status(statusCodeEnum_1.default.success).json(data);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.deleteWareHousesController = deleteWareHousesController;
function restoreWareHouseImagesController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const error = (0, express_validator_1.validationResult)(req);
            if (!error.isEmpty()) {
                res.status(statusCodeEnum_1.default.badRequest).json({ error: error.array() });
            }
            const data = yield (0, warehouses_model_1.restoreWareHousesModel)(req);
            if (!data)
                throw new HttpErrors_1.NotFoundError("this warehouse is not defined");
            res.status(statusCodeEnum_1.default.success).json(data);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.restoreWareHouseImagesController = restoreWareHouseImagesController;
function EnableDisableWareHouseImagesController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const error = (0, express_validator_1.validationResult)(req);
            if (!error.isEmpty()) {
                res.status(statusCodeEnum_1.default.badRequest).json({ error: error.array() });
            }
            const data = yield (0, warehouses_model_1.EnableDisableWareHousesModel)(req);
            if (!data)
                throw new HttpErrors_1.NotFoundError("this warehouse is not defined");
            res.status(statusCodeEnum_1.default.success).json(data);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.EnableDisableWareHouseImagesController = EnableDisableWareHouseImagesController;
