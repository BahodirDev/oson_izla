import { fetchAll } from '../config/database'
import warehouseSQL from '../routes/warehouses/warehouse.sql'
import { BadUserInput } from './HttpErrors'

async function checkWarehouses({ name }: { name: string }) {

    const isExist: [{ warehouse_name: string }] = await fetchAll(warehouseSQL.CHECK_IF_EXIST, name);

    if (isExist.length > 0) {
        throw new BadUserInput(`${name} is already exist`,'')
    }
}

export { checkWarehouses };