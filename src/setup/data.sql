\ c postgres;

drop database if exists oson_izla;

create database oson_izla;

\ c oson_izla CREATE EXTENSION IF NOT EXISTS postgis;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 001 -- global_categories
drop table if exists global_categories cascade;

CREATE TABLE global_categories(
    global_category_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    global_category_name varchar(50) not null
);

-- 002 -- global_sub_categories
drop table if exists global_sub_categories cascade;

CREATE TABLE global_sub_categories(
    global_sub_category_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    global_sub_category_name varchar(50) not null,
    global_category_id UUID references global_categories(global_category_id)
);

-- 002 -- category
drop table if exists categories cascade;

CREATE TABLE categories(
    category_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_name varchar(50) not null,
    category_global_id UUID references global_categories(global_category_id)
);

-- 002 -- sub_categories
drop table if exists sub_categories cascade;

CREATE TABLE sub_categories(
    sub_category_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sub_category_name varchar(50) not null,
    global_sub_category_id UUID references global_sub_categories(global_sub_category_id),
    category_id UUID references categories(category_id)
);

-- warehouses --
drop table if exists warehouses cascade;

CREATE TABLE warehouses (
    warehouse_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    warehouse_name VARCHAR(250) NOT NULL,
    warehouse_img TEXT,
    warehouse_active BOOLEAN DEFAULT true NOT NULL,
    warehouse_createdat TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    warehouse_deletedat TIMESTAMP WITH TIME ZONE DEFAULT null
);

-- Set the default time zone for warehouse_createdat to UTC
-- ALTER TABLE warehouses
-- ALTER COLUMN warehouse_deletedat SET DEFAULT null;
-- ALTER COLUMN warehouse_createdat SET DEFAULT CURRENT_TIMESTAMP AT TIME ZONE 'UTC';


-- warehouses --
-- companies --
drop table if exists companies cascade;

CREATE TABLE companies(
    company_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_name varchar(250),
    company_img text,
    company_location POINT,
    company_summary varchar(250)
);

-- companies --
-- 003 -- category
drop table if exists products cascade;

CREATE TABLE products (
    product_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_name TEXT NOT NULL,
    product_cost decimal(10, 2),
    product_price decimal(10, 2),
    product_img text,
    product_summary varchar(250),
    product_quantity NUMERIC(10, 2),
    product_measurement varchar(50),
    product_supplier varchar(50),
    product_category_id UUID references categories(category_id),
    product_warehouse_id UUID references warehouses(warehouse_id),
    product_company_id UUID references companies(company_id)
);