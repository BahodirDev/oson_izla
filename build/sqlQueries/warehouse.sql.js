"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.warehouseSQL = exports.DISABLE_ENABLE_WAREHOUSE = exports.RESTORE_WAREHOUSE = exports.DELETE_WAREHOUSE = exports.EDIT_WAREHOUSE_IMG = exports.EDIT_WAREHOUSE = exports.CREATE_NEW_WAREHOUSE = exports.CHECK_IF_EXIST = exports.GET_WAREHOUSE = exports.GET_WAREHOUSES = void 0;
exports.GET_WAREHOUSES = `
    SELECT 
    wh.*,
    to_char(wh.warehouse_createdat AT TIME ZONE $6, 'YYYY-MM-DD HH24:MI:SS') as warehouse_createdat,
    to_char(wh.warehouse_deletedat AT TIME ZONE $6, 'YYYY-MM-DD HH24:MI:SS') as warehouse_deletedat,
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
exports.GET_WAREHOUSE = `
    SELECT 
    wh.*,
    to_char(wh.warehouse_createdat AT TIME ZONE $4, 'YYYY-MM-DD HH24:MI:SS') as warehouse_createdat,
    to_char(wh.warehouse_deletedat AT TIME ZONE $4, 'YYYY-MM-DD HH24:MI:SS') as warehouse_deletedat
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
exports.CHECK_IF_EXIST = `
    SELECT wh.warehouse_name
    from warehouses as wh
    where wh.warehouse_name = $1 and warehouse_deletedat is null
`;
exports.CREATE_NEW_WAREHOUSE = `
    INSERT INTO 
    warehouses(warehouse_name,warehouse_img)
    VALUES($1,$2)
    returning *
`;
exports.EDIT_WAREHOUSE = `
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
        where warehouse_id = $1 and warehouse_deletedat is null
        returning *    
`;
exports.EDIT_WAREHOUSE_IMG = `
    UPDATE warehouses
        set warehouse_img = null
        where warehouse_id = $1 and warehouse_img is not null and warehouse_deletedat is null
        returning *
`;
exports.DELETE_WAREHOUSE = `
        UPDATE warehouses 
        set warehouse_deletedat = CURRENT_TIMESTAMP,
        warehouse_active = false
        where warehouse_id = $1 and warehouse_deletedat is null
        returning *
`;
exports.RESTORE_WAREHOUSE = `
    UPDATE warehouses
        set warehouse_deletedat = null
        where warehouse_id = $1 and warehouse_deletedat is not null
        returning *
`;
exports.DISABLE_ENABLE_WAREHOUSE = `
    UPDATE warehouses 
    SET warehouse_active = 
        CASE
            WHEN warehouse_active = true THEN false
            WHEN warehouse_active = false THEN true
        END
    WHERE warehouse_id = $1
    RETURNING *;

`;
exports.warehouseSQL = {
    DISABLE_ENABLE_WAREHOUSE: exports.DISABLE_ENABLE_WAREHOUSE,
    CREATE_NEW_WAREHOUSE: exports.CREATE_NEW_WAREHOUSE,
    EDIT_WAREHOUSE_IMG: exports.EDIT_WAREHOUSE_IMG,
    RESTORE_WAREHOUSE: exports.RESTORE_WAREHOUSE,
    DELETE_WAREHOUSE: exports.DELETE_WAREHOUSE,
    EDIT_WAREHOUSE: exports.EDIT_WAREHOUSE,
    GET_WAREHOUSES: exports.GET_WAREHOUSES,
    CHECK_IF_EXIST: exports.CHECK_IF_EXIST,
    GET_WAREHOUSE: exports.GET_WAREHOUSE
};
