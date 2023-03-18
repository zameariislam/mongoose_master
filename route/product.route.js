
const express = require('express')
const router = express.Router()

const { getProducts, createProduct } = require('../controllers/product.controller')

router.route("/")
    .get(getProducts)
    .post(createProduct)





module.exports = router

