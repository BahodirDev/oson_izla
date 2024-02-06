const fs = require('fs');
const { getRandomName } = require("./inputFormatter");
const { FileEnum } = require("../enums/filterEnum");
const { GlobalPathes } = require("../enums/globalPathEnum");
const { fetch } = require("../../config/databae");
const warehouseSQL = require('../routes/warehouses/warehouse.sql');
const { InternalServerError } = require('./HttpErrors');

async function fileUploader(uploadedFile, id = null, utc = 0) {

    if (uploadedFile) {

        // cheking filter params
        let nameFile = await getRandomName(uploadedFile);
        if (uploadedFile.size >= FileEnum.standartSizeOfFile) {
            throw new BadUserInput("image size must be less than 1mb")
        } else if (!FileEnum.standartTypeOfFile.includes(uploadedFile.mimetype)) {
            throw new BadUserInput(`image type must be one of ${FileEnum.standartTypeOfFile}`)
        }

        // uploading to folder
        const fileFolder = GlobalPathes.fileUploadPath;
        if (!fs.existsSync(fileFolder)) {
            fs.mkdirSync(fileFolder);
        } else {
            console.log('Folder already exists:', fileFolder);
        };

        const warehouse = await fetch(warehouseSQL.GET_WAREHOUSE, id, false, true, utc);

        if (warehouse?.warehouse_img) {
            try {
                fs.unlink(fileFolder + "/" + warehouse?.warehouse_img, (err) => {
                    if (err) {
                        console.log({ err });
                    }

                });
            } catch (error) {
                new new InternalServerError("Error in deleting file")
            }

        }
        uploadedFile.mv(fileFolder + '/' + nameFile, (err) => {
            if (err) {
                console.log({ err });
            }
        });


        return nameFile ?? null;
    }

}

async function fileUnuploader(id) {
    const warehouse = await fetch(warehouseSQL.GET_WAREHOUSE, id, false, true, 0);
    if (warehouse?.warehouse_img) {
        try {
            const fileFolder = GlobalPathes.fileUploadPath;
            fs.unlink(fileFolder + "/" + warehouse?.warehouse_img, (err) => {
                if (err) {
                    console.log({ err });
                }
                return true
            });
        } catch (error) {
            new new InternalServerError("Error in deleting file")
        }
    }

}

module.exports = { fileUploader, fileUnuploader };