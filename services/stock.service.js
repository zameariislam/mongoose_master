const Brand = require('../models/Brand')
const Stock = require('../models/Stock')

const getStocksService = async (filters, queries, fields) => {


    const stocks = await Stock
        .find(filters)
        .skip(queries.skip)
        .limit(queries.limit)
        .select(queries.fields)
        .sort(queries.sortBy)
        .limit(queries.limit)

    const total = await Stock.countDocuments(filters)
    const page = Math.ceil(total / queries.limit);

    return { stocks, total, page }
}

const createStockService = async (data) => {

    const stock = await Stock.create(data)
    return stock

}


module.exports = {
    getStocksService,
    createStockService

}


