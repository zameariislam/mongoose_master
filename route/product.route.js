
const express = require('express')
const router = express.Router()

const { getProducts, createProduct, updateProduct, bulkUpdateProduct, deleteProductById, bulkDeleteProduct } = require('../controllers/product.controller')


router.route('/bulk-update').patch(bulkUpdateProduct)
router.route('/bulk-delete').delete(bulkDeleteProduct)

router.route("/")
    .get(getProducts)
    .post(createProduct)



router.route('/:id')
    .patch(updateProduct)
    .delete(deleteProductById)




module.exports = router
