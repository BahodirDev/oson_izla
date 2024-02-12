"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST_COMPANIES = exports.CHECK_IF_COMPANY_EXIST = exports.GET_COMPANIES = void 0;
exports.GET_COMPANIES = `
    SELECT 
    c.*,
    to_char(c.company_createdat AT TIME ZONE $6, 'YYYY-MM-DD HH24:MI:SS') as warehouse_createdat,
    to_char(c.company_deletedat AT TIME ZONE $6, 'YYYY-MM-DD HH24:MI:SS') as warehouse_deletedat,
    count(*) over() as full_count
    from companies as c
    where
        CASE
            WHEN $3 = true THEN c.company_deletedat is not null
            ELSE c.company_deletedat is null
        END AND
        CASE 
            WHEN $4 = FALSE THEN c.company_active = false
            WHEN $4 = TRUE THEN c.company_active = true
            ELSE TRUE
        END
            and
        $5::uuid IS NULL OR c.company_id = $5::uuid
        ORDER BY company_id DESC
        OFFSET $1 ROWS FETCH FIRST $2 ROW ONLY
`;
exports.CHECK_IF_COMPANY_EXIST = `
    SELECT c.company_sub_name
    from companies as c
    where c.company_sub_name = $1 and company_deletedat is null
`;
exports.POST_COMPANIES = `
    INSERT INTO companies (
        company_name,
        company_sub_name,
        company_img,
        company_latitude,
        company_longitude,
        company_summary
    ) VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
`;
