export const GET_COMPANIES = `
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

export const CHECK_IF_COMPANY_EXIST = `
    SELECT c.company_sub_name
    from companies as c
    where c.company_sub_name = $1 and company_deletedat is null
`;

export const POST_COMPANIES = `
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

export const PATCH_COMPANIES = `
        UPDATE companies
            set company_name = 
                    CASE
                        WHEN $2 <> '' THEN $2
                        ELSE company_name
                    END,
                company_sub_name =
                    CASE
                        WHEN $3 <> '' THEN $3
                        ELSE company_sub_name
                    END,
                company_img =
                    CASE
                        WHEN $4 <> '' THEN $4
                        ELSE company_img
                    END,
                    company_latitude =
                    CASE
                        WHEN $5::float > 0 THEN $5::float
                        ELSE company_latitude 
                    END,
                company_longitude =
                    CASE
                        WHEN $6::float > 0 THEN $6::float
                        ELSE company_longitude 
                    END,                
                company_summary =
                    CASE
                        WHEN $7 <> '' THEN $7
                        ELSE company_summary
                    END
                where company_id = $1 and company_deletedat is null
                returning *

`

export const GET_COMPANY = `
        SELECT 
        c.*,
        to_char(c.company_createdat AT TIME ZONE $4, 'YYYY-MM-DD HH24:MI:SS') as company_createdat,
        to_char(c.company_deletedat AT TIME ZONE $4, 'YYYY-MM-DD HH24:MI:SS') as company_deletedat
        from companies as c
        where
            CASE
                WHEN $2 = true THEN c.company_deletedat is not null
                ELSE c.company_deletedat is null
            END AND
            CASE 
                WHEN $3 = FALSE THEN c.company_active = false
                ELSE TRUE
            END
                and
            c.company_id = $1
            ORDER BY company_id DESC
`

export const EDIT_COMPANY_IMG = `
    UPDATE companies
    set company_img = null
    where company_id = $1 and company_img is not null and company_deletedat is null
    returning *
    `

export const DELETE_COMPANY = `
    UPDATE companies 
    set company_deletedat = CURRENT_TIMESTAMP,
    company_active = false
    where company_id = $1 and company_deletedat is null
    returning *

`

export const ENABLE_DISABLE_COMPANY = `
    UPDATE companies 
    SET company_active = 
        CASE
            WHEN company_active = true THEN false
            WHEN company_active = false THEN true
        END
    WHERE company_id = $1
    RETURNING *;
`;

export const RESTORE_COMPANY = `
    UPDATE companies
    set company_deletedat = null
    where company_id = $1 and company_deletedat is not null
    returning *
`