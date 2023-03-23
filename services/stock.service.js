const Stock = require("../models/Stock")



const createStockService = async (data) => {

    const result = await Stock.create(data)
    return result



}



module.exports = {
    createStockService,
    // getStocksService
}