const { fetch, fetchAll } = require('../../../config/databae');
const warehouseSQL = require('./warehouse.sql');
const { fileUploader, fileUnuploader } = require('../../utils/fileUploader');

async function getWareHousesModel(req) {
    const { pagination, id, isdeleted, isactive } = req.body;
    const { page, limit } = pagination;
    const utc = req.utc
    return await fetchAll(
        warehouseSQL.GET_WAREHOUSES,
        (page - 1) * limit, limit, isdeleted, isactive, id, utc
    );

}
async function postWareHousesModel(req) {
    const { name } = req.body;
    const uploadedFile = req?.files?.img; // Assuming your input field is named 'file'
    const nameFile = await fileUploader(uploadedFile);
    return await fetch(warehouseSQL.CREATE_NEW_WAREHOUSE, name, nameFile);
}
async function patchWareHousesModel(req) {
    const { name } = req.body;
    const { id } = req.params;
    const uploadedFile = req?.files?.img; // Assuming your input field is named 'file'
    const nameFile = await fileUploader(uploadedFile, id);
    return await fetch(warehouseSQL.EDIT_WAREHOUSE, id, name, nameFile);
}
async function deleteWareHouseImagesModel(req) {
    const { id } = req.params;
    await fileUnuploader(id);
    return await fetch(warehouseSQL.EDIT_WAREHOUSE_IMG, id);
}
async function deleteWareHousesModel(req) {
    const { id } = req.params;
    return await fetch(warehouseSQL.DELETE_WAREHOUSE, id);
}
async function restoreWareHousesModel(req) {
    const { id } = req.params;
    return await fetch(warehouseSQL.RESTORE_WAREHOUSE, id);
}
async function EnableDisableWareHousesModel(req) {
    const { id } = req.params;
    return await fetch(warehouseSQL.DISABLE_ENABLE_WAREHOUSE, id);
}

module.exports = {
    EnableDisableWareHousesModel,
    deleteWareHouseImagesModel,
    restoreWareHousesModel,
    deleteWareHousesModel,
    patchWareHousesModel,
    postWareHousesModel,
    getWareHousesModel
};