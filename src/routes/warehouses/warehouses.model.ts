import { Request } from 'express';
import { fetchAll, fetch } from '../../config/database'
import warehouseSQL from './warehouse.sql'
import { fileUnuploader, fileUploader } from "../../utils/fileUploader";
import { UploadedFile } from 'express-fileupload';



async function getWareHousesModel(req: Request) {
    const { pagination, id, isdeleted, isactive } = req.body;
    const { page, limit } = pagination;
    const utc = req.utc
    return await fetchAll(
        warehouseSQL.GET_WAREHOUSES,
        (page - 1) * limit, limit, isdeleted, isactive, id, utc
    );

}
async function postWareHousesModel(req: Request) {
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
    return await fetch(warehouseSQL.CREATE_NEW_WAREHOUSE, name, nameFile);
}
async function patchWareHousesModel(req: Request) {
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
    return await fetch(warehouseSQL.EDIT_WAREHOUSE, id, name, nameFile);
}
async function deleteWareHouseImagesModel(req: Request) {
    const { id } = req.params;
    await fileUnuploader(id);
    return await fetch(warehouseSQL.EDIT_WAREHOUSE_IMG, id);
}
async function deleteWareHousesModel(req: Request) {
    const { id } = req.params;
    return await fetch(warehouseSQL.DELETE_WAREHOUSE, id);
}
async function restoreWareHousesModel(req: Request) {
    const { id } = req.params;
    return await fetch(warehouseSQL.RESTORE_WAREHOUSE, id);
}
async function EnableDisableWareHousesModel(req: Request) {
    const { id } = req.params;
    return await fetch(warehouseSQL.DISABLE_ENABLE_WAREHOUSE, id);
}

export {
    EnableDisableWareHousesModel,
    deleteWareHouseImagesModel,
    restoreWareHousesModel,
    deleteWareHousesModel,
    patchWareHousesModel,
    postWareHousesModel,
    getWareHousesModel,
};