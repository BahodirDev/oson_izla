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
exports.getRandomName = void 0;
const path = require('path');
function getRandomName(uploadedFile) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = path.extname(uploadedFile.name);
        return `${(_a = uploadedFile.name) === null || _a === void 0 ? void 0 : _a.slice(0, 3)}-${uniqueSuffix}${extension}`;
    });
}
exports.getRandomName = getRandomName;
