const Product = require('../models/Product')
const { getProductsService, createProductService } = require('../services/product.services')

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


    try {
        
        const products = await getProductsService()
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

module.exports = {
    getProducts,
    createProduct
}






