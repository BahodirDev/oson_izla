import { config } from "dotenv"
import morgan from "morgan"
import express from "express"
import fileUpload from "express-fileupload";
// import { getUtcCallback } from "./utils/getUtcCallback.js";
// import { routes } from './routes'
import errorCallback from "./utils/errorCallback.js";
import { AppRouter } from "./AppRouter"
import './controllers/WareHouseContrller'

declare module "express" {
    interface Request {
        utc?: string;
    }
    interface Error {
        message?: string;
        code?: number;
    }
}

const app = express();


config()
// file upload lauch
app.use(fileUpload())
// app uses json
app.use(express.json())
// urlencoded plugin launched
app.use(express.urlencoded({ extended: true }));
// morgan logs
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
// routes executes
// app.use('/api', getUtcCallback, routes);
app.use("/api", AppRouter.getInstance());
// error handling
app.use(errorCallback);


const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server run on port ${process.env.PORT}`);
});

