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
exports.fileUnuploader = exports.fileUploader = void 0;
const fs = require('fs');
const inputFormatter_1 = require("./inputFormatter");
const filterEnum_1 = __importDefault(require("../enums/filterEnum"));
const globalPathEnum_1 = __importDefault(require("../enums/globalPathEnum"));
const database_1 = require("../config/database");
const warehouse_sql_1 = __importDefault(require("../routes/warehouses/warehouse.sql"));
const HttpErrors_1 = require("./HttpErrors");
function fileUploader(uploadedFile, id, utc = 0) {
    return __awaiter(this, void 0, void 0, function* () {
        if (uploadedFile) {
            // cheking filter params
            let nameFile = yield (0, inputFormatter_1.getRandomName)(uploadedFile);
            if (uploadedFile.size >= filterEnum_1.default.standartSizeOfFile) {
                throw new HttpErrors_1.BadUserInput("image size must be less than 1mb");
            }
            else if (!filterEnum_1.default.standartTypeOfFile.includes(uploadedFile.mimetype)) {
                throw new HttpErrors_1.BadUserInput(`image type must be one of ${filterEnum_1.default.standartTypeOfFile}`);
            }
            // uploading to folder
            const fileFolder = globalPathEnum_1.default.fileUploadPath;
            if (!fs.existsSync(fileFolder)) {
                fs.mkdirSync(fileFolder);
            }
            else {
                console.log('Folder already exists:', fileFolder);
            }
            ;
            const warehouse = yield (0, database_1.fetch)(warehouse_sql_1.default.GET_WAREHOUSE, id !== null && id !== void 0 ? id : null, false, true, utc);
            if (warehouse === null || warehouse === void 0 ? void 0 : warehouse.warehouse_img) {
                try {
                    fs.unlink(fileFolder + "/" + (warehouse === null || warehouse === void 0 ? void 0 : warehouse.warehouse_img), (err) => {
                        if (err) {
                            console.log({ err });
                        }
                    });
                }
                catch (error) {
                    throw new HttpErrors_1.InternalServerError("Error in deleting file");
                }
            }
            uploadedFile.mv(fileFolder + '/' + nameFile, (err) => {
                if (err) {
                    console.log({ err });
                }
            });
            return nameFile !== null && nameFile !== void 0 ? nameFile : null;
        }
    });
}
exports.fileUploader = fileUploader;
function fileUnuploader(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const warehouse = yield (0, database_1.fetch)(warehouse_sql_1.default.GET_WAREHOUSE, id, false, true, 0);
        if (warehouse === null || warehouse === void 0 ? void 0 : warehouse.warehouse_img) {
            try {
                const fileFolder = globalPathEnum_1.default.fileUploadPath;
                fs.unlink(fileFolder + "/" + (warehouse === null || warehouse === void 0 ? void 0 : warehouse.warehouse_img), (err) => {
                    if (err) {
                        console.log({ err });
                    }
                    return true;
                });
            }
            catch (error) {
                throw new HttpErrors_1.InternalServerError("Error in deleting file");
            }
        }
    });
}
exports.fileUnuploader = fileUnuploader;
