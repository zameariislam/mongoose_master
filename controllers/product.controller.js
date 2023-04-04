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
    console.log('req', req.query)

    // filtering here 

    let filters = { ...req.query }
    const excludeFields = ['sort', 'limit', "fields", "page"]



    // // exclude something 
    excludeFields.forEach(field => delete filters[field])
    console.log('filter', filters)

    // {price:{$gt:50}}
    // price[gt]=50
    // gte,lte,gt,lt 
    // sort(' quantity price')
    // sort=name,price
    // fields=name,description

    let filterString = JSON.stringify(filters)
    filterString = filterString.replace(/\b(gt|lt|gte|lte)\b/g, match => `$${match}`)
    filters = JSON.parse(filterString)


    // quering here 

    const queries = {}

    if (req.query.sort) {

        const sortBy = req.query.sort.split(',').join(' ')

        queries.sortBy = sortBy

    }


    if (req.query.fields) {
        const fields = req.query.fields.split(',').join(' ')
        queries.fields = fields


    }

    //   page=3&limit=2

    // 50 products 
    // each page 10 product 
    // page 1>1-10
    // page 2>11-20
    // page 3>21-30
    // page 4>31-40
    // page 5>41-50

    // pagination here 

    if (req.query.page) {
        const { page = 1, limit = 10 } = req.query
        const skip = (Number(page) - 1) * Number(limit)

        queries.skip = skip
        queries.limit = Number(limit)


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


const fileUploader = async (req, res, next) => {
    console.log('hello',req.file)
    try {
      res.status(200).json(req.file)
    } catch (error) {
  
        res.send(error.message)
    }
  }




module.exports = {
    getProducts,
    createProduct,
    updateProduct,
    bulkUpdateProduct,
    deleteProductById,
    bulkDeleteProduct,
    fileUploader

}






