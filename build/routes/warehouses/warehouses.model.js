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
exports.getWareHousesModel = exports.postWareHousesModel = exports.patchWareHousesModel = exports.deleteWareHousesModel = exports.restoreWareHousesModel = exports.deleteWareHouseImagesModel = exports.EnableDisableWareHousesModel = void 0;
const database_1 = require("../../config/database");
const warehouse_sql_1 = __importDefault(require("./warehouse.sql"));
const fileUploader_1 = require("../../utils/fileUploader");
function getWareHousesModel(req) {
    return __awaiter(this, void 0, void 0, function* () {
        const { pagination, id, isdeleted, isactive } = req.body;
        const { page, limit } = pagination;
        const utc = req.utc;
        return yield (0, database_1.fetchAll)(warehouse_sql_1.default.GET_WAREHOUSES, (page - 1) * limit, limit, isdeleted, isactive, id, utc);
    });
}
exports.getWareHousesModel = getWareHousesModel;
function postWareHousesModel(req) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name } = req.body;
        let nameFile;
        if (req.files && req.files.img) {
            const uploadedFiles = Array.isArray(req.files.img) ? req.files.img : [req.files.img];
            // Handle each file in the array
            const nameFilesPromises = uploadedFiles.map((uploadedFile) => __awaiter(this, void 0, void 0, function* () {
                return yield (0, fileUploader_1.fileUploader)(uploadedFile);
            }));
            // Wait for all file uploads to complete
            const nameFiles = yield Promise.all(nameFilesPromises);
            // Concatenate all file names into a single string (if there are multiple files)
            nameFile = nameFiles.join(',');
        }
        return yield (0, database_1.fetch)(warehouse_sql_1.default.CREATE_NEW_WAREHOUSE, name, nameFile);
    });
}
exports.postWareHousesModel = postWareHousesModel;
function patchWareHousesModel(req) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name } = req.body;
        const { id } = req.params;
        let nameFile;
        if (req.files && req.files.img) {
            const uploadedFiles = Array.isArray(req.files.img) ? req.files.img : [req.files.img];
            // Handle each file in the array
            const nameFilesPromises = uploadedFiles.map((uploadedFile) => __awaiter(this, void 0, void 0, function* () {
                return yield (0, fileUploader_1.fileUploader)(uploadedFile, id);
            }));
            // Wait for all file uploads to complete
            const nameFiles = yield Promise.all(nameFilesPromises);
            // Concatenate all file names into a single string (if there are multiple files)
            nameFile = nameFiles.join(',');
        }
        return yield (0, database_1.fetch)(warehouse_sql_1.default.EDIT_WAREHOUSE, id, name, nameFile);
    });
}
exports.patchWareHousesModel = patchWareHousesModel;
function deleteWareHouseImagesModel(req) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        yield (0, fileUploader_1.fileUnuploader)(id);
        return yield (0, database_1.fetch)(warehouse_sql_1.default.EDIT_WAREHOUSE_IMG, id);
    });
}
exports.deleteWareHouseImagesModel = deleteWareHouseImagesModel;
function deleteWareHousesModel(req) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        return yield (0, database_1.fetch)(warehouse_sql_1.default.DELETE_WAREHOUSE, id);
    });
}
exports.deleteWareHousesModel = deleteWareHousesModel;
function restoreWareHousesModel(req) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        return yield (0, database_1.fetch)(warehouse_sql_1.default.RESTORE_WAREHOUSE, id);
    });
}
exports.restoreWareHousesModel = restoreWareHousesModel;
function EnableDisableWareHousesModel(req) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        return yield (0, database_1.fetch)(warehouse_sql_1.default.DISABLE_ENABLE_WAREHOUSE, id);
    });
}
exports.EnableDisableWareHousesModel = EnableDisableWareHousesModel;
