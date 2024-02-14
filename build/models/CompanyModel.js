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
exports.CompanyModel = void 0;
const database_1 = require("../config/database");
const sqlQueries_1 = require("../sqlQueries");
const utils_1 = require("../utils");
class CompanyModel {
    static getCompanies(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { pagination, id, isdeleted, isactive } = req.body;
            const { page, limit } = pagination;
            const utc = req.utc;
            return yield (0, database_1.fetchAll)(sqlQueries_1.GET_COMPANIES, (page - 1) * limit, limit, isdeleted, isactive, id, utc);
        });
    }
    static postCompanies(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { company_name, company_sub_name, lat, lng, company_summary } = req.body;
            const longitude = parseFloat(lng);
            const latitude = parseFloat(lat);
            let nameFile;
            if (req.files && req.files.company_img) {
                const uploadedFiles = Array.isArray(req.files.company_img) ? req.files.company_img : [req.files.company_img];
                // Handle each file in the array
                const nameFilesPromises = uploadedFiles.map((uploadedFile) => __awaiter(this, void 0, void 0, function* () {
                    return yield (0, utils_1.fileUploader)(uploadedFile);
                }));
                // Wait for all file uploads to complete
                const nameFiles = yield Promise.all(nameFilesPromises);
                // Concatenate all file names into a single string (if there are multiple files)
                nameFile = nameFiles.join(',');
            }
            // Check if lng and lat are defined
            if (typeof latitude === 'number' && typeof longitude === 'number') {
                return yield (0, database_1.fetchAll)(sqlQueries_1.POST_COMPANIES, company_name, company_sub_name, nameFile, // Since img is null
                latitude, longitude, company_summary);
            }
            else {
                // Handle error: lng or lat is not defined or not a number
                return { error: { message: 'Invalid latitude or longitude', statusCode: 400 } };
            }
        });
    }
    static patchCompany(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { company_name, company_sub_name, company_summary, lat, lng, } = req.body;
            const { id } = req.params;
            const longitude = lng ? parseFloat(lng) : 0;
            const latitude = lat ? parseFloat(lat) : 0;
            let nameFile;
            if (req.files && req.files.company_img) {
                const uploadedFiles = Array.isArray(req.files.company_img) ? req.files.company_img : [req.files.company_img];
                // Handle each file in the array
                const nameFilesPromises = uploadedFiles.map((uploadedFile) => __awaiter(this, void 0, void 0, function* () {
                    return yield (0, utils_1.fileUploader)(uploadedFile, id, 0, { SQL: sqlQueries_1.GET_COMPANY, img: "company_img" });
                }));
                // Wait for all file uploads to complete
                const nameFiles = yield Promise.all(nameFilesPromises);
                // Concatenate all file names into a single string (if there are multiple files)
                nameFile = nameFiles.join(',');
            }
            // const { company_img } = req.files;
            return yield (0, database_1.fetchAll)(sqlQueries_1.PATCH_COMPANIES, id, company_name, company_sub_name, nameFile, latitude, longitude, company_summary);
        });
    }
    static delCompanyImg(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield (0, utils_1.fileUnuploader)(id);
            return yield (0, database_1.fetch)(sqlQueries_1.EDIT_COMPANY_IMG, id);
        });
    }
    static delCompany(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            return yield (0, database_1.fetch)(sqlQueries_1.DELETE_COMPANY, id);
        });
    }
    static RestoreCompany(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            return yield (0, database_1.fetch)(sqlQueries_1.RESTORE_COMPANY, id);
        });
    }
    static EnableDisableCompany(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            return yield (0, database_1.fetch)(sqlQueries_1.ENABLE_DISABLE_COMPANY, id);
        });
    }
}
exports.CompanyModel = CompanyModel;
