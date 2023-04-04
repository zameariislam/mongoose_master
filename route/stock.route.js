
const express = require('express')
const router = express.Router()



const { getStocks, createStock
    // bulkDeleteProduct,bulkUpdateProduct


} = require('../controllers/stock.controller')


router.route("/")
    .get(getStocks)
    .post(createStock)

module.exports = router
