const Router = require('express').Router();
const { getPorductsController } = require('./products.controller')
Router.get('/products/list', getPorductsController)


module.exports = Router;