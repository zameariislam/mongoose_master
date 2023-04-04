
const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const uploader = multer({ dest: path.join(__dirname, '../uploads/') })







const { getProducts, createProduct, updateProduct, bulkUpdateProduct, deleteProductById,
    bulkDeleteProduct,
    fileUploader,

} = require('../controllers/product.controller')

// file upload 


router.route('/file-upload')
    .post(uploader.single('image'), fileUploader)



router.route('/bulk-update').patch(bulkUpdateProduct)
router.route('/bulk-delete').delete(bulkDeleteProduct)

router.route("/")
    .get(getProducts)
    .post(createProduct)



router.route('/:id')
    .patch(updateProduct)
    .delete(deleteProductById)




module.exports = router
