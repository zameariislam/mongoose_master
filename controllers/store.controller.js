const { createStoreService, getStoresService, getStoreServiceById } = require("../services/storeService")



const createStore = async (req, res) => {


    try {

        const store = await createStoreService(req.body)

        res.status(200).json({
            status: 'success',
            message: 'Store inserted successfully',
            data: store
        })

    }
    catch (err) {
        res.status(500).json({
            status: 'failed',

            message: 'store is not created',
            err: err.message

        })

    }



}

const getStores = async (req, res) => {

    try {

        const stores = await getStoresService()
        res.status(200).json({
            status: 'success',

            data: stores
        })

    }
    catch (err) {
        res.status(500).json({
            status: 'failed',

            message: 'can not get stores',
            err: err.message

        })

    }




}

const getStoreById = async (req, res) => {
    const { id } = req.params

    try {

        const store = await getStoreServiceById(id)
        res.status(200).json({
            status: 'success',

            data: store
        })

    }
    catch (err) {
        res.status(500).json({
            status: 'failed',

            message: 'culd not get store',
            err: err.message

        })

    }




}



module.exports = {
    createStore,
    getStores,
    getStoreById
}




