const Product = require('../models/Product')
const { getProductsService, createProductService, updateProductService, updateBulkProductService, deleteProductByIdService, deleteBulkProductService } = require('../services/product.services')

const createProduct = async (req, res) => {


    // save /create 


    try {



        const product = await createProductService(req.body)




        res.status(200).json({
            status: 'success',
            message: 'data inserted successfully',
            data: product
        })

    }
    catch (err) {
        res.status(500).json({
            status: 'failed',

            message: 'data is not inserted',
            err: err.message

        })

    }



}



const getProducts = async (req, res) => {
    console.log(req.query)



    let filters = { ...req.query }
    const excludeFields = ['sort', 'limit']

    // // exclude something 
    excludeFields.forEach(field => delete filters[field])

    // {price:{$gt:50}}
    // price[gt]=50
    // gte,lte,gt,lt 
    let filterString = JSON.stringify(filters)
    filterString = filterString.replace(/\b(gt|lt|gte|lte)\b/g, match => `$${match}`)
     filters = JSON.parse(filterString)


    const queries = {}

    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ')
        queries.sortBy = sortBy

    }


    if (req.query.fields) {
        const fields = req.query.fields.split(',').join(' ')
        queries.fields = fields


    }
    console.log('query', queries)


    try {

        const products = await getProductsService(filters, queries)
        res.status(200).json({
            status: 'success',

            data: products
        })

    }
    catch (err) {
        res.status(500).json({
            status: 'failed',

            message: 'can not get data',
            err: err.message

        })

    }




}


const updateProduct = async (req, res, next) => {

    try {

        const { id } = req.params


        const product = await updateProductService(id, req.body)
        res.status(200).json({
            status: 'success',

            data: product
        })

    }
    catch (err) {
        res.status(500).json({
            status: 'failed',

            message: 'could not update the product',
            err: err.message

        })

    }




}



const bulkUpdateProduct = async (req, res, next) => {
    console.log(req.body)

    try {


        const products = await updateBulkProductService(req.body)
        res.status(200).json({
            status: 'success',

            data: products
        })

    }
    catch (err) {
        res.status(500).json({
            status: 'failed',

            message: 'could not update the product',
            err: err.message

        })

    }




}


const deleteProductById = async (req, res, next) => {

    try {

        const { id } = (req.params)


        const product = await deleteProductByIdService(id)

        if (!result.deletedCount) {
            return res.status(400).json({
                status: 'fail',

                error: 'could not find the product'
            })

        }

        res.status(200).json({
            status: 'success',

            message: 'product deleted sucessfully '
        })

    }
    catch (err) {
        res.status(500).json({
            status: 'failed',

            message: 'could not deleted the product',
            err: err.message

        })

    }




}


const bulkDeleteProduct = async (req, res, next) => {
    console.log(req.body)

    try {


        const products = await deleteBulkProductService(req.body.ids)
        res.status(200).json({
            status: 'success',

            message: 'Sucessfully deleted  the given products'
        })

    }
    catch (err) {
        res.status(500).json({
            status: 'failed',

            message: 'could not delete the product',
            err: err.message

        })

    }




}


module.exports = {
    getProducts,
    createProduct,
    updateProduct,
    bulkUpdateProduct,
    deleteProductById,
    bulkDeleteProduct
}






