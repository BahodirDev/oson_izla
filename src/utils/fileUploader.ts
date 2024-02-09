const fs = require('fs');
import { getRandomName } from './inputFormatter'
import FileEnum from '../enums/filterEnum'
import GlobalPathes from '../enums/globalPathEnum'
import { fetchAll, fetch } from '../config/database'
import warehouseSQL from '../routes/warehouses/warehouse.sql'
import { BadUserInput, InternalServerError } from "./HttpErrors"

async function fileUploader(uploadedFile: {
    mv(arg0: string, arg1: (err: any) => void): unknown; name: string,
    size: number, mimetype: string
}, id?: string, utc = 0) {

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

        const warehouse: { warehouse_img: string } = await fetch(warehouseSQL.GET_WAREHOUSE, id ?? null, false, true, utc);

        if (warehouse?.warehouse_img) {
            try {
                fs.unlink(fileFolder + "/" + warehouse?.warehouse_img, (err: any) => {
                    if (err) {
                        console.log({ err });
                    }

                });
            } catch (error) {
                throw new InternalServerError("Error in deleting file")
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

async function fileUnuploader(id: string) {
    const warehouse: { warehouse_img: string } = await fetch(warehouseSQL.GET_WAREHOUSE, id, false, true, 0);
    if (warehouse?.warehouse_img) {
        try {
            const fileFolder = GlobalPathes.fileUploadPath;
            fs.unlink(fileFolder + "/" + warehouse?.warehouse_img, (err: any) => {
                if (err) {
                    console.log({ err });
                }
                return true
            });
        } catch (error) {
            throw new InternalServerError("Error in deleting file")
        }
    }

}

export { fileUploader, fileUnuploader };