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
exports.fetchAll = exports.fetch = void 0;
// database.js
const HttpErrors_1 = require("../utils/HttpErrors");
const pg = require('pg');
const { Pool } = pg;
require('dotenv').config();
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT, // Default PostgreSQL port
});
// const pool = new pg.Pool(PG)
const fetch = (SQL, ...params) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield pool.connect();
    try {
        const { rows: [row] } = yield client.query(SQL, params.length ? params : null);
        return row;
    }
    catch (error) {
        throw new HttpErrors_1.InternalServerError(error.message || error.detail || error);
    }
    finally {
        client.release();
    }
});
exports.fetch = fetch;
const fetchAll = (SQL, ...params) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield pool.connect();
    try {
        const { rows } = yield client.query(SQL, params.length ? params : null);
        return rows;
    }
    catch (error) {
        throw new HttpErrors_1.InternalServerError(error.message || error.detail || error);
    }
    finally {
        client.release();
    }
});
exports.fetchAll = fetchAll;
