const Store = require('../models/Store')
const createStoreService = async (data) => {

    // const result = await Stock.create(data)

    const result = await Store.create(data)
    return result



}

const getStoresService = async () => {


    const stores = await Store.find({})



    return stores
}


const getStoreServiceById = async (id) => {


    const store = await Store.find({ _id: id })



    return store
}



module.exports = {
    createStoreService,
    getStoresService,
    getStoreServiceById
}