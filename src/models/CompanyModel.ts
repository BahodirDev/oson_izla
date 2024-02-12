import { Request } from "express";
import { fetchAll } from "../config/database";
import { GET_COMPANIES, POST_COMPANIES } from "../sqlQueries"

export class CompanyModel {
    static async getCompanies(req: Request) {
        const { pagination, id, isdeleted, isactive } = req.body;
        const { page, limit } = pagination;
        const utc = req.utc
        return await fetchAll(
            GET_COMPANIES,
            (page - 1) * limit, limit, isdeleted, isactive, id, utc
        );
    }

    static async postCompanies(req: Request) {
        const { company_name, company_sub_name, lat, lng, company_summary } = req.body;
        const longitude = parseFloat(lng)
        const latitude = parseFloat(lat)


        // Check if lng and lat are defined
        if (typeof latitude === 'number' && typeof longitude === 'number') {
            // const geolocation = `ST_SetSRID(ST_MakePoint(${longitude}, ${longitude}), 4326)`;
            const geolocation = `POINT(${lng} ${lat})`;

            // const { company_img } = req.files;
            return await fetchAll(
                POST_COMPANIES,
                company_name,
                company_sub_name,
                null, // Since img is null
                lat,
                lng,
                company_summary,
            )
        } else {
            // Handle error: lng or lat is not defined or not a number
            return { error: { message: 'Invalid latitude or longitude', statusCode: 400 } };
        }
    }

}