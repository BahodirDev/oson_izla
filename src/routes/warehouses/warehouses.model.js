const { fetch, fetchAll } = require('../../../config/databae');
const { UTC } = require('../../enums/utcEnum');
const fs = require('fs');
const path = require('path');
const warehouseSQL = require('./warehouse.sql');
const { getRandomName } = require('../../utils/inputFormatter');
const { FileEnum } = require('../../enums/sizeEnum');
const { BadUserInput } = require('../../utils/HttpErrors');


async function getWareHousesModel(req) {
    const { pagination, id, isdeleted, isactive } = req.body;
    const { page, limit } = pagination;
    const { utc } = req.headers;

    return await fetchAll(
        warehouseSQL.GET_WAREHOUSES,
        (page - 1) * limit, limit, isdeleted, isactive, id, utc ?? UTC.utc
    );

}
async function postWareHousesModel(req) {
    const { name } = req.body;
    let nameFile = null;
    const uploadedFile = req?.files?.img; // Assuming your input field is named 'file'
    if (uploadedFile) {
        nameFile = await getRandomName(uploadedFile);
        if (uploadedFile.size >= FileEnum.standartSizeOfFile) {
            throw new BadUserInput("image size must be less than 1mb")
        } else if (!FileEnum.standartTypeOfFile.includes(uploadedFile.mimetype)) {
            throw new BadUserInput(`image type must be one of ${FileEnum.standartTypeOfFile}`)
        }
        const fileFolder = path.join(__dirname, "..", "..", "..", "uploads");
        if (!fs.existsSync(fileFolder)) {
            fs.mkdirSync(fileFolder);
        } else {
            console.log('Folder already exists:', fileFolder);
        }
        uploadedFile.mv(fileFolder + '/' + nameFile, (err) => {
            if (err) {
                console.log({ err });
            }
        });
    }


    return await fetch(warehouseSQL.CREATE_NEW_WAREHOUSE, name, nameFile);
}
async function patchWareHousesModel(req) {
    const { name } = req.body;
    const { id } = req.params;
    let filename = req?.file?.filename ?? null;
    return await fetch(warehouseSQL.EDIT_WAREHOUSE, id, name, filename);
}

module.exports = {
    patchWareHousesModel,
    postWareHousesModel,
    getWareHousesModel
};