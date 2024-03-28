import { fetchAll } from '../config/database'
import { BadUserInput } from './HttpErrors'
import { CHECK_IF_COMPANY_EXIST, CHECK_IF_EXIST } from '../sqlQueries'

async function checkWarehouses({ name }: { name: string }) {

    const isExist: [{ warehouse_name: string }] = await fetchAll(CHECK_IF_EXIST, name);

    if (isExist.length > 0) {
        throw new BadUserInput(`${name} is already exist`, '')
    }
}


async function checkCompanies({ company_sub_name }: { company_sub_name: string }) {

    const isExist: [{ warehouse_name: string }] = await fetchAll(CHECK_IF_COMPANY_EXIST, company_sub_name);

    if (isExist.length > 0) {
        throw new BadUserInput(`${company_sub_name} is already exist`, '')
    }
}

export { checkWarehouses, checkCompanies };