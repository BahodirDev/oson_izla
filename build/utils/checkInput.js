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
exports.checkCompanies = exports.checkWarehouses = void 0;
const database_1 = require("../config/database");
const warehouse_sql_1 = __importDefault(require("../sqlQueries/warehouse.sql"));
const HttpErrors_1 = require("./HttpErrors");
const sqlQueries_1 = require("../sqlQueries");
function checkWarehouses({ name }) {
    return __awaiter(this, void 0, void 0, function* () {
        const isExist = yield (0, database_1.fetchAll)(warehouse_sql_1.default.CHECK_IF_EXIST, name);
        if (isExist.length > 0) {
            throw new HttpErrors_1.BadUserInput(`${name} is already exist`, '');
        }
    });
}
exports.checkWarehouses = checkWarehouses;
function checkCompanies({ company_sub_name }) {
    return __awaiter(this, void 0, void 0, function* () {
        const isExist = yield (0, database_1.fetchAll)(sqlQueries_1.CHECK_IF_COMPANY_EXIST, company_sub_name);
        if (isExist.length > 0) {
            throw new HttpErrors_1.BadUserInput(`${company_sub_name} is already exist`, '');
        }
    });
}
exports.checkCompanies = checkCompanies;
