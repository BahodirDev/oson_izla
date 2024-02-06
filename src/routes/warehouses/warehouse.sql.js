const CREATE_NEW_WAREHOUSE = `
    INSERT INTO 
    warehouses(warehouse_name,warehouse_img)
    VALUES($1,$2)
    returning *
`;

const GET_WAREHOUSES = `
    SELECT 
    wh.*,
    to_char(wh.warehouse_createdat AT TIME ZONE 'UTC+10', 'YYYY-MM-DD HH24:MI:SS') as warehouse_createdat,
    to_char(wh.warehouse_deletedat AT TIME ZONE 'UTC' at time zone $6, 'YYYY-MM-DD HH24:MI:SS') as warehouse_deletedat,
    count(*) over() as full_count
    from warehouses as wh
    where
         CASE
             WHEN $3 = true THEN wh.warehouse_deletedat is not null
             ELSE wh.warehouse_deletedat is null
         END AND
         CASE 
            WHEN $4 = FALSE THEN wh.warehouse_active = false
            WHEN $4 = TRUE THEN wh.warehouse_active = true
            ELSE TRUE
         END
            and
        $5::uuid IS NULL OR wh.warehouse_id = $5::uuid
        ORDER BY warehouse_id DESC
        OFFSET $1 ROWS FETCH FIRST $2 ROW ONLY
`;

const GET_WAREHOUSE = `
    SELECT 
    wh.*,
    to_char(wh.warehouse_createdat AT TIME ZONE 'UTC' at time zone $4, 'YYYY-MM-DD HH24:MI:SS') as warehouse_createdat,
    to_char(wh.warehouse_deletedat AT TIME ZONE 'UTC' at time zone $4, 'YYYY-MM-DD HH24:MI:SS') as warehouse_deletedat
    from warehouses as wh
    where
         CASE
             WHEN $2 = true THEN wh.warehouse_deletedat is not null
             ELSE wh.warehouse_deletedat is null
         END AND
         CASE 
            WHEN $3 = FALSE THEN wh.warehouse_active = false
            ELSE TRUE
         END
            and
        wh.warehouse_id = $1
        ORDER BY warehouse_id DESC
`;

const CHECK_IF_EXIST = `
    SELECT wh.warehouse_name
    from warehouses as wh
    where wh.warehouse_name = $1
`;

const EDIT_WAREHOUSE = `
    UPDATE warehouses
        set
         warehouse_name = 
            CASE
                WHEN $2 <> '' THEN $2
                ELSE warehouse_name
            END,
         warehouse_img = 
            CASE
                WHEN $3 <> '' THEN $3
                ELSE warehouse_img
            END
        where warehouse_id = $1
        returning *    
`;

const EDIT_WAREHOUSE_IMG = `
    UPDATE warehouses
        set warehouse_img = null
        where warehouse_id = $1
        returning *
`

const DELETE_WAREHOUSE = `
        UPDATE warehouses 
        set warehouse_deletedat = CURRENT_TIMESTAMP
        where warehouse_id = $1
        returning *
`


module.exports = {
    CREATE_NEW_WAREHOUSE,
    EDIT_WAREHOUSE_IMG,
    DELETE_WAREHOUSE,
    EDIT_WAREHOUSE,
    GET_WAREHOUSES,
    CHECK_IF_EXIST,
    GET_WAREHOUSE
};