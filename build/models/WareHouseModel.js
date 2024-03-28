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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WareHouseModel = void 0;
const database_1 = require("../config/database");
const sqlQueries_1 = require("../sqlQueries");
const utils_1 = require("../utils");
class WareHouseModel {
    static getWareHouses(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { pagination, id, isdeleted, isactive } = req.body;
            const { page, limit } = pagination;
            const utc = req.utc;
            return yield (0, database_1.fetchAll)(sqlQueries_1.GET_WAREHOUSES, (page - 1) * limit, limit, isdeleted, isactive, id, utc);
        });
    }
    static postWareHouses(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = req.body;
            let nameFile;
            if (req.files && req.files.img) {
                const uploadedFiles = Array.isArray(req.files.img) ? req.files.img : [req.files.img];
                // Handle each file in the array
                const nameFilesPromises = uploadedFiles.map((uploadedFile) => __awaiter(this, void 0, void 0, function* () {
                    return yield (0, utils_1.fileUploader)(uploadedFile);
                }));
                // Wait for all file uploads to complete
                const nameFiles = yield Promise.all(nameFilesPromises);
                // Concatenate all file names into a single string (if there are multiple files)
                nameFile = nameFiles.join(',');
            }
            return yield (0, database_1.fetch)(sqlQueries_1.CREATE_NEW_WAREHOUSE, name, nameFile);
        });
    }
    static patchWareHouses(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = req.body;
            const { id } = req.params;
            let nameFile;
            if (req.files && req.files.img) {
                const uploadedFiles = Array.isArray(req.files.img) ? req.files.img : [req.files.img];
                // Handle each file in the array
                const nameFilesPromises = uploadedFiles.map((uploadedFile) => __awaiter(this, void 0, void 0, function* () {
                    return yield (0, utils_1.fileUploader)(uploadedFile, id);
                }));
                // Wait for all file uploads to complete
                const nameFiles = yield Promise.all(nameFilesPromises);
                // Concatenate all file names into a single string (if there are multiple files)
                nameFile = nameFiles.join(',');
            }
            return yield (0, database_1.fetch)(sqlQueries_1.EDIT_WAREHOUSE, id, name, nameFile);
        });
    }
    static deleteWareHouseImages(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield (0, utils_1.fileUnuploader)(id);
            return yield (0, database_1.fetch)(sqlQueries_1.EDIT_WAREHOUSE_IMG, id);
        });
    }
    static deleteWareHouses(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            return yield (0, database_1.fetch)(sqlQueries_1.DELETE_WAREHOUSE, id);
        });
    }
    static restoreWareHouse(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            return yield (0, database_1.fetch)(sqlQueries_1.RESTORE_WAREHOUSE, id);
        });
    }
    static disableEnableWareHouse(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            return yield (0, database_1.fetch)(sqlQueries_1.DISABLE_ENABLE_WAREHOUSE, id);
        });
    }
}
exports.WareHouseModel = WareHouseModel;
