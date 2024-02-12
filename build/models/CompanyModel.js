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
            // Check if lng and lat are defined
            if (typeof latitude === 'number' && typeof longitude === 'number') {
                // const geolocation = `ST_SetSRID(ST_MakePoint(${longitude}, ${longitude}), 4326)`;
                const geolocation = `POINT(${lng} ${lat})`;
                // const { company_img } = req.files;
                return yield (0, database_1.fetchAll)(sqlQueries_1.POST_COMPANIES, company_name, company_sub_name, null, // Since img is null
                lat, lng, company_summary);
            }
            else {
                // Handle error: lng or lat is not defined or not a number
                return { error: { message: 'Invalid latitude or longitude', statusCode: 400 } };
            }
        });
    }
}
exports.CompanyModel = CompanyModel;
