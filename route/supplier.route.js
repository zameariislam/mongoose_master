const express = require('express')
const { createSupplier, getSuppliers, updateSupplier } = require('../controllers/supplier.controller')

const router = express.Router()

router.route('/')

    .post(createSupplier)
    .get(getSuppliers)

router.route('/:id')
    .patch(updateSupplier)



module.exports = router