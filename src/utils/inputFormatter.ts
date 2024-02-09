const path = require('path');
async function getRandomName(uploadedFile: { name: string }) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(uploadedFile.name);
    return `${uploadedFile.name?.slice(0, 3)}-${uniqueSuffix}${extension}`;
}

export { getRandomName };