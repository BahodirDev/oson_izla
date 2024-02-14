"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
exports.WareHouseController = void 0;
const warehouses_model_1 = require("../routes/warehouses/warehouses.model");
const statusCodeEnum_1 = __importDefault(require("../enums/statusCodeEnum"));
const decorators_1 = require("./decorators");
const wareHouse_validator_1 = require("../validators/wareHouse.validator");
const express_validator_1 = require("express-validator");
const utils_1 = require("../utils");
let WareHouseController = class WareHouseController {
    getWarehouses(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield (0, warehouses_model_1.getWareHousesModel)(req);
                if (data) {
                    return res.status(statusCodeEnum_1.default.success).json(data);
                }
                throw new utils_1.InternalServerError("Something went wrong on getting warehouses");
            }
            catch (error) {
                next(error);
            }
        });
    }
    postWareHouses(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const error = (0, express_validator_1.validationResult)(req);
                if (!error.isEmpty()) {
                    res.status(statusCodeEnum_1.default.badRequest).json({ error: error.array() });
                    return;
                }
                yield (0, utils_1.checkWarehouses)(req === null || req === void 0 ? void 0 : req.body);
                const data = yield (0, warehouses_model_1.postWareHousesModel)(req);
                if (data) {
                    return res.status(statusCodeEnum_1.default.success).json(data);
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    patchWareHousesController(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const error = (0, express_validator_1.validationResult)(req);
                if (!error.isEmpty()) {
                    res.status(statusCodeEnum_1.default.badRequest).json({ error: error.array() });
                }
                yield (0, utils_1.checkWarehouses)(req === null || req === void 0 ? void 0 : req.body);
                const data = yield (0, warehouses_model_1.patchWareHousesModel)(req);
                if (!data)
                    throw new utils_1.NotFoundError("this warehouse is not defined");
                res.status(statusCodeEnum_1.default.created).json(data);
            }
            catch (error) {
                console.log({ error });
                next(error);
            }
        });
    }
    deleteWareHouseImagesController(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const error = (0, express_validator_1.validationResult)(req);
                if (!error.isEmpty()) {
                    res.status(statusCodeEnum_1.default.badRequest).json({ error: error.array() });
                }
                const data = yield (0, warehouses_model_1.deleteWareHouseImagesModel)(req);
                if (!data)
                    throw new utils_1.NotFoundError("this warehouse_img is not defined");
                res.status(statusCodeEnum_1.default.success).json(data);
            }
            catch (error) {
                next(error);
            }
        });
    }
    deleteWareHousesController(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const error = (0, express_validator_1.validationResult)(req);
                if (!error.isEmpty()) {
                    res.status(statusCodeEnum_1.default.badRequest).json({ error: error.array() });
                }
                const data = yield (0, warehouses_model_1.deleteWareHousesModel)(req);
                if (!data)
                    throw new utils_1.NotFoundError("this warehouse is not defined");
                res.status(statusCodeEnum_1.default.success).json(data);
            }
            catch (error) {
                next(error);
            }
        });
    }
    restoreWareHouseImagesController(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const error = (0, express_validator_1.validationResult)(req);
                if (!error.isEmpty()) {
                    res.status(statusCodeEnum_1.default.badRequest).json({ error: error.array() });
                }
                const data = yield (0, warehouses_model_1.restoreWareHousesModel)(req);
                if (!data)
                    throw new utils_1.NotFoundError("this warehouse is not defined");
                res.status(statusCodeEnum_1.default.success).json(data);
            }
            catch (error) {
                next(error);
            }
        });
    }
    EnableDisableWareHouseImagesController(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const error = (0, express_validator_1.validationResult)(req);
                if (!error.isEmpty()) {
                    res.status(statusCodeEnum_1.default.badRequest).json({ error: error.array() });
                }
                const data = yield (0, warehouses_model_1.EnableDisableWareHousesModel)(req);
                if (!data)
                    throw new utils_1.NotFoundError("this warehouse is not defined");
                res.status(statusCodeEnum_1.default.success).json(data);
            }
            catch (error) {
                next(error);
            }
        });
    }
};
exports.WareHouseController = WareHouseController;
__decorate([
    (0, decorators_1.get)('/list'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], WareHouseController.prototype, "getWarehouses", null);
__decorate([
    (0, decorators_1.post)('/post'),
    (0, decorators_1.validator)(wareHouse_validator_1.wareHousePostValidator),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], WareHouseController.prototype, "postWareHouses", null);
__decorate([
    (0, decorators_1.patch)('/patch/:id'),
    (0, decorators_1.validator)(wareHouse_validator_1.wareHousePatchValidator),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], WareHouseController.prototype, "patchWareHousesController", null);
__decorate([
    (0, decorators_1.patch)('/img-del/:id'),
    (0, decorators_1.validator)(wareHouse_validator_1.wareHousePatchValidator),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], WareHouseController.prototype, "deleteWareHouseImagesController", null);
__decorate([
    (0, decorators_1.del)("/delete/:id"),
    (0, decorators_1.validator)(wareHouse_validator_1.wareHousePatchValidator),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], WareHouseController.prototype, "deleteWareHousesController", null);
__decorate([
    (0, decorators_1.patch)("/restore/:id"),
    (0, decorators_1.validator)(wareHouse_validator_1.wareHousePatchValidator),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], WareHouseController.prototype, "restoreWareHouseImagesController", null);
__decorate([
    (0, decorators_1.patch)("/enable/:id"),
    (0, decorators_1.validator)(wareHouse_validator_1.wareHousePatchValidator),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], WareHouseController.prototype, "EnableDisableWareHouseImagesController", null);
exports.WareHouseController = WareHouseController = __decorate([
    (0, decorators_1.controller)('/warehouses')
], WareHouseController);
