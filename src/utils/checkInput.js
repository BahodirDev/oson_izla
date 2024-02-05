const { fetchAll } = require('../../config/databae');
const warehouseSQL = require("../routes/warehouses/warehouse.sql");
const { BadUserInput } = require('./HttpErrors');

async function checkWarehouses({ name }) {
    const isExist = await fetchAll(warehouseSQL.CHECK_IF_EXIST, name);
    if (isExist.length > 0) throw new BadUserInput(`${name} is already exist`)
}

module.exports = { checkWarehouses };