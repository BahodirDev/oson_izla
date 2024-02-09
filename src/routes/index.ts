// const products = require('./products/products.index');
import { Router } from 'express';
import { wareHouseRouter } from './warehouses/warehouses.index'

const routes: Router[] = [wareHouseRouter];
export { routes }