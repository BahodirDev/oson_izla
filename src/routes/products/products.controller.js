const { getPoroductsModel } = require('./products.model')
async function getPorductsController(req, res, next) {
    try {
        const data = await getPoroductsModel(req);
        res.status(200).json(data)
    } catch (error) {
        next(error)
    }
}

module.exports = { getPorductsController };