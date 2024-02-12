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
exports.Company = void 0;
const decorators_1 = require("./decorators");
const models_1 = require("../models");
const statusCodeEnum_1 = __importDefault(require("../enums/statusCodeEnum"));
const utils_1 = require("../utils");
const express_validator_1 = require("express-validator");
let Company = class Company {
    getComapines(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield models_1.CompanyModel.getCompanies(req);
                if (data) {
                    res.status(statusCodeEnum_1.default.created).json(data);
                }
                throw new utils_1.InternalServerError("Something went wrong on getting companies");
            }
            catch (error) {
                next(error);
            }
        });
    }
    postCompanies(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const error = (0, express_validator_1.validationResult)(req);
                if (!error.isEmpty()) {
                    res.status(statusCodeEnum_1.default.badRequest).json({ error: error.array() });
                    return;
                }
                yield (0, utils_1.checkCompanies)(req === null || req === void 0 ? void 0 : req.body);
                const data = yield models_1.CompanyModel.postCompanies(req);
                if (data) {
                    return res.status(statusCodeEnum_1.default.success).json(data);
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
};
exports.Company = Company;
__decorate([
    (0, decorators_1.get)('/list'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], Company.prototype, "getComapines", null);
__decorate([
    (0, decorators_1.post)('/post'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], Company.prototype, "postCompanies", null);
exports.Company = Company = __decorate([
    (0, decorators_1.controller)('/companies')
], Company);
