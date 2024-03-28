import { Request } from "express";
import { fetchAll, fetch } from "../config/database";
import { CREATE_NEW_WAREHOUSE, DELETE_WAREHOUSE, DISABLE_ENABLE_WAREHOUSE, EDIT_WAREHOUSE, EDIT_WAREHOUSE_IMG, GET_WAREHOUSES, RESTORE_WAREHOUSE } from "../sqlQueries"
import { fileUnuploader, fileUploader } from "../utils";
import { UploadedFile } from "express-fileupload";

export class WareHouseModel {

    static async getWareHouses(req: Request) {
        const { pagination, id, isdeleted, isactive } = req.body;
        const { page, limit } = pagination;
        const utc = req.utc
        return await fetchAll(
            GET_WAREHOUSES,
            (page - 1) * limit, limit, isdeleted, isactive, id, utc
        );
    }

    static async postWareHouses(req: Request) {
        const { name } = req.body;
        let nameFile: string | undefined;
    
        if (req.files && req.files.img) {
            const uploadedFiles = Array.isArray(req.files.img) ? req.files.img : [req.files.img];
            // Handle each file in the array
            const nameFilesPromises = uploadedFiles.map(async (uploadedFile: UploadedFile) => {
                return await fileUploader(uploadedFile);
            });
            // Wait for all file uploads to complete
            const nameFiles = await Promise.all(nameFilesPromises);
            // Concatenate all file names into a single string (if there are multiple files)
            nameFile = nameFiles.join(',');
        }        
        return await fetch(CREATE_NEW_WAREHOUSE, name, nameFile);
    }

    static async patchWareHouses(req: Request) {
        const { name } = req.body;
        const { id } = req.params;
        let nameFile: string | undefined;
    
        if (req.files && req.files.img) {
            const uploadedFiles = Array.isArray(req.files.img) ? req.files.img : [req.files.img];
            // Handle each file in the array
            const nameFilesPromises = uploadedFiles.map(async (uploadedFile: UploadedFile) => {
                return await fileUploader(uploadedFile, id);
            });
            // Wait for all file uploads to complete
            const nameFiles = await Promise.all(nameFilesPromises);
            // Concatenate all file names into a single string (if there are multiple files)
            nameFile = nameFiles.join(',');
        }
        return await fetch(EDIT_WAREHOUSE, id, name, nameFile);


    }

    static async deleteWareHouseImages(req: Request) {
        const { id } = req.params;
        await fileUnuploader(id);     
        return await fetch(EDIT_WAREHOUSE_IMG, id);
    }

    static async deleteWareHouses(req: Request) {
        const { id } = req.params;
        return await fetch(DELETE_WAREHOUSE, id);
    }

    static async restoreWareHouse(req: Request) {
        const { id } = req.params;
        return await fetch(RESTORE_WAREHOUSE, id);
    }
    
    static async disableEnableWareHouse(req:Request){
        const { id } = req.params;
        return await fetch(DISABLE_ENABLE_WAREHOUSE, id);
    }
}