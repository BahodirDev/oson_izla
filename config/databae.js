// database.js
const { InternalServerError } = require('../src/utils/HttpErrors');
const pg = require('pg');
const { Pool } = pg
require('dotenv').config();

var types = pg.types;
types.setTypeParser(1132, function(stringValue) {
    return new Date(stringValue + "+0000");
});


const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT, // Default PostgreSQL port
    
});

// const pool = new pg.Pool(PG)

const fetch = async (SQL, ...params) => {
    const client = await pool.connect()
    try {
        const { rows: [row] } = await client.query(SQL, params.length ? params : null);
        return row
    } catch (error) {
        throw new InternalServerError(error.message || error.detail || error)
    }
    finally {
        client.release()
    }
}

const fetchAll = async (SQL, ...params) => {
    const client = await pool.connect();
    try {
        const { rows } = await client.query(SQL, params.length ? params : null)
        return rows
    } catch (error) {
        throw new InternalServerError(error.message || error.detail || error)
    } finally {
        client.release()
    }
}



module.exports = {
    fetch,
    fetchAll
};
