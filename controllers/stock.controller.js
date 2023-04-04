const { createStockService, getStocksService } = require("../services/stock.service")


const createStock = async (req, res) => {

    try {

        const stock = await createStockService(req.body)

        res.status(200).json({
            status: 'success',
            message: 'Stock creatted successfully',
            data: stock
        })

    }
    catch (err) {
        res.status(500).json({
            status: 'failed',

            message: 'stock is not created',
            err: err.message

        })

    }



}

const getStocks = async (req, res) => {
    console.log(req.query)
    // stock?sortBy=price$price=5000



    let filters = { ...req.query }
    const excludeFields = ['sort', 'limit','page']

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

        const stocks = await  getStocksService (filters, queries)
        res.status(200).json({
            status: 'success',

            data: stocks
        })

    }
    catch (err) {
        res.status(500).json({
            status: 'failed',

            message: 'can not get stock',
            err: err.message

        })

    }




}



module.exports = {
    createStock,
    getStocks

}
