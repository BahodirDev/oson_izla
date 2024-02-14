// database.js
import { InternalServerError } from "../utils/HttpErrors"
const pg = require('pg');
const { Pool } = pg
require('dotenv').config();




const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT, // Default PostgreSQL port

});

// const pool = new pg.Pool(PG)

const fetch = async (SQL: string, ...params: any) => {
    const client = await pool.connect()
    try {
        const { rows: [row] } = await client.query(SQL, params.length ? params : null);
        return row
    } catch (error: any) {
        throw new InternalServerError(error.message || error.detail || error)
    }
    finally {
        client.release()
    }
}

const fetchAll = async (SQL: string, ...params: any) => {
    const client = await pool.connect();

    try {
        const { rows } = await client.query(SQL, params.length ? params : null)
        return rows
    } catch (error: any) {
        throw new InternalServerError(error.message || error.detail || error)
    } finally {
        client.release()
    }
}



export {
    fetch,
    fetchAll
};