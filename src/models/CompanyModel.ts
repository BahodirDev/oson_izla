import { Request } from "express";
import { fetchAll, fetch } from "../config/database";
import { GET_COMPANIES, POST_COMPANIES, PATCH_COMPANIES, GET_COMPANY, EDIT_COMPANY_IMG, DELETE_COMPANY, ENABLE_DISABLE_COMPANY, RESTORE_COMPANY } from "../sqlQueries"
import { fileUnuploader, fileUploader } from "../utils";
import { UploadedFile } from "express-fileupload";

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


        let nameFile: string | undefined;


        if (req.files && req.files.company_img) {
            const uploadedFiles = Array.isArray(req.files.company_img) ? req.files.company_img : [req.files.company_img];
            // Handle each file in the array
            const nameFilesPromises = uploadedFiles.map(async (uploadedFile: UploadedFile) => {
                return await fileUploader(uploadedFile);
            });
            // Wait for all file uploads to complete
            const nameFiles = await Promise.all(nameFilesPromises);
            // Concatenate all file names into a single string (if there are multiple files)
            nameFile = nameFiles.join(',');
        }



        // Check if lng and lat are defined
        if (typeof latitude === 'number' && typeof longitude === 'number') {

            return await fetchAll(
                POST_COMPANIES,
                company_name,
                company_sub_name,
                nameFile, // Since img is null
                latitude,
                longitude,
                company_summary,
            )
        } else {
            // Handle error: lng or lat is not defined or not a number
            return { error: { message: 'Invalid latitude or longitude', statusCode: 400 } };
        }
    }

    static async patchCompany(req: Request) {
        const { company_name, company_sub_name, company_summary, lat, lng, } = req.body;
        const { id } = req.params;
        const longitude = lng ? parseFloat(lng) : 0
        const latitude = lat ? parseFloat(lat) : 0


        let nameFile: string | undefined;


        if (req.files && req.files.company_img) {
            const uploadedFiles = Array.isArray(req.files.company_img) ? req.files.company_img : [req.files.company_img];
            // Handle each file in the array
            const nameFilesPromises = uploadedFiles.map(async (uploadedFile: UploadedFile) => {
                return await fileUploader(uploadedFile, id, 0, { SQL: GET_COMPANY, img: "company_img" });
            });
            // Wait for all file uploads to complete
            const nameFiles = await Promise.all(nameFilesPromises);
            // Concatenate all file names into a single string (if there are multiple files)
            nameFile = nameFiles.join(',');
        }




        // const { company_img } = req.files;

        return await fetchAll(
            PATCH_COMPANIES,
            id,
            company_name,
            company_sub_name,
            nameFile,
            latitude,
            longitude,
            company_summary,
        )


    }

    static async delCompanyImg(req: Request) {
        const { id } = req.params;
        await fileUnuploader(id);
        return await fetch(EDIT_COMPANY_IMG, id);
    }

    static async delCompany(req: Request) {
        const { id } = req.params;
        return await fetch(DELETE_COMPANY, id);
    }

    static async RestoreCompany(req: Request) {
        const { id } = req.params;
        return await fetch(RESTORE_COMPANY, id);
    }
    
    static async EnableDisableCompany(req:Request){
        const { id } = req.params;
        return await fetch(ENABLE_DISABLE_COMPANY, id);
    }
}