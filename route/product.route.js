
const express = require('express')
const router = express.Router()



const { getProducts, createProduct, updateProduct, bulkUpdateProduct, deleteProductById,
    bulkDeleteProduct,
    fileUploader,

} = require('../controllers/product.controller')
const uploader = require('../middlewares/uploader')

// file upload 


router.route('/file-upload')
    .post(uploader.array('image'), fileUploader)



router.route('/bulk-update').patch(bulkUpdateProduct)
router.route('/bulk-delete').delete(bulkDeleteProduct)

router.route("/")
    .get(getProducts)
    .post(createProduct)



router.route('/:id')
    .patch(updateProduct)
    .delete(deleteProductById)




module.exports = router
