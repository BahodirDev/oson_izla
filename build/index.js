"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const morgan_1 = __importDefault(require("morgan"));
const express_1 = __importDefault(require("express"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const getUtcCallback_js_1 = require("./utils/getUtcCallback.js");
const routes_1 = require("./routes");
const errorCallback_js_1 = __importDefault(require("./utils/errorCallback.js"));
const app = (0, express_1.default)();
(0, dotenv_1.config)();
// file upload lauch
app.use((0, express_fileupload_1.default)());
// app uses json
app.use(express_1.default.json());
// urlencoded plugin launched
app.use(express_1.default.urlencoded({ extended: true }));
// morgan logs
app.use((0, morgan_1.default)(':method :url :status :res[content-length] - :response-time ms'));
// routes executes
app.use('/api', getUtcCallback_js_1.getUtcCallback, routes_1.routes);
// error handling
app.use(errorCallback_js_1.default);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server run on port ${process.env.PORT}`);
});
